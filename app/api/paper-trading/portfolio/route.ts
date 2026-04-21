const ALPACA_BASE = "https://paper-api.alpaca.markets";

// Valid Alpaca timeframes: 1Min, 5Min, 15Min, 1H, 1D
// Valid Alpaca periods: {n}D, {n}W, {n}M, {n}A — omit period for full history (ALL)
const RANGE_CONFIG: Record<string, { period?: string; timeframe: string }> = {
  "1D": { period: "1D", timeframe: "5Min" },
  "1M": { period: "1M", timeframe: "1D" },
  "1Y": { period: "1A", timeframe: "1D" },
  ALL: { timeframe: "1D" }, // omitting period returns full account history
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "1D";
    const { period, timeframe } = RANGE_CONFIG[range] ?? RANGE_CONFIG["1D"];

    const params = new URLSearchParams({ timeframe, extended_hours: "false" });
    if (period) params.set("period", period);

    const response = await fetch(
      `${ALPACA_BASE}/v2/account/portfolio/history?${params}`,
      {
        headers: {
          "APCA-API-KEY-ID": process.env.ALPACA_API_KEY!,
          "APCA-API-SECRET-KEY": process.env.ALPACA_SECRET_KEY!,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Alpaca API error ${response.status}: ${body}`);
    }

    const data = await response.json();

    const chartData = (data.timestamp as number[])
      .map((ts, i) => ({
        timestamp: ts * 1000,
        equity: data.equity[i] as number | null,
        profitLoss: data.profit_loss[i] as number | null,
      }))
      .filter((d) => d.equity !== null && d.equity > 0);

    return Response.json({
      data: chartData,
      baseValue: data.base_value as number,
      timeframe: data.timeframe as string,
    });
  } catch (error) {
    console.error("Portfolio history error:", error);
    return Response.json(
      { error: "Failed to fetch portfolio history" },
      { status: 500 },
    );
  }
}
