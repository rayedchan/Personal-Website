"use client";

import { useEffect, useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

interface Order {
  id: string;
  symbol: string;
  type: string;
  side: string;
  qty: string;
  filledQty: string;
  filledAvgPrice: string | null;
  status: string;
  timeInForce: string;
  submittedAt: string;
  filledAt: string | null;
}

const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  "all",
  "filled",
  "partially_filled",
  "canceled",
  "expired",
  "new",
  "pending_new",
  "rejected",
];

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function StatusBadge({
  status,
  isDark,
}: {
  status: string;
  isDark: boolean;
}) {
  const colorMap: Record<string, string> = {
    filled: "text-green-400 bg-green-400/10",
    partially_filled: "text-yellow-400 bg-yellow-400/10",
    canceled: isDark ? "text-gray-400 bg-gray-400/10" : "text-gray-500 bg-gray-100",
    expired: isDark ? "text-gray-400 bg-gray-400/10" : "text-gray-500 bg-gray-100",
    new: "text-blue-400 bg-blue-400/10",
    pending_new: "text-blue-400 bg-blue-400/10",
    rejected: "text-red-400 bg-red-400/10",
  };
  const cls = colorMap[status] ?? (isDark ? "text-gray-400 bg-gray-400/10" : "text-gray-500 bg-gray-100");
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${cls}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

export default function PaperTradingOrders() {
  const { isDark } = useTheme();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/paper-trading/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return orders.filter((o) => {
      const matchesSearch =
        !q ||
        o.symbol.toLowerCase().includes(q) ||
        o.type.toLowerCase().includes(q) ||
        o.side.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "all" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const thCls = `px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap ${
    isDark ? "text-gray-400" : "text-gray-500"
  }`;
  const tdCls = `px-4 py-3 text-sm whitespace-nowrap ${
    isDark ? "text-gray-300" : "text-gray-700"
  }`;

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-colors duration-300 ${
        isDark
          ? "border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900"
          : "border-gray-200 bg-white shadow-sm"
      }`}
    >
      {/* Header + controls */}
      <div
        className={`px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center gap-3 ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h3
          className={`text-lg font-semibold flex-1 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Recent Orders
        </h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search orders…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`px-3 py-1.5 text-sm rounded-lg border outline-none transition-colors duration-150 w-full sm:w-44 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
            }`}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-1.5 text-sm rounded-lg border outline-none transition-colors duration-150 cursor-pointer ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            }`}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All statuses" : s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
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
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={`border-b ${
                    isDark ? "border-gray-700 bg-gray-900/40" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <th className={thCls}>Asset</th>
                  <th className={thCls}>Type</th>
                  <th className={thCls}>Side</th>
                  <th className={`${thCls} text-right`}>Qty</th>
                  <th className={`${thCls} text-right`}>Filled Qty</th>
                  <th className={`${thCls} text-right`}>Avg Fill Price</th>
                  <th className={thCls}>Status</th>
                  <th className={thCls}>Submitted At</th>
                  <th className={thCls}>Filled At</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className={`px-6 py-8 text-center text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      No orders match your search
                    </td>
                  </tr>
                ) : (
                  paginated.map((o) => (
                    <tr
                      key={o.id}
                      className={`border-b transition-colors duration-150 ${
                        isDark
                          ? "border-gray-700/50 hover:bg-gray-700/20"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      <td className={`${tdCls} font-semibold`}>
                        <span className={isDark ? "text-white" : "text-gray-900"}>
                          {o.symbol}
                        </span>
                      </td>
                      <td className={`${tdCls} capitalize`}>
                        {o.type.replace(/_/g, " ")}
                      </td>
                      <td className={tdCls}>
                        <span
                          className={
                            o.side === "buy"
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        >
                          {o.side.toUpperCase()}
                        </span>
                      </td>
                      <td className={`${tdCls} text-right tabular-nums`}>
                        {o.qty ?? "—"}
                      </td>
                      <td className={`${tdCls} text-right tabular-nums`}>
                        {o.filledQty ?? "—"}
                      </td>
                      <td className={`${tdCls} text-right tabular-nums`}>
                        {o.filledAvgPrice
                          ? `$${parseFloat(o.filledAvgPrice).toFixed(2)}`
                          : "—"}
                      </td>
                      <td className={tdCls}>
                        <StatusBadge status={o.status} isDark={isDark} />
                      </td>
                      <td className={tdCls}>{formatDate(o.submittedAt)}</td>
                      <td className={tdCls}>{formatDate(o.filledAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            className={`px-6 py-4 flex items-center justify-between border-t text-sm ${
              isDark
                ? "border-gray-700 text-gray-400"
                : "border-gray-200 text-gray-500"
            }`}
          >
            <span>
              {filtered.length === 0
                ? "No results"
                : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className={`px-2 py-1 rounded transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                aria-label="First page"
              >
                «
              </button>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`px-2 py-1 rounded transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                aria-label="Previous page"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - page) <= 1,
                )
                .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) {
                    acc.push("…");
                  }
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === "…" ? (
                    <span key={`ellipsis-${idx}`} className="px-2">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p as number)}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        page === p
                          ? isDark
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : isDark
                            ? "hover:bg-gray-700"
                            : "hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={`px-2 py-1 rounded transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                aria-label="Next page"
              >
                ›
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className={`px-2 py-1 rounded transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                aria-label="Last page"
              >
                »
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
