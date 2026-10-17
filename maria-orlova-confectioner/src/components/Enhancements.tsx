import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
export default function Enhancements() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const target = document.getElementById("order");
    const observer = new IntersectionObserver(([entry]) =>
      setHidden(entry.isIntersecting),
    );
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("seen");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      element.classList.add("reveal-ready");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-ready"));
    };
  }, []);
  return hidden ? null : (
    <a href="#order" className="mobile-order">
      Рассчитать торт <ArrowUpRight size={19} />
    </a>
  );
}
