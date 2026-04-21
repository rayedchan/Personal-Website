"use client";

import { useEffect, useState, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

type Range = "1D" | "1M" | "1Y" | "ALL";

interface ChartPoint {
  timestamp: number;
  equity: number;
  profitLoss: number;
}

interface PortfolioData {
  data: ChartPoint[];
  baseValue: number;
}

const RANGES: Range[] = ["1D", "1M", "1Y", "ALL"];

function formatXAxis(timestamp: number, range: Range): string {
  const date = new Date(timestamp);
  if (range === "1D") {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  if (range === "1M") {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

function makeTooltip(isDark: boolean, range: Range) {
  return function TooltipContent({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; payload: ChartPoint }>;
  }) {
    if (!active || !payload?.length) return null;
    const equity = payload[0].value;
    const pl = payload[0].payload.profitLoss;
    const ts = payload[0].payload.timestamp;

    return (
      <div
        className={`p-3 rounded-lg border text-sm ${
          isDark
            ? "bg-gray-800 border-gray-600 text-white"
            : "bg-white border-gray-200 text-gray-900"
        }`}
      >
        <p className="mb-1 text-xs opacity-60">
          {range === "1D"
            ? new Date(ts).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })
            : new Date(ts).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
        </p>
        <p className="font-semibold">
          $
          {equity.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p
          className={`text-xs ${pl >= 0 ? "text-green-400" : "text-red-400"}`}
        >
          {pl >= 0 ? "+" : ""}$
          {Math.abs(pl).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    );
  };
}

export default function PaperTradingChart() {
  const { isDark } = useTheme();
  const [range, setRange] = useState<Range>("1D");
  const [data, setData] = useState<ChartPoint[]>([]);
  const [baseValue, setBaseValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async (r: Range) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/paper-trading/portfolio?range=${r}`);
      if (!res.ok) throw new Error("Failed to fetch portfolio history");
      const json: PortfolioData = await res.json();
      setData(json.data);
      setBaseValue(json.baseValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio(range);
  }, [range, fetchPortfolio]);

  const lastEquity = data.length > 0 ? data[data.length - 1].equity : 0;
  const isProfit = lastEquity >= baseValue;
  const chartColor = isProfit ? "#22c55e" : "#ef4444";
  const axisColor = isDark ? "#9ca3af" : "#6b7280";
  const gridColor = isDark ? "#374151" : "#e5e7eb";
  const TooltipContent = makeTooltip(isDark, range);

  return (
    <div
      className={`rounded-xl border p-6 transition-colors duration-300 ${
        isDark
          ? "border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900"
          : "border-gray-200 bg-white shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3
          className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Portfolio Performance
        </h3>
        <div
          className={`flex rounded-lg p-1 ${isDark ? "bg-gray-700/50" : "bg-gray-100"}`}
        >
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 text-sm rounded-md font-medium transition-colors duration-150 cursor-pointer ${
                range === r
                  ? isDark
                    ? "bg-gray-600 text-white"
                    : "bg-white text-gray-900 shadow-sm"
                  : isDark
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div
            className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${
              isDark ? "border-blue-400" : "border-blue-500"
            }`}
          />
        </div>
      ) : error ? (
        <div className="h-64 flex items-center justify-center">
          <p className={`text-sm ${isDark ? "text-red-400" : "text-red-600"}`}>
            {error}
          </p>
        </div>
      ) : data.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            No portfolio history available
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={data}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.25} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(ts) => formatXAxis(ts as number, range)}
              tick={{ fill: axisColor, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={50}
            />
            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fill: axisColor, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={60}
              domain={["auto", "auto"]}
            />
            <Tooltip content={<TooltipContent />} />
            <Area
              type="monotone"
              dataKey="equity"
              stroke={chartColor}
              strokeWidth={2}
              fill="url(#areaGradient)"
              dot={false}
              activeDot={{ r: 4, fill: chartColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
