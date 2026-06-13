import { Milk, Settings } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface HeaderProps {
  pricingProfile: string;
}

export function Header({ pricingProfile }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm dark:shadow-lg">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center">
              <Milk className="size-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex flex-col gap-0.5">
                <h1 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Delivery Calculator
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Milk Route Optimizer
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <span className="text-xs lg:text-sm text-slate-600 dark:text-slate-300 font-medium">
                Profile:
              </span>
              <Badge
                variant="outline"
                className="border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold text-xs"
              >
                {pricingProfile}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Settings className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
