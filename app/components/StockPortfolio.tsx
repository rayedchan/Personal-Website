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

type SortField = "name" | "price" | "change" | "changePercent" | null;
type SortOrder = "asc" | "desc" | null;

export default function StockPortfolio({ isDark }: StockPortfolioProps) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [originalStocks, setOriginalStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/stocks");
        if (!response.ok) throw new Error("Failed to fetch stocks");
        const data: Stock[] = await response.json();
        setStocks(data);
        setOriginalStocks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField !== field) {
      // New field, start with ascending
      setSortField(field);
      setSortOrder("asc");
      const sorted = [...stocks].sort((a, b) => {
        if (field === "name") {
          return a.name.localeCompare(b.name);
        }
        return a[field!] - b[field!];
      });
      setStocks(sorted);
    } else if (sortOrder === "asc") {
      // Same field, switch to descending
      setSortOrder("desc");
      const sorted = [...stocks].sort((a, b) => {
        if (field === "name") {
          return b.name.localeCompare(a.name);
        }
        return b[field!] - a[field!];
      });
      setStocks(sorted);
    } else {
      // Same field, reset to normal order
      setSortField(null);
      setSortOrder(null);
      setStocks([...originalStocks]);
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <svg
          className="w-4 h-4 opacity-50"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5 12l5 5 5-5H5zm10-4L10 3 5 8h10z" />
        </svg>
      );
    }
    if (sortOrder === "asc") {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 12l5 5 5-5H5z" opacity="0.3" />
          <path d="M15 8L10 3 5 8h10z" />
        </svg>
      );
    }
    if (sortOrder === "desc") {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 12l5 5 5-5H5z" />
          <path d="M15 8L10 3 5 8h10z" opacity="0.3" />
        </svg>
      );
    }
    return null;
  };

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
                      className={`px-6 py-4 text-left font-semibold cursor-pointer hover:bg-gray-700/30 transition-colors ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-2">
                        Company
                        {getSortIcon("name")}
                      </div>
                    </th>
                    <th
                      className={`px-6 py-4 text-right font-semibold cursor-pointer hover:bg-gray-700/30 transition-colors ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                      onClick={() => handleSort("price")}
                    >
                      <div className="flex items-center justify-end gap-2">
                        Price
                        {getSortIcon("price")}
                      </div>
                    </th>
                    <th
                      className={`px-6 py-4 text-right font-semibold cursor-pointer hover:bg-gray-700/30 transition-colors ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                      onClick={() => handleSort("change")}
                    >
                      <div className="flex items-center justify-end gap-2">
                        Change
                        {getSortIcon("change")}
                      </div>
                    </th>
                    <th
                      className={`px-6 py-4 text-right font-semibold cursor-pointer hover:bg-gray-700/30 transition-colors ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                      onClick={() => handleSort("changePercent")}
                    >
                      <div className="flex items-center justify-end gap-2">
                        % Change
                        {getSortIcon("changePercent")}
                      </div>
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
