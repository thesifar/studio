"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, Search, MonitorPlay, Music, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Mock Submissions
const MOCK_SUBMISSIONS = [
  {
    id: "s1",
    title: "Vande Mataram",
    artist: "Pratibha Singh",
    category: "Devi Aradhana",
    language: "Sanskrit",
    type: "audio",
    submittedAt: "2024-03-20T14:30:00Z"
  },
  {
    id: "s2",
    title: "Hanuman Ashtak",
    artist: "Hari Om Sharan",
    category: "Hanuman Chalisa",
    language: "Hindi",
    type: "video",
    submittedAt: "2024-03-21T09:15:00Z"
  },
  {
    id: "s3",
    title: "Om Namah Shivaya",
    artist: "Bhakti Chorus",
    category: "Shiva Mahima",
    language: "Hindi",
    type: "audio",
    submittedAt: "2024-03-21T16:45:00Z"
  }
];

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
  const [search, setSearch] = useState("");

  const handleApprove = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
    toast({
      title: "Approved",
      description: "Submission has been published to the divine collection.",
    });
  };

  const handleReject = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
    toast({
      title: "Rejected",
      description: "Submission has been removed from the review queue.",
      variant: "destructive"
    });
  };

  const filtered = submissions.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="font-headline text-2xl font-bold">User Submissions</h1>
          </div>
          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 px-3 py-1">
            {submissions.length} Pending
          </Badge>
        </header>

        <main className="p-6 space-y-6">
          <div className="bg-card p-4 rounded-xl border shadow-sm">
             <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Filter submissions..." 
                  className="pl-10 h-11"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
          </div>

          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="w-[80px]">Type</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead className="text-right">Decision</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((sub) => (
                    <TableRow key={sub.id} className="hover:bg-secondary/10 transition-colors">
                      <TableCell>
                         <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${sub.type === 'video' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                           {sub.type === 'video' ? <MonitorPlay className="h-5 w-5" /> : <Music className="h-5 w-5" />}
                         </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-sm line-clamp-1">{sub.title}</p>
                          <p className="text-xs text-muted-foreground">{sub.artist}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider border-primary/20 text-primary">
                          {sub.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View Detail">
                             <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleApprove(sub.id)}
                            title="Approve"
                          >
                             <Check className="h-5 w-5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleReject(sub.id)}
                            title="Reject"
                          >
                             <X className="h-5 w-5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      No pending submissions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
