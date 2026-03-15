
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Music4, Lock, Mail, AlertCircle, User, Chrome } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth, useFirestore } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Navigation } from "@/components/Navigation";

export default function RegisterPage() {
  const router = useRouter();
  const auth = useAuth();
  const db = useFirestore();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !db) return;
    
    setError(null);
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      // Create user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: name,
        email: email,
        role: "user",
        createdAt: serverTimestamp(),
      });

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Could not create account. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!auth || !db) return;
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Ensure profile exists in Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
        createdAt: serverTimestamp(),
      }, { merge: true });

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Could not sign up with Google.");
      setLoading(false);
    }
  };

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

        <Card className="border-none shadow-xl bg-card/80 backdrop-blur-md rounded-2xl">
          <CardHeader className="space-y-1 text-center pb-8">
            <CardTitle className="font-headline text-3xl font-bold">Join the Sanctuary</CardTitle>
            <CardDescription>Create an account to preserve your spiritual journey</CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="rounded-xl border-destructive/20 bg-destructive/5 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="button" 
                variant="outline" 
                className="w-full rounded-xl h-11 font-semibold gap-2"
                onClick={handleGoogleSignup}
                disabled={loading}
              >
                <Chrome className="h-4 w-4" /> Join with Google
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground font-bold">Or with email</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Arjun Dev"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
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
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
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
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 flex flex-col gap-4">
              <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 text-lg font-semibold" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
