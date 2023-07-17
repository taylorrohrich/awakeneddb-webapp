import { LIMIT_VALUES } from "@/constants/pagination";
import { isNaN } from "./math";

export function parsePaginationParams(
  page?: string | number,
  limit?: string | number
) {
  let numberPage = Math.floor(Number(page));
  let numberLimit = Math.floor(Number(limit));
  if (isNaN(numberPage) || numberPage < 1) {
    numberPage = 1;
  }
  if (isNaN(numberLimit)) {
    numberLimit = LIMIT_VALUES[0];
  }
  const closetValidLimitValue = LIMIT_VALUES.reduce((acc, item) => {
    if (acc - numberLimit > item - numberLimit) {
      return item;
    }
    return acc;
  });

  return [String(numberPage), String(closetValidLimitValue)] as const;
}
