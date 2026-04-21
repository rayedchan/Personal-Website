"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface Position {
  symbol: string;
  qty: number;
  currentPrice: number;
  marketValue: number;
  costBasis: number;
  unrealizedPL: number;
  unrealizedPLPct: number;
  side: string;
  assetClass: string;
}

interface ParsedOption {
  underlying: string;
  expiration: string;
  type: "Call" | "Put";
  strike: string;
}

function parseOptionSymbol(symbol: string): ParsedOption | null {
  const match = symbol.match(/^([A-Z]+)(\d{2})(\d{2})(\d{2})([CP])(\d{8})$/);
  if (!match) return null;
  const [, underlying, yy, mm, dd, cp, strikeRaw] = match;
  const strike = (parseInt(strikeRaw, 10) / 1000).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return {
    underlying,
    expiration: `${mm}/${dd}/20${yy}`,
    type: cp === "C" ? "Call" : "Put",
    strike,
  };
}

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

interface PositionsTableProps {
  positions: Position[];
  isOptions: boolean;
  isDark: boolean;
}

function PositionsTable({ positions, isOptions, isDark }: PositionsTableProps) {
  if (positions.length === 0) {
    return (
      <div className="px-6 py-6 text-center">
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          No open {isOptions ? "options" : "stock"} positions
        </p>
      </div>
    );
  }

  return (
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
            <th className="px-6 py-3 text-left">
              {isOptions ? "Contract" : "Ticker"}
            </th>
            <th className="px-6 py-3 text-right">
              {isOptions ? "Contracts" : "Shares"}
            </th>
            <th className="px-6 py-3 text-right">Current Price</th>
            <th className="px-6 py-3 text-right">Market Value</th>
            <th className="px-6 py-3 text-right">Total P/L</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((p) => {
            const opt = isOptions ? parseOptionSymbol(p.symbol) : null;
            return (
              <tr
                key={p.symbol}
                className={`border-b transition-colors duration-150 ${
                  isDark
                    ? "border-gray-700/50 hover:bg-gray-700/20"
                    : "border-gray-100 hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">
                  {opt ? (
                    <>
                      <div
                        className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {opt.underlying}
                      </div>
                      <div
                        className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {opt.type} · ${opt.strike} · {opt.expiration}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {p.symbol}
                      </div>
                      <div
                        className={`text-xs capitalize ${isDark ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {p.side}
                      </div>
                    </>
                  )}
                </td>
                <td
                  className={`px-6 py-4 text-right tabular-nums ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  {p.qty % 1 === 0 ? p.qty.toFixed(0) : p.qty.toFixed(4)}
                </td>
                <td
                  className={`px-6 py-4 text-right tabular-nums ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  ${fmt(p.currentPrice)}
                </td>
                <td
                  className={`px-6 py-4 text-right tabular-nums ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  ${fmt(p.marketValue)}
                </td>
                <td className="px-6 py-4 text-right tabular-nums">
                  <div
                    className={
                      p.unrealizedPL >= 0 ? "text-green-400" : "text-red-400"
                    }
                  >
                    {p.unrealizedPL >= 0 ? "+" : "-"}$
                    {fmt(Math.abs(p.unrealizedPL))}
                  </div>
                  <div
                    className={`text-xs ${p.unrealizedPL >= 0 ? "text-green-400/70" : "text-red-400/70"}`}
                  >
                    {p.unrealizedPLPct >= 0 ? "+" : ""}
                    {p.unrealizedPLPct.toFixed(2)}%
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function PaperTradingPositions() {
  const { isDark } = useTheme();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/paper-trading/positions");
        if (!res.ok) throw new Error("Failed to fetch positions");
        const data: Position[] = await res.json();
        setPositions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  const stockPositions = positions.filter((p) => p.assetClass !== "us_option");
  const optionPositions = positions.filter((p) => p.assetClass === "us_option");

  const cardClass = `rounded-xl border overflow-hidden transition-colors duration-300 ${
    isDark
      ? "border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900"
      : "border-gray-200 bg-white shadow-sm"
  }`;
  const headerClass = `px-6 py-4 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`;
  const titleClass = `text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`;

  if (loading) {
    return (
      <div className={cardClass}>
        <div className={headerClass}>
          <h3 className={titleClass}>Current Positions</h3>
        </div>
        <div className="px-6 py-12 flex justify-center">
          <div
            className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${
              isDark ? "border-blue-400" : "border-blue-500"
            }`}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cardClass}>
        <div className={headerClass}>
          <h3 className={titleClass}>Current Positions</h3>
        </div>
        <div className="px-6 py-8 text-center">
          <p className={`text-sm ${isDark ? "text-red-400" : "text-red-600"}`}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Stock Holdings */}
      <div className={cardClass}>
        <div className={headerClass}>
          <h3 className={titleClass}>Stock Holdings</h3>
        </div>
        <PositionsTable
          positions={stockPositions}
          isOptions={false}
          isDark={isDark}
        />
      </div>

      {/* Options Plays */}
      <div className={cardClass}>
        <div className={headerClass}>
          <h3 className={titleClass}>Options Plays</h3>
        </div>
        <PositionsTable
          positions={optionPositions}
          isOptions={true}
          isDark={isDark}
        />
      </div>
    </div>
  );
}
