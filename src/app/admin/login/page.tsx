
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Music4, Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-8 flex items-center gap-2 group">
        <div className="bg-primary p-2 rounded-full transition-transform group-hover:scale-110">
          <Music4 className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="font-headline font-bold text-2xl text-primary">Bhajan Sangam</span>
      </Link>

      <Card className="w-full max-w-md border-none shadow-xl bg-card rounded-2xl">
        <CardHeader className="space-y-1 text-center pb-8">
          <CardTitle className="font-headline text-3xl font-bold">Admin Portal</CardTitle>
          <CardDescription>Enter your credentials to manage spiritual content</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="admin@bhajansangam.com" className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" className="pl-10" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4 flex flex-col gap-4">
            <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 text-lg font-semibold" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Unauthorized access is strictly prohibited.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
