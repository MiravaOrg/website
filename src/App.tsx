import { useQuery } from "@tanstack/react-query";
import {
  githubContributorsListQueryOptions,
  miravaMirrorsListQueryOptions,
} from "./lib/api";
import Navbar from "./components/Navbar";
import { ExternalLink, Loader, AlertCircle } from "lucide-react";
import { lazy, Suspense, useMemo } from "react";

const GlowingStars = lazy(() => import("./components/GlowingStars"));

function MirrorSkeleton() {
  return (
    <div className="bg-cyan-900/30 rounded-xl p-5 min-h-56 animate-pulse flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="h-4 bg-cyan-700/50 rounded w-3/4" />
        <div className="h-4 w-4 bg-cyan-700/40 rounded shrink-0" />
      </div>
      <div className="space-y-2 flex-1">
        <div className="h-3 bg-cyan-700/30 rounded w-full" />
        <div className="h-3 bg-cyan-700/30 rounded w-5/6" />
        <div className="h-3 bg-cyan-700/30 rounded w-4/6" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-cyan-700/40 rounded-full" />
        <div className="h-5 w-20 bg-cyan-700/40 rounded-full" />
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-red-400 py-10">
      <AlertCircle size={28} />
      <p className="text-sm">{message}</p>
    </div>
  );
}

function App() {
  const { data, isLoading, isError } = useQuery(miravaMirrorsListQueryOptions);
  const {
    data: contributorsData,
    isLoading: contributorsLoading,
    isError: contributorsError,
  } = useQuery(githubContributorsListQueryOptions);

  const sortedContributors = useMemo(
    () =>
      contributorsData
        ?.slice()
        .sort((a, b) => b.contributions - a.contributions),
    [contributorsData],
  );

  return (
    <>
      <Suspense fallback={null}>
        <GlowingStars />
      </Suspense>
      <div className="w-full min-h-screen text-white flex flex-col">
        <Navbar />
        <main className="w-full flex-1 flex flex-col items-center px-4 sm:px-6 md:px-[8vw] lg:px-[10vw] py-10 gap-16">

          {/* Mirrors */}
          <section className="w-full">
            <h2 className="font-bold text-2xl text-center mb-6">Mirrors List</h2>

            {isLoading && (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <MirrorSkeleton key={i} />
                ))}
              </div>
            )}

            {isError && (
              <ErrorMessage message="Failed to load mirrors. Please try again later." />
            )}

            {data && data.mirrors.length === 0 && (
              <p className="text-center text-cyan-300/60 py-10">No mirrors available.</p>
            )}

            {data && data.mirrors.length > 0 && (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {data.mirrors.map((mirror, idx) => (
                  <article
                    key={idx}
                    className="bg-cyan-900/40 hover:bg-cyan-800/50 backdrop-blur-sm border border-cyan-700/30 hover:border-cyan-500/40 transition-all duration-200 p-5 rounded-xl shadow-lg flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-base text-white leading-snug">
                        {mirror.name}
                      </h3>
                      <a
                        href={mirror.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${mirror.name}`}
                        className="shrink-0 text-cyan-400 hover:text-cyan-200 transition-colors mt-0.5"
                      >
                        <ExternalLink size={15} />
                      </a>
                    </div>
                    <p className="text-sm text-cyan-200/65 line-clamp-3 leading-relaxed flex-1">
                      {mirror.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {mirror.packages.map((p) => (
                        <span
                          key={p}
                          className="bg-cyan-700/40 text-cyan-100 text-xs font-medium px-2.5 py-0.5 rounded-full border border-cyan-600/30"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Contributors */}
          <section className="w-full">
            <h2 className="font-bold text-2xl text-center mb-2">Contributors</h2>
            <p className="text-center text-sm text-cyan-200/60 mb-8">
              Special thanks to our contributors!
            </p>

            {contributorsLoading && (
              <div className="flex justify-center py-6">
                <Loader size={24} className="animate-spin text-cyan-400" />
              </div>
            )}

            {contributorsError && (
              <ErrorMessage message="Failed to load contributors." />
            )}

            {sortedContributors && (
              <div className="w-full flex flex-wrap justify-center gap-4">
                {sortedContributors.map((contributor) => (
                  <a
                    key={contributor.id}
                    href={`https://github.com/${contributor.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${contributor.login}'s GitHub profile`}
                    className="group p-3 rounded-xl border border-cyan-700/30 hover:border-cyan-400/50 hover:bg-cyan-800/30 flex flex-col gap-2 items-center hover:scale-110 transition-all duration-200"
                  >
                    <div className="rounded-full overflow-hidden relative w-16 h-16 sm:w-20 sm:h-20">
                      <div className="absolute inset-0 bg-cyan-500/20 z-10" />
                      <img
                        src={`${contributor.avatar_url}&s=80`}
                        alt={`${contributor.login}'s avatar`}
                        width={80}
                        height={80}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <p className="text-xs text-cyan-200/70">
                      {contributor.login.toLowerCase()}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </section>
        </main>

        <footer className="py-4 px-4 border-t border-cyan-800/30">
          <p className="text-xs text-center text-cyan-200/50">
            Built with 🩵 by Mirava Contributors
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
