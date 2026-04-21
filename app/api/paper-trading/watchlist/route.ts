const ALPACA_BASE = "https://paper-api.alpaca.markets";
const ALPACA_DATA = "https://data.alpaca.markets";

function alpacaHeaders() {
  return {
    "APCA-API-KEY-ID": process.env.ALPACA_API_KEY!,
    "APCA-API-SECRET-KEY": process.env.ALPACA_SECRET_KEY!,
  };
}

export async function GET() {
  try {
    const listsRes = await fetch(`${ALPACA_BASE}/v2/watchlists`, {
      headers: alpacaHeaders(),
      cache: "no-store",
    });
    if (!listsRes.ok) {
      const body = await listsRes.text();
      throw new Error(`Alpaca error ${listsRes.status}: ${body}`);
    }
    const lists = await listsRes.json();

    if (!lists.length) {
      return Response.json({ entries: [] });
    }

    const detail = await fetch(
      `${ALPACA_BASE}/v2/watchlists/${lists[0].id}`,
      { headers: alpacaHeaders(), cache: "no-store" },
    );
    if (!detail.ok) throw new Error(`Alpaca error ${detail.status}`);
    const watchlist = await detail.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const assets: any[] = watchlist.assets ?? [];
    if (assets.length === 0) {
      return Response.json({ entries: [] });
    }

    const symbols: string[] = assets.map((a) => a.symbol);
    const nameMap: Record<string, string> = Object.fromEntries(
      assets.map((a) => [a.symbol, a.name]),
    );

    const snapRes = await fetch(
      `${ALPACA_DATA}/v2/stocks/snapshots?symbols=${symbols.join(",")}&feed=iex`,
      { headers: alpacaHeaders(), cache: "no-store" },
    );
    const snapshots = snapRes.ok ? await snapRes.json() : {};

    const entries = symbols.map((symbol) => {
      const snap = snapshots[symbol];
      const price: number | null =
        snap?.latestTrade?.p ?? snap?.dailyBar?.c ?? null;
      const prevClose: number | null = snap?.prevDailyBar?.c ?? null;
      const change =
        price !== null && prevClose !== null ? price - prevClose : null;
      const changePct =
        change !== null && prevClose ? (change / prevClose) * 100 : null;

      return { symbol, name: nameMap[symbol] ?? symbol, price, change, changePct };
    });

    return Response.json({ entries });
  } catch (error) {
    console.error("Watchlist GET error:", error);
    return Response.json({ error: "Failed to fetch watchlist" }, { status: 500 });
  }
}
