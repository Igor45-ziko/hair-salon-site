import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
export default function Enhancements() {
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setFormVisible(visible.size > 0);
    });
    document
      .querySelectorAll(".hero,#calculator,#consultation")
      .forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add("seen");
            observer.unobserve(entry.target);
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
  return formVisible ? null : (
    <a className="mobile-consultation" href="#consultation">
      Получить консультацию <ArrowUpRight size={18} />
    </a>
  );
}
