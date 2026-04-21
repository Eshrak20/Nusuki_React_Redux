import { getCountdownParts } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

interface UseCountdownOptions {
  initialSeconds: number;
  isRunning?: boolean;
}

const useCountdown = ({
  initialSeconds,
  isRunning = true,
}: UseCountdownOptions) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, timeLeft]);

  const countdown = useMemo(() => getCountdownParts(timeLeft), [timeLeft]);

  return {
    timeLeft,
    setTimeLeft,
    reset: () => setTimeLeft(initialSeconds),
    isExpired: timeLeft <= 0,
    ...countdown,
  };
};

export default useCountdown;