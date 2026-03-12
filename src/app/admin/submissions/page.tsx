"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, Search, MonitorPlay, Music, Eye, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, where, orderBy, updateDoc, doc } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function AdminSubmissionsPage() {
  const db = useFirestore();
  const [search, setSearch] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const submissionsQuery = query(
    collection(db || ({} as any), 'submissions'),
    where('status', '==', 'pending'),
    orderBy('submittedAt', 'desc')
  );

  const { data: submissions, loading } = useCollection(db ? submissionsQuery : null);

  const handleApprove = async (id: string) => {
    if (!db) return;
    const docRef = doc(db, 'submissions', id);
    updateDoc(docRef, { status: 'approved' })
      .then(() => {
        toast({ title: "Approved", description: "Submission has been published." });
      })
      .catch(async () => {
        const err = new FirestorePermissionError({ path: docRef.path, operation: 'update', requestResourceData: { status: 'approved' } });
        errorEmitter.emit('permission-error', err);
      });
  };

  const handleReject = async (id: string) => {
    if (!db) return;
    const docRef = doc(db, 'submissions', id);
    updateDoc(docRef, { status: 'rejected' })
      .then(() => {
        toast({ title: "Rejected", description: "Submission has been removed.", variant: "destructive" });
      })
      .catch(async () => {
        const err = new FirestorePermissionError({ path: docRef.path, operation: 'update', requestResourceData: { status: 'rejected' } });
        errorEmitter.emit('permission-error', err);
      });
  };

  const filtered = (submissions || []).filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.artist.toLowerCase().includes(search.toLowerCase())
  );

  if (!isClient) return null;

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
            {loading ? "..." : (submissions?.length || 0)} Pending
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
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Table>
                <TableCaption>A list of user-submitted bhajans awaiting administrative review.</TableCaption>
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
                          {sub.submittedAt?.toDate ? sub.submittedAt.toDate().toLocaleDateString() : 'Pending...'}
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
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
