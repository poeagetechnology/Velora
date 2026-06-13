import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, Minus, Zap } from "lucide-react";
import { Separator } from "./ui/separator";

interface CalculationResult {
  distance: number;
  deliveries: number;
  baseCharge: number;
  longDistanceCharge: number;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  totalCharge: number;
  costPerDelivery: number;
}

interface ResultsPanelProps {
  result: CalculationResult | null;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  if (!result) {
    return (
      <Card className="shadow-lg border-gray-200 dark:border-slate-700 h-full sticky top-[5rem] lg:top-24">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 p-2.5 rounded-lg">
              <TrendingUp
                className="size-5 text-blue-600 dark:text-blue-400"
                strokeWidth={2}
              />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg text-slate-900 dark:text-white">
                Results & Analytics
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap
                  className="size-8 text-slate-400 dark:text-slate-600"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Enter delivery details above to view
              </p>
              <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">
                instant cost breakdown & analytics
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-gray-200 dark:border-slate-700 sticky top-[5rem] lg:top-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 pointer-events-none" />
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 p-2.5 rounded-lg">
            <TrendingUp
              className="size-5 text-blue-600 dark:text-blue-400"
              strokeWidth={2}
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg text-slate-900 dark:text-white">
              Results & Analytics
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        {/* Final Total with Animation */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-700 p-6 rounded-xl shadow-lg shadow-blue-600/30 transform transition-transform hover:scale-105 duration-300">
          <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider">
            Final Total Charge
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-black text-white">
              ₹{result.totalCharge.toFixed(2)}
            </span>
            <span className="text-blue-100 text-sm font-medium">Total</span>
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-slate-700" />

        <Separator className="bg-gray-200 dark:bg-slate-700" />

        {/* Detailed Breakdown */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
            Detailed Breakdown
          </h4>

          <div className="space-y-3.5">
            {/* Base Charge */}
            <div className="bg-gray-50 dark:bg-slate-800/50 p-3.5 rounded-lg border border-gray-200 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-700/50 transition-colors">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Base Distance Charge
                </span>
                <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                  ₹{result.baseCharge.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                First 2 KM at ₹2/KM
              </p>
            </div>

            {/* Long Distance Charge */}
            {result.longDistanceCharge > 0 && (
              <div className="bg-gray-50 dark:bg-slate-800/50 p-3.5 rounded-lg border border-gray-200 dark:border-slate-700/50 hover:border-orange-300 dark:hover:border-orange-700/50 transition-colors">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Long Distance Surcharge
                  </span>
                  <span className="text-base font-bold text-orange-600 dark:text-orange-400">
                    ₹{result.longDistanceCharge.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {(result.distance - 2).toFixed(1)} KM above 2 KM @ ₹3.5/KM
                </p>
              </div>
            )}

            {/* Subtotal */}
            <div className="bg-gray-50 dark:bg-slate-800/50 p-3.5 rounded-lg border border-gray-200 dark:border-slate-700/50">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Subtotal
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  ₹{result.subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Discount */}
            {result.discountAmount > 0 && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3.5 rounded-lg border-2 border-emerald-300 dark:border-emerald-700/50">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <Minus className="size-4" strokeWidth={3} />
                    Route Discount Applied
                  </span>
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    -₹{result.discountAmount.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  {result.discountPercent}% discount on {result.deliveries}{" "}
                  deliveries
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
