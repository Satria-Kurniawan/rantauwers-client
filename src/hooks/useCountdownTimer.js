import { useState, useEffect } from "react";

export default function useCountdownTimer(expiryTime) {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    function calculateCountdown() {
      const now = new Date().getTime();
      const distance = expiryTime * 1000 - now; // Konversi ke milidetik
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    }

    const interval = setInterval(() => {
      const timeLeft = calculateCountdown();
      setCountdown(timeLeft);
    }, 1000); // Interval setiap 1 detik

    return () => clearInterval(interval);
  }, [expiryTime]);

  return countdown;
}
