## Backend

### 1. Solve the Coin Distribution Problem
As a prize, participants in the contest are offered coins.

The organization hosting the contest has 3 types of coins: `ETH`, `TRON`, `MATIC`, each with a limited quantity.

Each participant was asked which coin they would like to receive. If the participant was unsure, they could choose two **adjacent** coins. This means either of the two coins would work for the participant.

You need to calculate whether it's possible to give each participant the coin they requested and return an example of such an arrangement.

Example:
```
Input:
Coin available: { ETH: 4, TRON: 5, MATIC: 1 }

Participants requested: [ETH, ETH, ETH/TRON, TRON/ETH, TRON/MATIC, TRON, MATIC]

Answer: 
[ETH, ETH, ETH, TRON, TRON, TRON, MATIC] 
  OR
[ETH, ETH, ETH, ETH, TRON, TRON, MATIC]
```

**Additions:**
- Implementation should be in TypeScript only.
- Don't worry about the USD equivalent for the prize; you can assume it's a fixed amount.
- The order of the coin types can vary (e.g., `'TRON/ETH'` or `'ETH/TRON'`), but it doesn't affect the user's priority as long as any of the available options are provided.
- You must consider that depending on which coin you give in a combined request, you may or may not have enough coins for subsequent requests.  
  For example, you have: `ETH: 1, TRON: 1, MATIC: 1`, but the requests are `ETH/TRON, ETH, MATIC`.  
  If you give `ETH` for `ETH/TRON`, you won't have enough `ETH` to fulfill the second request, but if you give `TRON` in the first request, the request can be fulfilled.
- If the distribution of coins is not possible, the function should return `NULL`.
- Function:  
  The first argument should be an object: `{ ETH: 4, TRON: 5, MATIC: 1 }`  
  The second argument should be an array of requests: `['ETH', 'ETH', 'ETH/TRON', 'TRON/ETH', 'TRON/MATIC', 'TRON', 'MATIC']`  
  It should return either `NULL` or an array like `['ETH', 'TRON', ...]`.  
  This is necessary for the correct functioning of the tests.
- Optional: Try not to tie the implementation to specific primitive types.  
  It would be great if I could swap one coin for another, and your function would still work.  
  Or increase the number of possible adjacent coins so the user can choose from 2 or 3 options, and the function still works without any changes in the code.  

---

### 2. Nest.js - Cryptocurrency Pair Converter

Write a small application in Nest.js that will handle requests to convert one currency to another.

Endpoint:  
`/currency/convert/?from={string}&to={string}&amount={number}`  

Parameters:  
- `from` - the coin key to convert from
- `to` - the coin key to convert to. Optional, defaults to `tether`
- `amount` - the amount of coins to convert. Optional, defaults to `1`

Example request:  
`/currency/convert/?from=ethereum&to=bitcoin&amount=100`

Example response:  
`{ "amount": 100, "from": "ethereum", "to": "bitcoin", "result": 6.3 }`

Cryptocurrency prices can be obtained from the API:  
https://tstapi.cryptorank.io/v0/coins/prices/  
All prices are quoted in USD.

**Additions:**
- You will need to account for precision loss during conversion.  
  For example, if you have 1 bitcoin and you want to convert it to a coin with a very small price,  
  and also the basic JS number issues, like: `0.1 + 0.2 = 0.30000000000000004`.
- Handle possible values for query parameters.
- Extract mathematical calculations into a separate utility function and cover it with tests using Jest.  
  There's no need to test services.
- The worst-case scenario is returning/processing incorrect data.  
  Especially if you return values like NaN, Infinity, etc.
- Handle cases where invalid values are passed to the function.  
  This often happens in real projects because TypeScript doesn’t work at runtime.

---

**For implementation, use:**
- [Nest.js](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)  
- Strong typing without using `any` - mandatory
- [class-validator](https://www.npmjs.com/package/class-validator) - for query parameters
- Avoid using primitives whenever possible, use constants and enums
- [Jest](https://jestjs.io/)
- Libraries of your choice (with the assumption that you would use them in production)
- Document complex code
- Keep the implementation of the function from the first task in the same repository as the second task

**Bonus points for:**
- Using Swagger to document your API endpoint in the second task
