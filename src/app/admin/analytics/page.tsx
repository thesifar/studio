"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart, Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Music, Users, TrendingUp, PlayCircle, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock Data Sets
const dataSets = {
  "7days": {
    label: "Last 7 Days",
    totalStreams: "4,420",
    uniqueListeners: "1,284",
    trendData: [
      { label: "Mon", count: 450 },
      { label: "Tue", count: 520 },
      { label: "Wed", count: 480 },
      { label: "Thu", count: 610 },
      { label: "Fri", count: 590 },
      { label: "Sat", count: 850 },
      { label: "Sun", count: 920 },
    ],
    categoryData: [
      { name: "Krishna Bhakti", value: 400 },
      { name: "Shiva Mahima", value: 300 },
      { name: "Ganesha Stuti", value: 200 },
      { name: "Hanuman Chalisa", value: 278 },
    ],
    engagementData: [
      { time: "4am", users: 120 },
      { time: "8am", users: 450 },
      { time: "12pm", users: 300 },
      { time: "4pm", users: 580 },
      { time: "8pm", users: 720 },
      { time: "12am", users: 310 },
    ]
  },
  "month": {
    label: "Last Month",
    totalStreams: "18,250",
    uniqueListeners: "5,420",
    trendData: [
      { label: "Week 1", count: 4100 },
      { label: "Week 2", count: 4800 },
      { label: "Week 3", count: 4350 },
      { label: "Week 4", count: 5000 },
    ],
    categoryData: [
      { name: "Krishna Bhakti", value: 1800 },
      { name: "Shiva Mahima", value: 1400 },
      { name: "Ganesha Stuti", value: 950 },
      { name: "Hanuman Chalisa", value: 1200 },
    ],
    engagementData: [
      { time: "W1", users: 1200 },
      { time: "W2", users: 1450 },
      { time: "W3", users: 1300 },
      { time: "W4", users: 1580 },
    ]
  },
  "year": {
    label: "Last Year",
    totalStreams: "214,800",
    uniqueListeners: "42,150",
    trendData: [
      { label: "Jan", count: 15200 },
      { label: "Feb", count: 14800 },
      { label: "Mar", count: 16500 },
      { label: "Apr", count: 18100 },
      { label: "May", count: 17200 },
      { label: "Jun", count: 19500 },
      { label: "Jul", count: 21000 },
      { label: "Aug", count: 22500 },
      { label: "Sep", count: 20800 },
      { label: "Oct", count: 23400 },
      { label: "Nov", count: 24900 },
      { label: "Dec", count: 27800 },
    ],
    categoryData: [
      { name: "Krishna Bhakti", value: 75000 },
      { name: "Shiva Mahima", value: 62000 },
      { name: "Ganesha Stuti", value: 38000 },
      { name: "Hanuman Chalisa", value: 39800 },
    ],
    engagementData: [
      { time: "Q1", users: 35000 },
      { time: "Q2", users: 41000 },
      { time: "Q3", users: 45000 },
      { time: "Q4", users: 52000 },
    ]
  }
};

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--primary)/0.6)', 'hsl(var(--accent)/0.6)'];

const chartConfig = {
  count: {
    label: "Streams",
    color: "hsl(var(--primary))",
  },
  users: {
    label: "Active Users",
    color: "hsl(var(--accent))",
  },
  value: {
    label: "Popularity",
  }
} satisfies ChartConfig;

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState<keyof typeof dataSets>("7days");
  const currentData = dataSets[range];

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="font-headline text-2xl font-bold">Analytics Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={range} onValueChange={(v) => setRange(v as keyof typeof dataSets)}>
              <SelectTrigger className="w-[180px] rounded-full bg-secondary/30 border-none h-9">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <main className="p-6 space-y-8">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
                <PlayCircle className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.totalStreams}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12% growth
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Unique Listeners</CardTitle>
                <Users className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.uniqueListeners}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +5% growth
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary/80" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24m 15s</div>
                <p className="text-xs text-muted-foreground mt-1">Stable session time</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">New Content</CardTitle>
                <Music className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground mt-1">Added this period</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Play Trend Chart */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline">Play Trends</CardTitle>
                <CardDescription>Streaming volume for {currentData.label}</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart data={currentData.trendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="label" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} 
                    />
                    <ChartTooltip 
                      cursor={{ fill: 'hsl(var(--secondary)/0.5)' }} 
                      content={<ChartTooltipContent hideLabel />} 
                    />
                    <Bar 
                      dataKey="count" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                      barSize={range === 'year' ? 20 : 40}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Category Distribution Chart */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline">Devotion Categories</CardTitle>
                <CardDescription>Popularity by bhajan theme</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <PieChart>
                    <Pie
                      data={currentData.categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {currentData.categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="flex flex-col gap-2 ml-4">
                   {currentData.categoryData.map((item, i) => (
                     <div key={item.name} className="flex items-center gap-2">
                       <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                       <span className="text-[10px] font-medium whitespace-nowrap">{item.name}</span>
                     </div>
                   ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Engagement Chart */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="font-headline">User Engagement</CardTitle>
              <CardDescription>Active users throughout the period</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
               <ChartContainer config={chartConfig} className="h-full w-full">
                 <LineChart data={currentData.engagementData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                   <XAxis dataKey="time" axisLine={false} tickLine={false} />
                   <ChartTooltip content={<ChartTooltipContent />} />
                   <Line 
                     type="monotone" 
                     dataKey="users" 
                     stroke="hsl(var(--accent))" 
                     strokeWidth={3} 
                     dot={{ r: 4, fill: "hsl(var(--accent))" }} 
                     activeDot={{ r: 6 }}
                   />
                 </LineChart>
               </ChartContainer>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
