
import React, { useEffect, useState } from "react";

const FlashSalesTimer = () => {
  const endDate = new Date(Date.now() + 60 * 60 * 1000);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: String(
          Math.floor(diff / (1000 * 60 * 60 * 24))
        ).padStart(2, "0"),
        hours: String(
          Math.floor((diff / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        minutes: String(
          Math.floor((diff / (1000 * 60)) % 60)
        ).padStart(2, "0"),
        seconds: String(
          Math.floor((diff / 1000) % 60)
        ).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <TimeBox label="Days" value={timeLeft.days} />
      <Colon />
      <TimeBox label="Hours" value={timeLeft.hours} />
      <Colon />
      <TimeBox label="Minutes" value={timeLeft.minutes} />
      <Colon />
      <TimeBox label="Seconds" value={timeLeft.seconds} />
    </div>
  );
};

const TimeBox = ({ label, value }) => (
  <div>
    <span className="text-xs font-medium">{label}</span>
    <div className="text-3xl font-bold leading-none mt-1">{value}</div>
  </div>
);

const Colon = () => (
  <span className="text-3xl text-[#E07575] leading-none mt-5">:</span>
);

export default FlashSalesTimer;

