const ALPACA_BASE = "https://paper-api.alpaca.markets";

export async function GET() {
  try {
    const response = await fetch(`${ALPACA_BASE}/v2/positions`, {
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

    return Response.json(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.map((p: any) => ({
        symbol: p.symbol as string,
        qty: parseFloat(p.qty),
        currentPrice: parseFloat(p.current_price),
        marketValue: parseFloat(p.market_value),
        costBasis: parseFloat(p.cost_basis),
        unrealizedPL: parseFloat(p.unrealized_pl),
        unrealizedPLPct: parseFloat(p.unrealized_plpc) * 100,
        side: p.side as string,
      })),
    );
  } catch (error) {
    console.error("Positions error:", error);
    return Response.json(
      { error: "Failed to fetch positions" },
      { status: 500 },
    );
  }
}
