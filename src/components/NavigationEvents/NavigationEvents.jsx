"use client";
import LoadingBar from "react-top-loading-bar";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const NavigationEvents = () => {
  const [progress, setProgress] = useState(0);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setProgress(100);
  }, [pathname, searchParams]);

  return (
    <LoadingBar
      color="#FF8A00"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      waitingTime={800}
      height={3}
    />
  );
};

export default NavigationEvents;
