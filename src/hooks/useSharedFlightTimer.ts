import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { getCountdownParts } from "@/lib/utils";

const useSharedFlightTimer = () => {
  const expiresAt = useSelector(
    (state: RootState) => state.flightSession?.expiresAt ?? null
  );

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const totalSeconds = useMemo(() => {
    if (!expiresAt) return 0;
    return Math.max(0, Math.floor((expiresAt - now) / 1000));
  }, [expiresAt, now]);

  return {
    expiresAt,
    isExpired: totalSeconds <= 0,
    ...getCountdownParts(totalSeconds),
  };
};

export default useSharedFlightTimer;