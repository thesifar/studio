
"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES, LANGUAGES } from "@/lib/mock-data";
import { UploadCloud, Music, Video, Loader2, CheckCircle2, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function SubmitBhajanPage() {
  const db = useFirestore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    category: "",
    language: "",
    type: "audio" as "audio" | "video",
    url: "",
    description: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    
    setLoading(true);
    
    const submissionData = {
      ...formData,
      status: 'pending',
      submittedAt: serverTimestamp()
    };

    const submissionsRef = collection(db, 'submissions');
    
    addDoc(submissionsRef, submissionData)
      .then(() => {
        setLoading(false);
        setSubmitted(true);
        toast({
          title: "Submission Received",
          description: "Your bhajan has been sent for administrative review.",
        });
      })
      .catch(async (error) => {
        setLoading(false);
        const permissionError = new FirestorePermissionError({
          path: submissionsRef.path,
          operation: 'create',
          requestResourceData: submissionData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-spiritual-gradient flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center p-8 border-none shadow-2xl rounded-[2rem] bg-white/80 backdrop-blur-md">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">Auspicious Submission!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for contributing to the Bhajan Sangam collection. Our team will review your submission and publish it shortly.
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild className="rounded-full h-12 font-bold">
                <Link href="/bhajans">Browse Collection</Link>
              </Button>
              <Button variant="ghost" onClick={() => setSubmitted(false)} className="text-primary font-bold">
                Submit Another
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spiritual-gradient flex flex-col">
      <Navigation />
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-32">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
            <Heart className="h-6 w-6" />
          </div>
          <h1 className="font-headline text-4xl font-bold text-primary mb-2">Contribute a Bhajan</h1>
          <p className="text-muted-foreground">Share divine melodies with the community. Your contribution preserves our eternal culture.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="font-headline text-xl">Bhajan Details</CardTitle>
              <CardDescription>Fill in the metadata for your devotional content</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Bhajan Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Achyutam Keshavam" 
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist">Artist / Singer</Label>
                  <Input 
                    id="artist" 
                    placeholder="e.g. Traditional" 
                    value={formData.artist}
                    onChange={(e) => handleInputChange("artist", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(val) => handleInputChange("category", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select path" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={formData.language} onValueChange={(val) => handleInputChange("language", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Format Type</Label>
                <div className="flex gap-4">
                  <Button 
                    type="button" 
                    variant={formData.type === 'audio' ? 'default' : 'outline'} 
                    className="flex-1 rounded-xl h-12 gap-2"
                    onClick={() => handleInputChange("type", "audio")}
                  >
                    <Music className="h-4 w-4" /> Audio
                  </Button>
                  <Button 
                    type="button" 
                    variant={formData.type === 'video' ? 'default' : 'outline'} 
                    className="flex-1 rounded-xl h-12 gap-2"
                    onClick={() => handleInputChange("type", "video")}
                  >
                    <Video className="h-4 w-4" /> Video
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Media URL (YouTube/SoundCloud/Direct Link)</Label>
                <Input 
                  id="url" 
                  placeholder="https://..." 
                  value={formData.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">About this Bhajan</Label>
                <Textarea 
                  id="description" 
                  placeholder="What makes this bhajan special?" 
                  className="min-h-[120px] rounded-xl"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="bg-secondary/20 p-8 flex justify-end">
              <Button type="submit" disabled={loading} className="rounded-full px-10 h-14 font-bold text-lg shadow-lg shadow-primary/20">
                {loading ? (
                  <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Submitting...</>
                ) : (
                  <><UploadCloud className="h-5 w-5 mr-2" /> Submit for Review</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  );
}
