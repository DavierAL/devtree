import Header from "../components/Header";
import SearchForm from "./SearchForm";

export default function HomeView() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-10 md:py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left: Copy + Form */}
          <section className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Perfil en un enlace • rápido y personalizable
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Todas tus{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                Redes Sociales
              </span>{" "}
              en un solo enlace
            </h1>

            <p className="max-w-xl text-lg text-slate-300 md:text-xl">
              Crea un perfil personalizado con tus redes sociales favoritas y
              comparte tu enlace con el mundo.
            </p>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-[0_0_0_1px_rgba(148,163,184,0.08)] backdrop-blur">
              <div className="mb-3 text-sm font-medium text-slate-200">
                Encuentra tu nombre de usuario
              </div>
              <SearchForm />
              <p className="mt-3 text-xs text-slate-400">
                Tip: usa un nombre corto, fácil de recordar.
              </p>
            </div>
          </section>

          {/* Right: “Preview” / Features */}
          <aside className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-cyan-500/10 blur-2xl" />

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Vista previa</p>
                  <p className="text-lg font-semibold text-slate-100">
                    Tu perfil público
                  </p>
                </div>
                <div className="rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
                  @tuusuario
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Un enlace para todo",
                  "Diseños limpios y modernos",
                  "Comparte en segundos",
                  "Optimizado para móvil",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4"
                  >
                    <span className="h-10 w-10 shrink-0 rounded-xl bg-cyan-500/15 ring-1 ring-cyan-400/20" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-100">{t}</p>
                      <p className="text-sm text-slate-400">
                        Configúralo una vez y actualiza cuando quieras.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-sm text-slate-400">CTR</p>
                  <p className="text-2xl font-bold text-slate-100">+18%</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-sm text-slate-400">Clicks</p>
                  <p className="text-2xl font-bold text-slate-100">1.2k</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
