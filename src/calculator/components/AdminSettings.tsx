import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Settings, Save, Info, Lock, Plus, Trash2, Edit2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export interface PricingConfig {
  baseRate: number;
  longDistanceRate: number;
  discountTiers: { minDeliveries: number; discount: number }[];
}

interface AdminSettingsProps {
  config: PricingConfig;
  onSave: (config: PricingConfig) => void;
}

interface DiscountTier {
  minDeliveries: number;
  discount: number;
}

export function AdminSettings({ config, onSave }: AdminSettingsProps) {
  const [baseRate, setBaseRate] = useState<string>(config.baseRate.toString());
  const [longDistanceRate, setLongDistanceRate] = useState<string>(
    config.longDistanceRate.toString(),
  );
  const [discountTiers, setDiscountTiers] = useState<DiscountTier[]>(
    config.discountTiers,
  );
  const [editingTierIndex, setEditingTierIndex] = useState<number | null>(null);
  const [newTierMinDeliveries, setNewTierMinDeliveries] = useState<string>("");
  const [newTierDiscount, setNewTierDiscount] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const handleAddTier = () => {
    const minDel = parseInt(newTierMinDeliveries);
    const disc = parseInt(newTierDiscount);

    if (
      !isNaN(minDel) &&
      !isNaN(disc) &&
      minDel > 0 &&
      disc >= 0 &&
      disc <= 100
    ) {
      // Check if tier already exists
      if (discountTiers.some((t) => t.minDeliveries === minDel)) {
        alert("A tier for this delivery count already exists");
        return;
      }

      const newTiers = [
        ...discountTiers,
        { minDeliveries: minDel, discount: disc },
      ];
      setDiscountTiers(
        newTiers.sort((a, b) => a.minDeliveries - b.minDeliveries),
      );
      setNewTierMinDeliveries("");
      setNewTierDiscount("");
    }
  };

  const handleDeleteTier = (index: number) => {
    setDiscountTiers(discountTiers.filter((_, i) => i !== index));
    setEditingTierIndex(null);
  };

  const handleEditTier = (
    index: number,
    newMinDeliveries: string,
    newDiscount: string,
  ) => {
    const minDel = parseInt(newMinDeliveries);
    const disc = parseInt(newDiscount);

    if (
      !isNaN(minDel) &&
      !isNaN(disc) &&
      minDel > 0 &&
      disc >= 0 &&
      disc <= 100
    ) {
      // Check if tier already exists (excluding current tier)
      if (
        discountTiers.some((t, i) => i !== index && t.minDeliveries === minDel)
      ) {
        alert("A tier for this delivery count already exists");
        return;
      }

      const newTiers = [...discountTiers];
      newTiers[index] = { minDeliveries: minDel, discount: disc };
      setDiscountTiers(
        newTiers.sort((a, b) => a.minDeliveries - b.minDeliveries),
      );
      setEditingTierIndex(null);
    }
  };

  const handleSave = () => {
    const newConfig: PricingConfig = {
      baseRate: parseFloat(baseRate),
      longDistanceRate: parseFloat(longDistanceRate),
      discountTiers: discountTiers,
    };
    setIsSaving(true);
    setTimeout(() => {
      onSave(newConfig);
      setIsSaving(false);
    }, 600);
  };

  return (
    <Card className="shadow-lg border-gray-200 dark:border-slate-700 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-green-50/50 dark:from-purple-900/10 dark:to-green-900/10 pointer-events-none" />
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 p-2.5 rounded-lg">
            <Settings
              className="size-5 text-purple-600 dark:text-purple-400"
              strokeWidth={2}
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg text-slate-900 dark:text-white">
              Admin Control Panel
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 text-sm">
              Manage pricing rules and discount tiers
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold"
          >
            <Lock className="size-3 mr-1" />
            Protected
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        {/* Pricing Configuration */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
            Pricing Rules
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Base Rate */}
            <div className="space-y-2.5">
              <Label
                htmlFor="baseRate"
                className="text-slate-700 dark:text-slate-300 font-semibold"
              >
                Base Rate (0-2 KM)
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-600 dark:text-slate-400 pointer-events-none">
                  ₹
                </span>
                <Input
                  id="baseRate"
                  type="number"
                  value={baseRate}
                  onChange={(e) => setBaseRate(e.target.value)}
                  className="pl-8 h-11 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600 dark:text-white transition-all"
                  min="0"
                  step="0.1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 dark:text-slate-400 pointer-events-none">
                  /KM
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Per kilometer for first 2 KM
              </p>
            </div>

            {/* Long Distance Rate */}
            <div className="space-y-2.5">
              <Label
                htmlFor="longDistanceRate"
                className="text-slate-700 dark:text-slate-300 font-semibold"
              >
                Long-Distance Rate (2+ KM)
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-600 dark:text-slate-400 pointer-events-none">
                  ₹
                </span>
                <Input
                  id="longDistanceRate"
                  type="number"
                  value={longDistanceRate}
                  onChange={(e) => setLongDistanceRate(e.target.value)}
                  className="pl-8 h-11 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600 dark:text-white transition-all"
                  min="0"
                  step="0.1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 dark:text-slate-400 pointer-events-none">
                  /KM
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Per kilometer above 2 KM
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-slate-700" />

        {/* Discount Tiers */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded">
              <Info
                className="size-4 text-emerald-600 dark:text-emerald-400"
                strokeWidth={2.5}
              />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              Discount Structure
            </h4>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700/30 space-y-3">
            {discountTiers.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                No discount tiers configured. Add one to get started.
              </p>
            ) : (
              discountTiers.map((tier, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-slate-800/50 px-4 py-3 rounded-lg border border-emerald-100 dark:border-emerald-700/30 group hover:border-emerald-300 dark:hover:border-emerald-600/50 transition-colors"
                >
                  {editingTierIndex === index ? (
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-1 flex items-center gap-2">
                        <Input
                          type="number"
                          value={tier.minDeliveries}
                          onChange={(e) =>
                            handleEditTier(
                              index,
                              e.target.value,
                              tier.discount.toString(),
                            )
                          }
                          className="w-24 h-9 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                          min="1"
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          deliveries
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={tier.discount}
                          onChange={(e) =>
                            handleEditTier(
                              index,
                              tier.minDeliveries.toString(),
                              e.target.value,
                            )
                          }
                          className="w-20 h-9 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                          min="0"
                          max="100"
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          %
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingTierIndex(null)}
                        className="text-xs h-8"
                      >
                        Done
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {tier.minDeliveries === 2
                          ? "2 deliveries"
                          : tier.minDeliveries === 3
                            ? "3+ deliveries"
                            : `${tier.minDeliveries}+ deliveries`}
                      </span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
                          {tier.discount}% OFF
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingTierIndex(index)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit2 className="size-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteTier(index)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Add New Tier Section */}
          <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-700/30 space-y-3">
            <h5 className="text-sm font-semibold text-green-900 dark:text-green-300">
              Add New Discount Tier
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-green-800 dark:text-green-300">
                  Min Deliveries
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 4"
                  value={newTierMinDeliveries}
                  onChange={(e) => setNewTierMinDeliveries(e.target.value)}
                  className="h-10 text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                  min="1"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-green-800 dark:text-green-300">
                  Discount %
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 25"
                  value={newTierDiscount}
                  onChange={(e) => setNewTierDiscount(e.target.value)}
                  className="h-10 text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                  min="0"
                  max="100"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleAddTier}
                  className="w-full h-10 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-semibold text-sm"
                >
                  <Plus className="size-4 mr-1.5" />
                  Add Tier
                </Button>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Discount tiers are automatically applied when multiple deliveries
            share the same route
          </p>
        </div>

        <Separator className="bg-gray-200 dark:bg-slate-700" />

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full h-11 bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 dark:from-purple-600 dark:to-green-600 dark:hover:from-purple-700 dark:hover:to-green-700 text-white font-semibold shadow-lg shadow-purple-600/30 hover:shadow-purple-600/40 transition-all duration-300 text-base"
        >
          <span className="flex items-center justify-center gap-2">
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving Configuration...</span>
              </>
            ) : (
              <>
                <Save className="size-5" strokeWidth={2} />
                <span>Save Configuration</span>
              </>
            )}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
