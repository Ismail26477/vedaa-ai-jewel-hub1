import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Image as ImageIcon,
  ArrowRight,
  Download
} from "lucide-react";

const matchLogs = [
  {
    id: 1,
    uploadedImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100",
    matchedJewelry: "Diamond Solitaire Ring",
    matchedImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100",
    similarity: 98.5,
    matchType: "exact",
    timestamp: "2024-12-25 14:32:15",
    user: "guest_user_4821"
  },
  {
    id: 2,
    uploadedImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100",
    matchedJewelry: "Pearl Strand Necklace",
    matchedImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100",
    similarity: 92.3,
    matchType: "close",
    timestamp: "2024-12-25 14:28:42",
    user: "guest_user_3912"
  },
  {
    id: 3,
    uploadedImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100",
    matchedJewelry: "Emerald Drop Earrings",
    matchedImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100",
    similarity: 95.8,
    matchType: "exact",
    timestamp: "2024-12-25 14:15:33",
    user: "guest_user_2847"
  },
  {
    id: 4,
    uploadedImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=100",
    matchedJewelry: "Traditional Gold Bangle",
    matchedImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=100",
    similarity: 87.2,
    matchType: "close",
    timestamp: "2024-12-25 13:58:21",
    user: "guest_user_5632"
  },
  {
    id: 5,
    uploadedImage: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=100",
    matchedJewelry: "Ruby Cocktail Ring",
    matchedImage: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=100",
    similarity: 99.1,
    matchType: "exact",
    timestamp: "2024-12-25 13:45:08",
    user: "guest_user_1294"
  },
  {
    id: 6,
    uploadedImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100",
    matchedJewelry: "Sapphire Pendant",
    matchedImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100",
    similarity: 76.4,
    matchType: "partial",
    timestamp: "2024-12-25 13:32:55",
    user: "guest_user_8471"
  },
  {
    id: 7,
    uploadedImage: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=100",
    matchedJewelry: "Gold Chain Necklace",
    matchedImage: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=100",
    similarity: 94.7,
    matchType: "exact",
    timestamp: "2024-12-25 13:21:17",
    user: "guest_user_6253"
  },
  {
    id: 8,
    uploadedImage: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=100",
    matchedJewelry: "Diamond Tennis Bracelet",
    matchedImage: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=100",
    similarity: 89.3,
    matchType: "close",
    timestamp: "2024-12-25 13:08:44",
    user: "guest_user_4127"
  },
];

const stats = [
  { label: "Total Matches Today", value: "156", icon: CheckCircle2 },
  { label: "Exact Matches", value: "89", icon: CheckCircle2 },
  { label: "Close Matches", value: "52", icon: AlertCircle },
  { label: "Avg. Similarity", value: "91.4%", icon: ImageIcon },
];

export default function MatchLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchFilter, setMatchFilter] = useState("all");

  const filteredLogs = matchLogs.filter(log => {
    if (matchFilter === "all") return true;
    return log.matchType === matchFilter;
  });

  const getMatchBadge = (type: string, similarity: number) => {
    if (type === "exact") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="w-3 h-3" />
          Exact Match
        </span>
      );
    } else if (type === "close") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
          <AlertCircle className="w-3 h-3" />
          Close Match
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
        Partial Match
      </span>
    );
  };

  return (
    <DashboardLayout title="Match Logs" subtitle="AI matching history and analytics">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="glass-card p-4 animate-slide-up opacity-0"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 animate-fade-in">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by jewelry name or user..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={matchFilter} onValueChange={setMatchFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Match Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Matches</SelectItem>
              <SelectItem value="exact">Exact Matches</SelectItem>
              <SelectItem value="close">Close Matches</SelectItem>
              <SelectItem value="partial">Partial Matches</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass-card-elevated overflow-hidden animate-slide-up opacity-0 delay-200" style={{ animationFillMode: 'forwards' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Uploaded Image</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground"></th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Matched Jewelry</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Similarity</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Match Type</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Timestamp</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr 
                  key={log.id}
                  className="border-t border-border hover:bg-secondary/30 transition-colors animate-slide-up opacity-0"
                  style={{ animationDelay: `${300 + index * 30}ms`, animationFillMode: 'forwards' }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={log.uploadedImage} 
                        alt="Uploaded" 
                        className="w-12 h-12 rounded-lg object-cover border border-border"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={log.matchedImage} 
                        alt={log.matchedJewelry} 
                        className="w-12 h-12 rounded-lg object-cover border-2 border-gold/30"
                      />
                      <div>
                        <p className="font-medium text-sm">{log.matchedJewelry}</p>
                        <p className="text-xs text-muted-foreground">{log.user}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            log.similarity >= 95 ? 'bg-emerald-500' : 
                            log.similarity >= 85 ? 'bg-amber-500' : 'bg-secondary-foreground/50'
                          }`}
                          style={{ width: `${log.similarity}%` }}
                        />
                      </div>
                      <span className={`text-sm font-semibold ${
                        log.similarity >= 95 ? 'text-emerald-600' : 
                        log.similarity >= 85 ? 'text-amber-600' : 'text-muted-foreground'
                      }`}>
                        {log.similarity}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    {getMatchBadge(log.matchType, log.similarity)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {log.timestamp}
                    </div>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {filteredLogs.length} of {matchLogs.length} results
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}