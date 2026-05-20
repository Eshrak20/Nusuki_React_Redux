import { useEffect, useState } from "react";

import { useLazyGetPlaceAutoCompleteQuery } from "@/redux/api/hotelApi/hotelApi";

const LIMIT = 100;

export function usePlaceAutocomplete(destination: string) {
  const [triggerAutocomplete, result] =
    useLazyGetPlaceAutoCompleteQuery();

  const [debouncedKeyword, setDebouncedKeyword] = useState(destination);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedKeyword(destination.trim());
    }, 400);

    return () => window.clearTimeout(timer);
  }, [destination]);

  useEffect(() => {
    if (!debouncedKeyword) return;

    triggerAutocomplete({
      keyword: debouncedKeyword,
      limit: LIMIT,
    });
  }, [debouncedKeyword, triggerAutocomplete]);

  return {
    suggestions: result.data?.response ?? [],
    isSearching: result.isFetching,
  };
}