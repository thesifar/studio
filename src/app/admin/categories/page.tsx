
"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { CATEGORIES, BHAJANS } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Search, PlusCircle, MoreVertical, Tags, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function AdminCategoriesPage() {
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const categoriesWithCounts = CATEGORIES.map(category => ({
    name: category,
    count: BHAJANS.filter(b => b.category === category).length
  }));

  const filteredCategories = categoriesWithCounts.filter(cat => 
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    // Simulate API call
    toast({
      title: "Category Created",
      description: `"${newCategoryName}" has been added to the sanctuary paths.`,
    });
    setNewCategoryName("");
    setIsAddDialogOpen(false);
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="font-headline text-2xl font-bold">Manage Categories</h1>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 rounded-full h-10 shadow-lg shadow-primary/20">
                <PlusCircle className="h-4 w-4 mr-2" />
                <span>New Category</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new devotional path for your collection.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. Ram Bhakti"
                    className="col-span-3"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddCategory}>Create Category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm bg-primary/5 border border-primary/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Tags className="h-4 w-4" /> Total Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{CATEGORIES.length}</div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-orange-500" /> Most Popular
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">Krishna Bhakti</div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">100%</div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-card p-4 rounded-xl border shadow-sm">
             <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Filter categories..." 
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
                  <TableHead>Category Name</TableHead>
                  <TableHead>Linked Bhajans</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat) => (
                    <TableRow key={cat.name} className="hover:bg-secondary/10 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Tags className="h-4 w-4" />
                          </div>
                          {cat.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">
                          {cat.count} items
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" title="Edit">
                             <Edit2 className="h-4 w-4 text-muted-foreground" />
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
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-32 text-center text-muted-foreground">
                      No categories found.
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
