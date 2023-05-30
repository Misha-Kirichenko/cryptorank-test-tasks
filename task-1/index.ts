interface CoinsCount {
  [key: string]: number;
}

const coinsAlloc = (
  coinsAvailable: CoinsCount,
  requestedCoins: string[]
): string[] | null => {
  const findCombinations = (
    coins: string[],
    remaining: CoinsCount,
    combinations: string[][]
  ) => {
    if (coins.length === requestedCoins.length) {
      combinations.push(coins);
      return;
    }

    const requestedCoin = requestedCoins[coins.length];
    const similarCoins = requestedCoin.split("/");
    for (const coin of similarCoins) {
      if (coin && remaining[coin] > 0) {
        findCombinations(
          [...coins, coin],
          { ...remaining, [coin]: remaining[coin] - 1 },
          combinations
        );
      }
    }
  };

  const combinations: string[][] = [];
  findCombinations([], coinsAvailable, combinations);

  if (combinations.length > 0) {
    return combinations[0];
  }

  return null;
};

const coinsAvailable: CoinsCount = { ETH: 4, TRON: 5, MATIC: 1 };
console.log(
  coinsAlloc(coinsAvailable, [
    "MATIC",
    "ETH",
    "ETH/MATIC",
    "ETH/TRON",
    "TRON/ETH/BTC",
    "TRON/MATIC/BTC",
  ])
);
