import { useQuery } from "@tanstack/react-query";
import {
  githubContributorsListQueryOptions,
  miravaMirrorsListQueryOptions,
} from "./lib/api";
import GlowingStars from "./components/GlowingStars";
import Navbar from "./components/Navbar";
import { Link, Loader } from "lucide-react";

function App() {
  const { data, isLoading } = useQuery(miravaMirrorsListQueryOptions);
  const { data: contributorsData } = useQuery(
    githubContributorsListQueryOptions,
  );

  return (
    <>
      <div>
        <GlowingStars />
        <div className="z-20 w-full min-h-screen text-white">
          <Navbar />
          <main className="w-full flex flex-col items-center px-2 md:px-[10vw] my-10">
            <section>
              <h2 className="font-bold text-2xl text-center">Mirrors List</h2>
              {isLoading && (
                <Loader size={32} className="animate-spin text-white" />
              )}
              {data && (
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.mirrors.map((mirror, idx) => (
                    <div
                      key={idx}
                      className="bg-cyan-900/50 hover:bg-cyan-800/50 backdrop-blur-sm min-h-64 transition-colors duration-200 p-4 rounded-lg shadow-md flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-white truncate">
                          {mirror.name}
                        </h3>
                        <a
                          href={mirror.url}
                          target="_blank"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Link size={20} />
                        </a>
                      </div>
                      <p className="text-sm text-cyan-300 mb-3 line-clamp-3">
                        {mirror.description}
                      </p>
                      <div className="flex-1"></div>
                      <div className="flex flex-wrap gap-2">
                        {mirror.packages.map((p) => (
                          <span
                            key={p}
                            className="bg-cyan-600 text-cyan-100 text-xs font-medium px-2 py-1 rounded-full hover:bg-cyan-500 transition-colors"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
            <section>
              <h2 className="font-bold text-2xl text-center mt-2">Contributors</h2>
              <p className="text-center font-light">
                Special thanks to our contributors!
              </p>
              {contributorsData && (
                <div className="w-full flex flex-wrap justify-center gap-6 mt-8">
                  {contributorsData
                    .sort((a, b) => b.contributions - a.contributions)
                    .map((contributor) => (
                      <a
                        aria-label={`Go to ${contributor.login.toLowerCase()}'s profile in Github`}
                        href={`https://github.com/${contributor.login}`}
                        target="_blank"
                        key={contributor.id}
                        className="p-4 rounded-md border flex flex-col gap-2 items-center justify-center hover:scale-125 transition-transform"
                      >
                        <div className="rounded-full overflow-hidden relative">
                          <div className="absolute inset-0 bg-cyan-500/25 z-10"></div>
                          <img
                            src={contributor.avatar_url}
                            alt={`${contributor.login.toLowerCase()}'s Avatar`}
                            width={96}
                            height={96}
                            loading="lazy"
                            className="grayscale-100"
                          />
                        </div>
                        <p>{contributor.login.toLowerCase()}</p>
                      </a>
                    ))}
                </div>
              )}
            </section>
          </main>
          <footer className="p-2">
            <p className="text-xs opacity-80 text-center">
              Built with 🩵 by Mirava Contributors
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
