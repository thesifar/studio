"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, Shield, Globe, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API update
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your system configuration has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="font-headline text-2xl font-bold">System Settings</h1>
          </div>
        </header>

        <main className="p-6 max-w-4xl">
          <form onSubmit={handleSave} className="space-y-8">
            {/* General Settings */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Globe className="h-5 w-5" />
                  <CardTitle className="font-headline text-xl">General Configuration</CardTitle>
                </div>
                <CardDescription>Public identity and metadata of the sanctuary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input id="siteName" defaultValue="Bhajan Sangam" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input id="tagline" defaultValue="Spiritual Serenity" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Site Description</Label>
                  <Input id="description" defaultValue="A dedicated sanctuary for divine audio and video bhajans." />
                </div>
              </CardContent>
            </Card>

            {/* AI Settings */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Sparkles className="h-5 w-5" />
                  <CardTitle className="font-headline text-xl">AI Assistant Preferences</CardTitle>
                </div>
                <CardDescription>Configure how Genkit suggests metadata</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-suggest on upload</Label>
                    <p className="text-sm text-muted-foreground">Automatically trigger AI metadata suggestions when new files are added</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Thematic Detail Level</Label>
                    <p className="text-sm text-muted-foreground">Adjust the descriptiveness of AI generated text</p>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" className="rounded-full">Concise</Button>
                    <Button type="button" variant="default" size="sm" className="rounded-full">Balanced</Button>
                    <Button type="button" variant="outline" size="sm" className="rounded-full">Detailed</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Access */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Shield className="h-5 w-5" />
                  <CardTitle className="font-headline text-xl">Security & Access</CardTitle>
                </div>
                <CardDescription>Manage administrative access and system health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable the public site for updates</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Public Registration</Label>
                    <p className="text-sm text-muted-foreground">Allow new users to create spiritual accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-xl font-bold min-w-[140px]" 
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" /> 
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </form>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
