"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Music4, Lock, Mail, AlertCircle, Chrome } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Navigation } from "@/components/Navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const redirectPath = searchParams.get("redirect") || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(redirectPath);
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!auth) return;
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push(redirectPath);
    } catch (err: any) {
      setError(err.message || "Could not sign in with Google.");
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-xl bg-card/80 backdrop-blur-md rounded-2xl">
      <CardHeader className="space-y-1 text-center pb-8">
        <CardTitle className="font-headline text-3xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to continue your journey</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="rounded-xl border-destructive/20 bg-destructive/5 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 gap-3">
            <Button 
              type="button" 
              variant="outline" 
              className="rounded-xl h-11 font-semibold gap-2"
              onClick={handleGoogleLogin}
              disabled={loading}
              suppressHydrationWarning
            >
              <Chrome className="h-4 w-4" /> Continue with Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground font-bold">Or continue with email</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                suppressHydrationWarning
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                suppressHydrationWarning
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4 flex flex-col gap-4">
          <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 text-lg font-semibold" disabled={loading} suppressHydrationWarning>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">New to the sanctuary? </span>
            <Link href="/register" className="text-primary font-bold hover:underline">Create an account</Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-spiritual-gradient flex flex-col items-center justify-center p-4">
      <Navigation />
      
      <div className="w-full max-w-md mt-20">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 group">
          <div className="bg-primary p-2 rounded-full transition-transform group-hover:scale-110">
            <Music4 className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline font-bold text-2xl text-primary">Bhajan Sangam</span>
        </Link>

        <Suspense fallback={<div className="text-center py-10">Loading auth...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
