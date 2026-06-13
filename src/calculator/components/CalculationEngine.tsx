import React, { useState } from "react";
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
import { Calculator, ArrowRight } from "lucide-react";

interface CalculationEngineProps {
  onCalculate: (distance: number, deliveries: number) => void;
}

export function CalculationEngine({ onCalculate }: CalculationEngineProps) {
  const [distance, setDistance] = useState<string>("");
  const [deliveries, setDeliveries] = useState<string>("1");
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    const dist = parseFloat(distance);
    const del = parseInt(deliveries);

    if (dist > 0 && del > 0) {
      setIsCalculating(true);
      setTimeout(() => setIsCalculating(false), 600);
      onCalculate(dist, del);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  return (
    <Card className="shadow-lg border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 p-2.5 rounded-lg">
            <Calculator
              className="size-5 text-blue-600 dark:text-blue-400"
              strokeWidth={2}
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg text-slate-900 dark:text-white">
              Calculation Engine
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 text-sm">
              Enter delivery details to calculate charges instantly
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Distance Input */}
        <div className="space-y-2.5">
          <Label
            htmlFor="distance"
            className="text-slate-700 dark:text-slate-300 font-semibold"
          >
            Delivery Distance
          </Label>
          <div className="relative">
            <Input
              id="distance"
              type="number"
              placeholder="e.g., 5.5"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-12 h-11 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600 dark:text-white transition-all"
              min="0"
              step="0.1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400 pointer-events-none">
              KM
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter the total distance in kilometers
          </p>
        </div>

        {/* Deliveries Input */}
        <div className="space-y-2.5">
          <Label
            htmlFor="deliveries"
            className="text-slate-700 dark:text-slate-300 font-semibold"
          >
            Deliveries on Same Route
          </Label>
          <Input
            id="deliveries"
            type="number"
            placeholder="e.g., 3"
            value={deliveries}
            onChange={(e) => setDeliveries(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-11 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600 dark:text-white transition-all"
            min="1"
            step="1"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            2+ deliveries automatically unlock shared route discounts
          </p>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={handleCalculate}
          disabled={isCalculating || !distance}
          className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all duration-300 text-base"
          size="lg"
        >
          <span className="flex items-center justify-center gap-2">
            {isCalculating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Calculating...</span>
              </>
            ) : (
              <>
                <Calculator className="size-5" strokeWidth={2} />
                <span>Calculate Charges</span>
                <ArrowRight className="size-4 opacity-75" strokeWidth={2} />
              </>
            )}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
