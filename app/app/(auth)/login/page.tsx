'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animations";
import GitHubAuth from "@/components/Github-Auth";
import GoogleAuth from "@/components/Google-Auth";

export default function SignIn() {
  const router = useRouter();
  const [logInForm, setLogInForm] = React.useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logInForm)
      });
      const { message } = await response.json();
      if (response.ok) {
        router.push('/workspace');
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogInForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div {...pageVariants}>
      <Card className="rounded-none max-w-md mx-auto border border-gray-200 shadow-lg">
        <CardContent className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {`Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}`}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We recommend using a work email to easily collaborate with your team.
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="email"
                value={logInForm.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="block rounded-none w-full pl-10 pr-10 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail size={20} />
              </div>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={logInForm.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                className="block rounded-none w-full pl-10 pr-10 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={20} />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-end">
              <Link href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot Password?
              </Link>
            </div>

            <Button onClick={handleLogIn} className="rounded-none w-full bg-blue-600 hover:bg-blue-700">
              Log In
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <div className="space-y-3">
            <GoogleAuth/>
            <GitHubAuth/>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign Up with Email
            </Link>
          </p>

          <p className="text-xs text-gray-500 text-center">
            By signing up to the HeyGen platform you understand and agree to our{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            . This site is protected by reCAPTCHA.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}