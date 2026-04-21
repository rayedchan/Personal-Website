"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PaperTradingChart from "../components/PaperTradingChart";
import PaperTradingOrders from "../components/PaperTradingOrders";
import PaperTradingPositions from "../components/PaperTradingPositions";
import PaperTradingWatchlist from "../components/PaperTradingWatchlist";
import { useTheme } from "../context/ThemeContext";

interface AccountData {
  equity: number;
  cash: number;
  buyingPower: number;
  portfolioValue: number;
  todayPL: number;
  todayPLPct: number;
}

function StatCard({
  label,
  value,
  sub,
  positive,
  isDark,
}: {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
  isDark: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 transition-colors duration-300 ${
        isDark
          ? "border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900"
          : "border-gray-200 bg-white shadow-sm"
      }`}
    >
      <p
        className={`text-xs uppercase tracking-wider mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
      >
        {label}
      </p>
      <p
        className={`text-2xl font-bold tabular-nums ${
          positive === undefined
            ? isDark
              ? "text-white"
              : "text-gray-900"
            : positive
              ? "text-green-400"
              : "text-red-400"
        }`}
      >
        {value}
      </p>
      {sub && (
        <p
          className={`text-xs mt-0.5 tabular-nums ${
            positive === undefined
              ? isDark
                ? "text-gray-400"
                : "text-gray-500"
              : positive
                ? "text-green-400/70"
                : "text-red-400/70"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function PaperTradingPage() {
  const { isDark } = useTheme();
  const [account, setAccount] = useState<AccountData | null>(null);
  const [accountLoading, setAccountLoading] = useState(true);

  useEffect(() => {
    fetch("/api/paper-trading/account")
      .then((r) => r.json())
      .then((data: AccountData) => setAccount(data))
      .catch(console.error)
      .finally(() => setAccountLoading(false));
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-100"
      }`}
    >
      <Header />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page title */}
          <div>
            <h1
              className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Paper Trading
            </h1>
            <p
              className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Alpaca paper account · simulated portfolio
            </p>
          </div>

          {/* Portfolio chart */}
          <PaperTradingChart />

          {/* Account balance stats */}
          <section>
            <h2
              className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Account Balance
            </h2>
            {accountLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border p-5 h-24 animate-pulse ${
                      isDark
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-gray-100"
                    }`}
                  />
                ))}
              </div>
            ) : account ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard
                  label="Total Equity"
                  value={`$${fmt(account.equity)}`}
                  isDark={isDark}
                />
                <StatCard
                  label="Cash"
                  value={`$${fmt(account.cash)}`}
                  isDark={isDark}
                />
                <StatCard
                  label="Buying Power"
                  value={`$${fmt(account.buyingPower)}`}
                  isDark={isDark}
                />
                <StatCard
                  label="Today's P/L"
                  value={`${account.todayPL >= 0 ? "+" : "-"}$${fmt(Math.abs(account.todayPL))}`}
                  sub={`${account.todayPLPct >= 0 ? "+" : ""}${account.todayPLPct.toFixed(2)}%`}
                  positive={account.todayPL >= 0}
                  isDark={isDark}
                />
              </div>
            ) : (
              <p
                className={`text-sm ${isDark ? "text-red-400" : "text-red-600"}`}
              >
                Failed to load account data
              </p>
            )}
          </section>

          {/* Positions */}
          <PaperTradingPositions />

          {/* Orders */}
          <PaperTradingOrders />

          {/* Watchlist */}
          <PaperTradingWatchlist />
        </div>
      </main>

      <Footer />
    </div>
  );
}
