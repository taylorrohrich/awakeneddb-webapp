import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsRecord = useMemo(() => {
    const searchParamRecord = {} as Record<string, string>;
    searchParams.forEach((value, key) => {
      searchParamRecord[key] = value;
    });
    return searchParamRecord;
  }, [searchParams]);
  const set = useCallback(
    (queryParams: [string, string | number | undefined][], refresh = false) => {
      const params = new URLSearchParams(searchParamsRecord);
      queryParams.forEach(([key, value]) => {
        if (value == null) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
        router.push(`${pathname}?${params}`);
        if (refresh) {
          router.refresh();
        }
      });
    },
    [pathname, router, searchParamsRecord]
  );

  return { params: searchParamsRecord, set };
}
