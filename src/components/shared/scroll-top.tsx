import { ChevronUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const scrollToTop = () => {
  window.scrollTo({
    behavior: globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    top: 0,
  });
};

export const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Button
      className="fixed right-4 bottom-4 z-40 size-11 animate-in duration-200 fade-in-0 zoom-in-95"
      onClick={scrollToTop}
      size="icon"
      variant="outline"
    >
      <ChevronUpIcon />
      <span className="sr-only">Scroll to top</span>
    </Button>
  );
};
