const ALPACA_BASE = "https://paper-api.alpaca.markets";

export async function GET() {
  try {
    const response = await fetch(`${ALPACA_BASE}/v2/account`, {
      headers: {
        "APCA-API-KEY-ID": process.env.ALPACA_API_KEY!,
        "APCA-API-SECRET-KEY": process.env.ALPACA_SECRET_KEY!,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Alpaca API error: ${response.status}`);
    }

    const data = await response.json();

    const equity = parseFloat(data.equity);
    const lastEquity = parseFloat(data.last_equity);

    return Response.json({
      equity,
      cash: parseFloat(data.cash),
      buyingPower: parseFloat(data.buying_power),
      portfolioValue: parseFloat(data.portfolio_value),
      lastEquity,
      todayPL: equity - lastEquity,
      todayPLPct:
        lastEquity > 0 ? ((equity - lastEquity) / lastEquity) * 100 : 0,
    });
  } catch (error) {
    console.error("Account error:", error);
    return Response.json(
      { error: "Failed to fetch account data" },
      { status: 500 },
    );
  }
}
