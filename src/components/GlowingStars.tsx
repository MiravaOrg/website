import Particles from "react-tsparticles";
import { loadBasic } from "tsparticles-basic";

function GlowingStars() {
  return (
    <Particles
      className="z-10 pointer-events-none"
      id="tsparticles"
      init={(engine) => loadBasic(engine)}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "#2389d6",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              minimumValue: 0.2,
              sync: false,
            },
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 0.2,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
          shadow: {
            enable: true,
            color: "#ffffff",
            blur: 10,
          },
        },
        background: {
          color: "#054e60",
        },
      }}
    />
  );
};

export default GlowingStars;
