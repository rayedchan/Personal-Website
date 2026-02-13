"use client";

import { useTheme } from "../context/ThemeContext";

export default function StockPortfolioSkeleton() {
  const { isDark } = useTheme();
  return (
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
              {[...Array(8)].map((_, i) => (
                <tr
                  key={i}
                  className={`border-b transition-colors duration-300 ${
                    isDark ? "border-gray-700/50" : "border-gray-200"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full animate-pulse ${
                          isDark ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      ></div>
                      <div className="space-y-2">
                        <div
                          className={`h-4 w-32 rounded animate-pulse ${
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        ></div>
                        <div
                          className={`h-3 w-16 rounded animate-pulse ${
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div
                      className={`h-4 w-20 ml-auto rounded animate-pulse ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    ></div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div
                      className={`h-4 w-16 ml-auto rounded animate-pulse ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    ></div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div
                      className={`h-4 w-16 ml-auto rounded animate-pulse ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
