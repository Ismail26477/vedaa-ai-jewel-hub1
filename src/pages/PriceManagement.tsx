import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Save, 
  History,
  IndianRupee,
  Coins
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const priceHistory = [
  { date: "Dec 25, 2024", gold22k: 6850, gold18k: 5600, silver: 92, change: "+1.2%" },
  { date: "Dec 24, 2024", gold22k: 6770, gold18k: 5535, silver: 91, change: "-0.5%" },
  { date: "Dec 23, 2024", gold22k: 6804, gold18k: 5563, silver: 90, change: "+0.8%" },
  { date: "Dec 22, 2024", gold22k: 6750, gold18k: 5520, silver: 89, change: "+0.3%" },
  { date: "Dec 21, 2024", gold22k: 6730, gold18k: 5503, silver: 88, change: "-0.2%" },
  { date: "Dec 20, 2024", gold22k: 6743, gold18k: 5514, silver: 89, change: "+1.5%" },
  { date: "Dec 19, 2024", gold22k: 6643, gold18k: 5432, silver: 87, change: "+0.7%" },
];

export default function PriceManagement() {
  const { toast } = useToast();
  const [goldPrice22k, setGoldPrice22k] = useState("6850");
  const [goldPrice18k, setGoldPrice18k] = useState("5600");
  const [silverPrice, setSilverPrice] = useState("92");
  const [weight, setWeight] = useState("10");
  const [makingCharges, setMakingCharges] = useState("2000");
  const [isUpdating, setIsUpdating] = useState(false);

  const calculatePrice = (pricePerGram: number) => {
    const w = parseFloat(weight) || 0;
    const m = parseFloat(makingCharges) || 0;
    return (w * pricePerGram + m).toLocaleString('en-IN');
  };

  const handleUpdateRates = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      toast({
        title: "Rates Updated Successfully",
        description: "Today's metal rates have been saved.",
      });
    }, 1500);
  };

  return (
    <DashboardLayout title="Price Management" subtitle="Manage daily metal rates and calculations">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Current Rates Cards */}
        <div className="glass-card-elevated p-6 animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center shadow-gold">
              <Coins className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="flex items-center gap-1 text-sm text-emerald-600 font-medium">
              <TrendingUp className="w-4 h-4" />
              +1.2%
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Gold 22K (per gram)</p>
          <p className="text-3xl font-serif font-bold gold-text">₹{parseInt(goldPrice22k).toLocaleString('en-IN')}</p>
        </div>

        <div className="glass-card-elevated p-6 animate-slide-up opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Coins className="w-6 h-6 text-amber-600" />
            </div>
            <span className="flex items-center gap-1 text-sm text-emerald-600 font-medium">
              <TrendingUp className="w-4 h-4" />
              +0.9%
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Gold 18K (per gram)</p>
          <p className="text-3xl font-serif font-bold text-amber-600">₹{parseInt(goldPrice18k).toLocaleString('en-IN')}</p>
        </div>

        <div className="glass-card-elevated p-6 animate-slide-up opacity-0 delay-200" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <Coins className="w-6 h-6 text-slate-500" />
            </div>
            <span className="flex items-center gap-1 text-sm text-red-500 font-medium">
              <TrendingDown className="w-4 h-4" />
              -0.3%
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Silver (per gram)</p>
          <p className="text-3xl font-serif font-bold text-slate-600">₹{parseInt(silverPrice).toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Update Rates Form */}
        <div className="glass-card-elevated p-6 animate-slide-up opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold">Update Daily Rates</h3>
              <p className="text-sm text-muted-foreground">Set today's metal prices</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gold22k">Gold 22K (₹/gram)</Label>
                <Input
                  id="gold22k"
                  type="number"
                  value={goldPrice22k}
                  onChange={(e) => setGoldPrice22k(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gold18k">Gold 18K (₹/gram)</Label>
                <Input
                  id="gold18k"
                  type="number"
                  value={goldPrice18k}
                  onChange={(e) => setGoldPrice18k(e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="silver">Silver (₹/gram)</Label>
              <Input
                id="silver"
                type="number"
                value={silverPrice}
                onChange={(e) => setSilverPrice(e.target.value)}
                className="h-11"
              />
            </div>

            <Button 
              variant="gold" 
              className="w-full mt-2"
              onClick={handleUpdateRates}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Today's Rates
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Price Calculator */}
        <div className="glass-card-elevated p-6 animate-slide-up opacity-0 delay-400" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold">Price Calculator</h3>
              <p className="text-sm text-muted-foreground">Preview jewelry pricing</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calcWeight">Weight (grams)</Label>
                <Input
                  id="calcWeight"
                  type="number"
                  step="0.01"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="making">Making Charges (₹)</Label>
                <Input
                  id="making"
                  type="number"
                  value={makingCharges}
                  onChange={(e) => setMakingCharges(e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-secondary/50 space-y-3">
              <p className="text-sm font-medium text-muted-foreground mb-3">Estimated Prices:</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">Gold 22K</span>
                <span className="font-serif font-bold gold-text">₹{calculatePrice(parseFloat(goldPrice22k))}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Gold 18K</span>
                <span className="font-serif font-bold text-amber-600">₹{calculatePrice(parseFloat(goldPrice18k))}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Silver</span>
                <span className="font-serif font-bold text-slate-600">₹{calculatePrice(parseFloat(silverPrice))}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Formula: (Weight × Rate) + Making Charges
            </p>
          </div>
        </div>
      </div>

      {/* Price History Table */}
      <div className="glass-card-elevated p-6 mt-6 animate-slide-up opacity-0 delay-500" style={{ animationFillMode: 'forwards' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
            <History className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold">Price History</h3>
            <p className="text-sm text-muted-foreground">Last 7 days rate changes</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Gold 22K</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Gold 18K</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Silver</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Change</th>
              </tr>
            </thead>
            <tbody>
              {priceHistory.map((row, index) => (
                <tr 
                  key={row.date} 
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors animate-slide-up opacity-0"
                  style={{ animationDelay: `${600 + index * 50}ms`, animationFillMode: 'forwards' }}
                >
                  <td className="py-3 px-4 text-sm font-medium">{row.date}</td>
                  <td className="py-3 px-4 text-right text-sm gold-text font-semibold">₹{row.gold22k.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-right text-sm text-amber-600 font-semibold">₹{row.gold18k.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-right text-sm text-slate-600 font-semibold">₹{row.silver}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                      row.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'
                    }`}>
                      {row.change.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {row.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}