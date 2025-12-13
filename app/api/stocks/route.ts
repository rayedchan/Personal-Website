export const revalidate = 300;

export async function GET() {
  try {
    const apiKey = process.env.STOCK_API_KEY!;
    const symbols = [
      {
        symbol: "PLTR",
        name: "Palantir Technologies",
        logo: "https://cdn.brandfetch.io/PLTR?c=1idn481EFT_lgEtb1Ca",
      },
      {
        symbol: "MSFT",
        name: "Microsoft",
        logo: "https://cdn.brandfetch.io/MSFT?c=1idn481EFT_lgEtb1Ca",
      },
      {
        symbol: "TSLA",
        name: "Tesla",
        logo: "https://cdn.brandfetch.io/TSLA?c=1idn481EFT_lgEtb1Ca",
      },
      {
        symbol: "HOOD",
        name: "Robinhood Markets",
        logo: "https://cdn.brandfetch.io/HOOD?c=1idn481EFT_lgEtb1Ca",
      },
      {
        symbol: "NVDA",
        name: "NVIDIA",
        logo: "https://cdn.brandfetch.io/NVDA?c=1idn481EFT_lgEtb1Ca",
      },
      {
        symbol: "GOOGL",
        name: "Alphabet",
        logo: "https://cdn.brandfetch.io/GOOGL?c=1idn481EFT_lgEtb1Ca",
      },
      {
        symbol: "SOFI",
        name: "SoFi Technologies",
        logo: "https://cdn.brandfetch.io/SOFI?c=1idn481EFT_lgEtb1Ca",
      },
      {
        symbol: "AAPL",
        name: "Apple",
        logo: "https://cdn.brandfetch.io/AAPL?c=1idn481EFT_lgEtb1Ca",
      },
      {
        symbol: "XYZ",
        name: "Block",
        logo: "https://cdn.brandfetch.io/XYZ?c=1idn481EFT_lgEtb1Ca",
      },
      {
        symbol: "META",
        name: "Meta Platforms",
        logo: "https://cdn.brandfetch.io/META?c=1idn481EFT_lgEtb1Ca",
      },
      {
        symbol: "AMZN",
        name: "Amazon",
        logo: "https://cdn.brandfetch.io/AMZN?c=1idn481EFT_lgEtb1Ca",
      },
      {
        symbol: "NFLX",
        name: "Netflix",
        logo: "https://cdn.brandfetch.io/NFLX?c=1idn481EFT_lgEtb1Ca",
      },
    ];

    const stockData = await Promise.all(
      symbols.map(async ({ symbol, name, logo }) => {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}`,
          {
            headers: { "X-Finnhub-Token": apiKey },
            next: { revalidate: 300 },
          }
        );
        const data = await response.json();

        return {
          symbol,
          name,
          logo,
          price: parseFloat(data["c"]), // current price
          change: parseFloat(data["d"]), // change
          changePercent: parseFloat(data["dp"]), //percent change
        };
      })
    );

    return Response.json(stockData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return Response.json(
      { error: "Failed to fetch stock data" },
      { status: 500 }
    );
  }
}
