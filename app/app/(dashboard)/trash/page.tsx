"use client";

import { useState, useEffect } from "react";
import { Search, Play, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";
import { getUserId } from "@/lib/authenticate";
import { useRouter } from "next/navigation";

type TrashedItem = {
  id: string;
  type: "video" | "avatar" | "voice";
  name: string;
  thumbnail: string | null;
  duration: string | null;
  deletedAt: string;
  expiryDate: string;
};

export default function TrashPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [trashedItems, setTrashedItems] = useState<TrashedItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTrashedItems = async () => {
      try {
        const userIdentifier = await getUserId();
        if (!userIdentifier) {
          toast.error("Please log in to view your trash", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          router.push("/login");
          return;
        }

        const response = await fetch(`/api/trash`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setTrashedItems(data.items);
        } else {
          console.error("Failed to fetch trashed items:", response.status, await response.text());
          toast.error("Failed to fetch trashed items");
        }
      } catch (error) {
        console.error("Error fetching trashed items:", error);
        toast.error("An error occurred while fetching trashed items");
      }
    };

    fetchTrashedItems();
  }, [router]);

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === trashedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(trashedItems.map((item) => item.id));
    }
  };

  const handleRestore = async () => {
    try {
      const response = await fetch("/api/trash", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ ids: selectedItems }),
        credentials: "include",
      });

      if (response.ok) {
        setTrashedItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
        setSelectedItems([]);
        toast.success("Items restored successfully");
      } else {
        toast.error("Failed to restore items");
      }
    } catch (error) {
      console.error("Error restoring items:", error);
      toast.error("An error occurred while restoring items");
    }
  };

  const handlePermanentDelete = async () => {
    try {
      const response = await fetch("/api/trash", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ ids: selectedItems }),
        credentials: "include",
      });

      if (response.ok) {
        setTrashedItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
        setSelectedItems([]);
        setIsDeleteDialogOpen(false);
        toast.success("Items permanently deleted");
      } else {
        toast.error("Failed to permanently delete items");
      }
    } catch (error) {
      console.error("Error permanently deleting items:", error);
      toast.error("An error occurred while permanently deleting items");
    }
  };

  const filteredItems = trashedItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.deletedAt).getTime() - new Date(a.deletedAt).getTime();
    } else if (sortBy === "expiring") {
      return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
    }
    return 0;
  });

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          Trash
        </h1>
        <p className="text-muted-foreground">Items in trash will be permanently deleted after 30 days</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trash..."
            className="pl-8 rounded-sm focus-visible:border-none focus:outline-none focus:ring-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] rounded-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Recently Deleted</SelectItem>
              <SelectItem value="expiring">Expiring Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20 p-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectedItems.length === trashedItems.length}
              onCheckedChange={toggleSelectAll}
              className="border-red-300 dark:border-red-700 data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
            />
            <label htmlFor="select-all" className="text-sm font-medium text-red-800 dark:text-red-300">
              {selectedItems.length} items selected
            </label>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestore}
              className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
            >
              <RotateCcw className="mr-1 h-3 w-3" />
              Restore
            </Button>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 border-0"
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Delete Forever
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the selected items from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handlePermanentDelete}
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white border-0"
                  >
                    Delete Forever
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {sortedItems.length > 0 ? (
          sortedItems.map((item) => (
            <Card key={item.id} className="p-0 rounded-sm overflow-hidden shadow-md">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative flex items-center p-3 sm:w-16">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => toggleSelectItem(item.id)}
                      className="border-red-300 dark:border-red-700 data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                    />
                  </div>
                  <div className="relative h-32 sm:h-24 sm:w-44">
                    {item.thumbnail ? (
                      <img
                        src={`data:image/jpeg;base64,${item.thumbnail}`}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No Thumbnail
                      </div>
                    )}
                    {item.duration && (
                      <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                        {item.duration}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-4">
                    <h3 className="font-medium text-red-800 dark:text-red-300">
                      {item.name} ({item.type})
                    </h3>
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:gap-4">
                      <span>Deleted on: {new Date(item.deletedAt).toLocaleDateString()}</span>
                      <span>Will be permanently deleted on: {new Date(item.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 p-4">
                    {item.type === "video" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                      >
                        <Play className="mr-1 h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRestore(item.id)}
                      className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                    >
                      <RotateCcw className="mr-1 h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedItems([item.id]);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600">No items found in trash.</p>
        )}
      </div>
    </div>
  );
}