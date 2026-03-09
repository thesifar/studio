
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Wand2, Tag, Save, X, Loader2, Music, Video as VideoIcon } from "lucide-react";
import { CATEGORIES, LANGUAGES } from "@/lib/mock-data";
import { generateBhajanDescription } from "@/ai/flows/admin-bhajan-description-generation";
import { adminBhajanTagSuggestion } from "@/ai/flows/admin-bhajan-tag-suggestion-flow";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function AddBhajanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    category: "",
    language: "",
    type: "audio" as "audio" | "video",
    description: "",
    tags: [] as string[],
    url: "",
    duration: ""
  });

  const [newTag, setNewTag] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.title) {
      toast({ title: "Title Required", description: "Please enter a title before generating a description.", variant: "destructive" });
      return;
    }

    setAiGenerating(true);
    try {
      const result = await generateBhajanDescription({
        title: formData.title,
        keywords: [formData.artist, formData.category, ...formData.tags].filter(Boolean)
      });
      setFormData(prev => ({ ...prev, description: result.description }));
      toast({ title: "Description Generated", description: "AI has created a thematic description for you." });
    } catch (error) {
      toast({ title: "AI Generation Failed", description: "Could not generate description at this time.", variant: "destructive" });
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSuggestTags = async () => {
    if (!formData.title || !formData.description) {
      toast({ title: "Context Required", description: "Please enter a title and description for tag suggestions.", variant: "destructive" });
      return;
    }

    setAiGenerating(true);
    try {
      const result = await adminBhajanTagSuggestion({
        title: formData.title,
        description: formData.description
      });
      
      const combinedTags = Array.from(new Set([...formData.tags, ...result.suggestedTags]));
      setFormData(prev => ({ ...prev, tags: combinedTags }));
      toast({ title: "Tags Suggested", description: "AI suggested relevant tags and categories." });
      
      if (result.suggestedCategories.length > 0 && !formData.category) {
        // Just pick the first suggested category if none is set
        setFormData(prev => ({ ...prev, category: result.suggestedCategories[0] }));
      }
    } catch (error) {
      toast({ title: "Tag Suggestion Failed", description: "Could not suggest tags at this time.", variant: "destructive" });
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Success", description: "New bhajan has been added to the collection." });
      router.push("/admin/bhajans");
    }, 1500);
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="font-headline text-2xl font-bold">Add New Bhajan</h1>
          </div>
        </header>

        <main className="p-6 max-w-4xl mx-auto w-full">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Basic Info */}
              <div className="space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">General Information</CardTitle>
                    <CardDescription>Basic metadata for the bhajan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input 
                        id="title" 
                        placeholder="e.g. Om Jai Jagdish Hare" 
                        value={formData.title} 
                        onChange={(e) => handleInputChange("title", e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist">Artist / Singer</Label>
                      <Input 
                        id="artist" 
                        placeholder="e.g. Anuradha Paudwal" 
                        value={formData.artist} 
                        onChange={(e) => handleInputChange("artist", e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={formData.category} onValueChange={(val) => handleInputChange("category", val)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select value={formData.language} onValueChange={(val) => handleInputChange("language", val)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Content Type</Label>
                      <div className="flex gap-4">
                        <Button 
                          type="button" 
                          variant={formData.type === 'audio' ? 'default' : 'outline'} 
                          className="flex-1 gap-2"
                          onClick={() => setFormData(prev => ({ ...prev, type: 'audio' }))}
                        >
                          <Music className="h-4 w-4" /> Audio
                        </Button>
                        <Button 
                          type="button" 
                          variant={formData.type === 'video' ? 'default' : 'outline'} 
                          className="flex-1 gap-2"
                          onClick={() => setFormData(prev => ({ ...prev, type: 'video' }))}
                        >
                          <VideoIcon className="h-4 w-4" /> Video
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">Media & Duration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="url">Resource URL</Label>
                      <Input 
                        id="url" 
                        placeholder="https://..." 
                        value={formData.url} 
                        onChange={(e) => handleInputChange("url", e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (MM:SS)</Label>
                      <Input 
                        id="duration" 
                        placeholder="05:30" 
                        value={formData.duration} 
                        onChange={(e) => handleInputChange("duration", e.target.value)} 
                        required 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: AI Tools & Tags */}
              <div className="space-y-6">
                <Card className="border-none shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 bg-primary/10 rounded-bl-xl text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                    <Wand2 className="h-3 w-3" /> AI Assistant
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">Thematic Description</CardTitle>
                    <CardDescription>Describe the essence of this bhajan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea 
                      rows={6} 
                      placeholder="Enter description or use AI tool..." 
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full border-primary/20 hover:bg-primary/10 text-primary font-semibold"
                      onClick={handleGenerateDescription}
                      disabled={aiGenerating}
                    >
                      {aiGenerating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Wand2 className="h-4 w-4 mr-2" />}
                      Generate description with AI
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">Tags & Keywords</CardTitle>
                    <CardDescription>Help users find this content easily</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add tag..." 
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      />
                      <Button type="button" size="icon" onClick={handleAddTag} variant="secondary">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-12 p-3 bg-secondary/20 rounded-xl border border-dashed">
                      {formData.tags.length > 0 ? (
                        formData.tags.map(tag => (
                          <Badge key={tag} className="gap-1 pr-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                            {tag}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                          </Badge>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground self-center">No tags added yet</p>
                      )}
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full border-primary/20 hover:bg-primary/10 text-primary font-semibold"
                      onClick={handleSuggestTags}
                      disabled={aiGenerating}
                    >
                      {aiGenerating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Tag className="h-4 w-4 mr-2" />}
                      Suggest smart tags with AI
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button type="button" variant="ghost" onClick={() => router.back()} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 min-w-32 h-12 rounded-xl font-bold" disabled={loading || aiGenerating}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="h-5 w-5 mr-2" /> Save Bhajan</>}
              </Button>
            </div>
          </form>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
