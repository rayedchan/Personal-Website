"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import StockPortfolioSkeleton from "./StockPortfolioSkeleton";

interface Stock {
  symbol: string;
  name: string;
  logo: string;
  price: number;
  change: number;
  changePercent: number;
}

interface StockPortfolioProps {
  isDark: boolean;
}

export default function StockPortfolio({ isDark }: StockPortfolioProps) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/stocks");
        if (!response.ok) throw new Error("Failed to fetch stocks");
        const data: Stock[] = await response.json();
        setStocks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <>
      {loading ? (
        <StockPortfolioSkeleton isDark={isDark} />
      ) : (
        <section id="stocks" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2
              className={`text-4xl font-bold mb-12 text-center ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Stock Portfolio
            </h2>
            <div
              className={`rounded-lg overflow-hidden border transition-colors duration-300 ${
                isDark
                  ? "border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900"
                  : "border-gray-300 bg-white shadow-lg"
              }`}
            >
              <table className="w-full">
                <thead>
                  <tr
                    className={`border-b transition-colors duration-300 ${
                      isDark
                        ? "border-gray-700 bg-gray-900/50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <th
                      className={`px-6 py-4 text-left font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Company
                    </th>
                    <th
                      className={`px-6 py-4 text-right font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Price
                    </th>
                    <th
                      className={`px-6 py-4 text-right font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Change
                    </th>
                    <th
                      className={`px-6 py-4 text-right font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      % Change
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {error ? (
                    <tr>
                      <td
                        colSpan={4}
                        className={`px-6 py-8 text-center ${
                          isDark ? "text-red-400" : "text-red-600"
                        }`}
                      >
                        {error}
                      </td>
                    </tr>
                  ) : null}
                  {stocks.map((stock) => (
                    <tr
                      key={stock.symbol}
                      className={`border-b transition-colors duration-300 ${
                        isDark
                          ? "border-gray-700/50 hover:bg-gray-700/20"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={stock.logo}
                            alt={`${stock.name} logo`}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                            unoptimized
                          />
                          <div>
                            <div
                              className={`font-semibold ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {stock.name}
                            </div>
                            <div
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {stock.symbol}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-right ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        ${stock.price.toFixed(2)}
                      </td>
                      <td
                        className={`px-6 py-4 text-right ${
                          stock.change >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change.toFixed(2)}
                      </td>
                      <td
                        className={`px-6 py-4 text-right ${
                          stock.changePercent >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
