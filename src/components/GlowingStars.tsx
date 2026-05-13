import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadBasic } from "tsparticles-basic";

function GlowingStars() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reduced) return null;

  return (
    <Particles
      className="pointer-events-none"
      id="tsparticles"
      init={(engine) => loadBasic(engine)}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 80, density: { enable: true, area: 800 } },
          color: { value: "#2389d6" },
          shape: { type: "circle" },
          opacity: {
            value: 0.7,
            random: true,
            anim: { enable: true, speed: 0.8, minimumValue: 0.2, sync: false },
          },
          size: {
            value: 2,
            random: true,
            anim: { enable: false },
          },
          move: {
            enable: true,
            speed: 0.2,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
        },
        background: { color: "#054e60" },
      }}
    />
  );
}

export default GlowingStars;
