
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Music4, Lock, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError("Invalid credentials. Please ensure you have registered an account first at the public registration page.");
      setLoading(false);
    }
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
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="rounded-xl border-destructive/20 bg-destructive/5 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@bhajansangam.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 text-lg font-semibold mt-4" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pt-4 flex flex-col gap-4">
          <div className="text-center space-y-2 w-full">
            <p className="text-sm text-muted-foreground">
              Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Register here</Link>
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Authorized access only.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
