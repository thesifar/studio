"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Music, Video, Users, TrendingUp, PlusCircle, Settings, Database, Loader2, Sparkles } from "lucide-react";
import { BHAJANS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, limit } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";

export default function AdminDashboardPage() {
  const db = useFirestore();
  const [seeding, setSeeding] = useState(false);

  const stats = [
    { label: "Total Bhajans", value: BHAJANS.length, icon: Music, color: "text-blue-500" },
    { label: "Video Streams", value: BHAJANS.filter(b => b.type === 'video').length, icon: Video, color: "text-orange-500" },
    { label: "Active Listeners", value: "1,284", icon: Users, color: "text-green-500" },
    { label: "Avg. Daily Play", value: "458h", icon: TrendingUp, color: "text-purple-500" },
  ];

  const handleSeedData = async () => {
    if (!db) {
      toast({ title: "Database Error", description: "Firestore is not initialized. Please try again in a moment.", variant: "destructive" });
      return;
    }

    setSeeding(true);
    try {
      // Direct seeding without pre-check to bypass potential 'list' permission propagation delay
      const bhajansRef = collection(db, "bhajans");
      
      const seedPromises = BHAJANS.map((bhajan) => {
        const { id, ...data } = bhajan;
        return addDoc(bhajansRef, {
          ...data,
          createdAt: serverTimestamp(),
        });
      });

      await Promise.all(seedPromises);

      toast({ title: "Blessings Received!", description: "Successfully seeded your spiritual collection." });
    } catch (err: any) {
      console.error("Seeding failed:", err);
      toast({ 
        title: "Seeding Error", 
        description: err.message || "Failed to seed data. Ensure you are logged in.", 
        variant: "destructive" 
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="font-headline text-2xl font-bold">Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="rounded-full gap-2 border-primary/20 text-primary hover:bg-primary/5"
              onClick={handleSeedData}
              disabled={seeding}
            >
              {seeding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
              <span>Seed Sample Data</span>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 rounded-full">
              <Link href="/admin/bhajans/new" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Add Bhajan</span>
              </Link>
            </Button>
          </div>
        </header>

        <main className="p-6 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {BHAJANS.slice(0, 5).map((bhajan) => (
                    <div key={bhajan.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                          <img src={bhajan.thumbnail} alt={bhajan.title} className="object-cover w-full h-full" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm line-clamp-1">{bhajan.title}</p>
                          <p className="text-xs text-muted-foreground">{bhajan.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${bhajan.type === 'video' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
                          {bhajan.type}
                        </span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/bhajans/${bhajan.id}/edit`}>Edit</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" asChild className="mt-4 w-full text-primary">
                  <Link href="/admin/bhajans">View all bhajans</Link>
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-none shadow-sm bg-primary/5 border border-primary/10">
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-primary">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <div className="flex justify-between text-sm">
                         <span>Storage</span>
                         <span className="font-medium">64%</span>
                       </div>
                       <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                         <div className="h-full bg-primary w-[64%]" />
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-accent/10 rounded-bl-xl text-[8px] font-bold text-accent uppercase tracking-tighter">Prototype Helper</div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Quick Setup</CardTitle>
                  <CardDescription>Populate your sanctuary with one click</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start gap-2 h-11 border-accent/20 hover:bg-accent/5 text-accent font-semibold" 
                    onClick={handleSeedData}
                    disabled={seeding}
                  >
                    {seeding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Seed Sample Collection
                  </Button>
                  <Button variant="outline" className="justify-start gap-2 h-11" asChild>
                    <Link href="/admin/settings">
                      <Settings className="h-4 w-4" /> System Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}