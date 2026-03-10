"use client";

import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip, Line, LineChart, Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Music, Users, TrendingUp, PlayCircle, Calendar } from "lucide-react";

const playTrendData = [
  { day: "Mon", count: 450 },
  { day: "Tue", count: 520 },
  { day: "Wed", count: 480 },
  { day: "Thu", count: 610 },
  { day: "Fri", count: 590 },
  { day: "Sat", count: 850 },
  { day: "Sun", count: 920 },
];

const categoryData = [
  { name: "Krishna Bhakti", value: 400 },
  { name: "Shiva Mahima", value: 300 },
  { name: "Ganesha Stuti", value: 200 },
  { name: "Hanuman Chalisa", value: 278 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--primary)/0.6)', 'hsl(var(--accent)/0.6)'];

export default function AdminAnalyticsPage() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="font-headline text-2xl font-bold">Analytics & Insights</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-full">
            <Calendar className="h-4 w-4" />
            <span>Last 7 Days</span>
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
                <div className="text-2xl font-bold">4,420</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12% from last week
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Unique Listeners</CardTitle>
                <Users className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +5% from last week
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary/80" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24m 15s</div>
                <p className="text-xs text-muted-foreground mt-1">Stable across devices</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">New Submissions</CardTitle>
                <Music className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting AI metadata</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Play Trend Chart */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline">Daily Play Trends</CardTitle>
                <CardDescription>Number of bhajans played per day</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={playTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    />
                    <Tooltip 
                      cursor={{ fill: 'hsl(var(--secondary)/0.5)' }} 
                      content={<ChartTooltipContent hideLabel />} 
                    />
                    <Bar 
                      dataKey="count" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution Chart */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline">Devotion Distribution</CardTitle>
                <CardDescription>Popularity by bhajan category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2 ml-4">
                   {categoryData.map((item, i) => (
                     <div key={item.name} className="flex items-center gap-2">
                       <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                       <span className="text-xs font-medium">{item.name}</span>
                     </div>
                   ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Device Usage Line Chart */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="font-headline">Peak Hours Engagement</CardTitle>
              <CardDescription>Active users throughout the day (Average)</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={[
                   { hour: "4am", users: 120 },
                   { hour: "6am", users: 450 },
                   { hour: "8am", users: 300 },
                   { hour: "12pm", users: 200 },
                   { hour: "6pm", users: 580 },
                   { hour: "8pm", users: 720 },
                   { hour: "10pm", users: 310 },
                 ]}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                   <XAxis dataKey="hour" axisLine={false} tickLine={false} />
                   <Tooltip content={<ChartTooltipContent />} />
                   <Line 
                     type="monotone" 
                     dataKey="users" 
                     stroke="hsl(var(--accent))" 
                     strokeWidth={3} 
                     dot={{ r: 4, fill: "hsl(var(--accent))" }} 
                     activeDot={{ r: 6 }}
                   />
                 </LineChart>
               </ResponsiveContainer>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
