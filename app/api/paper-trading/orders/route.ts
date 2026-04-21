const ALPACA_BASE = "https://paper-api.alpaca.markets";

export async function GET() {
  try {
    const response = await fetch(
      `${ALPACA_BASE}/v2/orders?status=all&limit=500&direction=desc`,
      {
        headers: {
          "APCA-API-KEY-ID": process.env.ALPACA_API_KEY!,
          "APCA-API-SECRET-KEY": process.env.ALPACA_SECRET_KEY!,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Alpaca API error: ${response.status}`);
    }

    const data = await response.json();

    return Response.json(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.map((o: any) => ({
        id: o.id as string,
        symbol: o.symbol as string,
        type: o.type as string,
        side: o.side as string,
        qty: o.qty as string,
        filledQty: o.filled_qty as string,
        filledAvgPrice: o.filled_avg_price as string | null,
        status: o.status as string,
        timeInForce: o.time_in_force as string,
        submittedAt: o.submitted_at as string,
        filledAt: (o.filled_at as string) || null,
        expiresAt: (o.expires_at as string) || null,
      })),
    );
  } catch (error) {
    console.error("Orders error:", error);
    return Response.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
