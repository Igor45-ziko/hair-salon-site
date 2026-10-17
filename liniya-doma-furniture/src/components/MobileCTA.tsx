import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function MobileCTA() {
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const section = document.getElementById("measure");
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) =>
      setFormVisible(entry.isIntersecting),
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return formVisible ? null : (
    <a href="#measure" className="mobile-cta">
      Рассчитать стоимость <ArrowUpRight size={19} />
    </a>
  );
}
