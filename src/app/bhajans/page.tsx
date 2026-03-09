
"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { BhajanCard } from "@/components/BhajanCard";
import { BHAJANS, CATEGORIES, LANGUAGES } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BhajansPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [language, setLanguage] = useState("all");
  const [type, setType] = useState("all");

  const filteredBhajans = BHAJANS.filter((bhajan) => {
    const matchesSearch = bhajan.title.toLowerCase().includes(search.toLowerCase()) || 
                          bhajan.artist.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || bhajan.category === category;
    const matchesLanguage = language === "all" || bhajan.language === language;
    const matchesType = type === "all" || bhajan.type === type;
    
    return matchesSearch && matchesCategory && matchesLanguage && matchesType;
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setLanguage("all");
    setType("all");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <header className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="font-headline text-4xl font-bold text-primary mb-4">Divine Collection</h1>
          <p className="text-muted-foreground">Browse through our extensive library of audio and video bhajans. Filter by category, language or search for your favorite artist.</p>
        </header>

        {/* Filters Section */}
        <div className="bg-card p-6 rounded-2xl border mb-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input 
                 placeholder="Search by title or artist..." 
                 className="pl-10"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
            </div>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {LANGUAGES.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Format</SelectItem>
                  <SelectItem value="audio">Audio Only</SelectItem>
                  <SelectItem value="video">Video Only</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" onClick={clearFilters} title="Clear Filters" className="shrink-0 border-primary/20 hover:bg-primary/5">
                <FilterX className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredBhajans.length}</span> bhajans
          </p>
        </div>

        {/* Grid */}
        {filteredBhajans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBhajans.map((bhajan) => (
              <BhajanCard key={bhajan.id} bhajan={bhajan} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary/20 rounded-2xl border border-dashed">
            <p className="text-lg text-muted-foreground mb-4">No bhajans found matching your criteria.</p>
            <Button variant="link" onClick={clearFilters} className="text-primary font-semibold">
              Reset all filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
