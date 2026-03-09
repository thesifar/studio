
"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { BHAJANS } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Search, PlusCircle, MoreVertical, Music, MonitorPlay } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function AdminBhajansPage() {
  const [search, setSearch] = useState("");

  const filteredBhajans = BHAJANS.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="font-headline text-2xl font-bold">Manage Bhajans</h1>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 rounded-full h-10">
            <Link href="/admin/bhajans/new" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>New Bhajan</span>
            </Link>
          </Button>
        </header>

        <main className="p-6">
          <div className="mb-6 flex items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Filter by title or artist..." 
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
          </div>

          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="w-[80px]">Format</TableHead>
                  <TableHead>Title & Artist</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBhajans.map((bhajan) => (
                  <TableRow key={bhajan.id} className="hover:bg-secondary/10 transition-colors">
                    <TableCell>
                       <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${bhajan.type === 'video' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                         {bhajan.type === 'video' ? <MonitorPlay className="h-5 w-5" /> : <Music className="h-5 w-5" />}
                       </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-sm line-clamp-1">{bhajan.title}</p>
                        <p className="text-xs text-muted-foreground">{bhajan.artist}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/5 text-primary border border-primary/10 whitespace-nowrap">
                        {bhajan.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{bhajan.language}</TableCell>
                    <TableCell className="text-xs font-mono">{bhajan.duration}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" asChild title="Edit">
                           <Link href={`/admin/bhajans/${bhajan.id}/edit`}>
                             <Edit2 className="h-4 w-4 text-muted-foreground" />
                           </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                             <DropdownMenuItem className="text-destructive">
                               <Trash2 className="h-4 w-4 mr-2" /> Delete
                             </DropdownMenuItem>
                             <DropdownMenuItem>View Public</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
