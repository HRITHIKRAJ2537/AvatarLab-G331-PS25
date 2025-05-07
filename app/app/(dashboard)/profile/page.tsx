"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Session status:", status, "Session data:", session);
    if (status === "unauthenticated") {
      console.error("Unauthenticated - redirecting to /login");
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    console.error("Session data is unexpectedly null");
    return null;
  }

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Sign out failed:", error);
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="container mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-primary mb-6">Your Profile</h1>

        <Card>
          <CardHeader className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
              <AvatarFallback className="text-xl">{getInitials(session.user?.name || "User")}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <CardTitle>{session.user?.name || "User"}</CardTitle>
              <CardDescription>{session.user?.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={session.user?.name || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={session.user?.email || ""} disabled />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" className="w-full" onClick={handleSignOut} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing out...
                </>
              ) : (
                "Sign out"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}