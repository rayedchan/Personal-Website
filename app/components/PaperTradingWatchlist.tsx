"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface WatchlistEntry {
  symbol: string;
  name: string;
  price: number | null;
  change: number | null;
  changePct: number | null;
}

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function PaperTradingWatchlist() {
  const { isDark } = useTheme();
  const [entries, setEntries] = useState<WatchlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/paper-trading/watchlist")
      .then((r) => r.json())
      .then((data) => setEntries(data.entries ?? []))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "An error occurred"),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-colors duration-300 ${
        isDark
          ? "border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900"
          : "border-gray-200 bg-white shadow-sm"
      }`}
    >
      <div
        className={`px-6 py-4 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}
      >
        <h3
          className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Watchlist
        </h3>
      </div>

      {loading ? (
        <div className="px-6 py-12 flex justify-center">
          <div
            className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${
              isDark ? "border-blue-400" : "border-blue-500"
            }`}
          />
        </div>
      ) : error ? (
        <div className="px-6 py-8 text-center">
          <p className={`text-sm ${isDark ? "text-red-400" : "text-red-600"}`}>
            {error}
          </p>
        </div>
      ) : entries.length === 0 ? (
        <div className="px-6 py-8 text-center">
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            No symbols in your Alpaca watchlist
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b text-xs uppercase tracking-wider ${
                  isDark
                    ? "border-gray-700 bg-gray-900/40 text-gray-400"
                    : "border-gray-200 bg-gray-50 text-gray-500"
                }`}
              >
                <th className="px-6 py-3 text-left">Symbol</th>
                <th className="px-6 py-3 text-right">Price</th>
                <th className="px-6 py-3 text-right">Day Change</th>
                <th className="px-6 py-3 text-right">Day %</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const up = entry.change !== null && entry.change >= 0;
                const plCls =
                  entry.change === null
                    ? isDark
                      ? "text-gray-400"
                      : "text-gray-500"
                    : up
                      ? "text-green-400"
                      : "text-red-400";
                return (
                  <tr
                    key={entry.symbol}
                    className={`border-b transition-colors duration-150 ${
                      isDark
                        ? "border-gray-700/50 hover:bg-gray-700/20"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div
                        className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {entry.symbol}
                      </div>
                      <div
                        className={`text-xs truncate max-w-[200px] ${isDark ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {entry.name}
                      </div>
                    </td>
                    <td
                      className={`px-6 py-4 text-right tabular-nums ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {entry.price !== null ? `$${fmt(entry.price)}` : "—"}
                    </td>
                    <td
                      className={`px-6 py-4 text-right tabular-nums ${plCls}`}
                    >
                      {entry.change !== null
                        ? `${up ? "+" : "-"}$${fmt(Math.abs(entry.change))}`
                        : "—"}
                    </td>
                    <td
                      className={`px-6 py-4 text-right tabular-nums ${plCls}`}
                    >
                      {entry.changePct !== null
                        ? `${entry.changePct >= 0 ? "+" : ""}${entry.changePct.toFixed(2)}%`
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
