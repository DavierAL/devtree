import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getPublicProfile, trackProfileVisit } from "../api/DevTreeApi";
import { useEffect } from "react";
import type { SocialNetwork, User } from "../types";

export default function PublicProfileView() {
  const { handle } = useParams<{ handle: string }>();

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["publicProfile", handle],
    queryFn: () => getPublicProfile(handle!),
    enabled: !!handle,
    retry: false,
  });

  // Registrar visita al perfil
  useEffect(() => {
    if (handle) {
      trackProfileVisit(handle)
        .then((data) => {
          // Actualizar el contador localmente solo si la visita fue contada (no rate-limited)
          if (data.counted) {
            queryClient.setQueryData(
              ["publicProfile", handle],
              (prevData: User | undefined) => {
                if (!prevData) return prevData;
                return {
                  ...prevData,
                  visits: (prevData.visits || 0) + 1,
                };
              }
            );
          }
        })
        .catch(() => {
          // Silenciosamente ignorar errores de tracking
        });
    }
  }, [handle, queryClient]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">
          Cargando perfil...
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Perfil no encontrado
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            El usuario <span className="text-cyan-400">@{handle}</span> no
            existe
          </p>
          <Link
            to="/"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const links: SocialNetwork[] =
    typeof data.links === "string" ? JSON.parse(data.links) : data.links || [];
  const enabledLinks = links.filter((link) => link.enabled);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header con botón de volver */}
        <div className="mb-6 md:mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors text-sm md:text-base"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al inicio
          </Link>
        </div>

        {/* Tarjeta de perfil */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-6 md:space-y-8">
          {/* Avatar y nombre */}
          <div className="text-center space-y-3 md:space-y-4">
            {data.image ? (
              <img
                src={data.image}
                alt={data.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto object-cover ring-4 ring-cyan-500/20"
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center ring-4 ring-cyan-500/20">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  {data.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {data.name}
              </h1>
              <p className="text-cyan-400 text-base md:text-lg">
                @{data.handle}
              </p>
            </div>

            {data.description && (
              <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto px-4">
                {data.description}
              </p>
            )}

            {/* Contador de visitas */}
            <div className="inline-flex items-center gap-2 bg-slate-900/60 border border-slate-700 rounded-full px-3 md:px-4 py-2 text-xs md:text-sm">
              <svg
                className="w-4 h-4 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-slate-300">
                {data.visits || 0} {data.visits === 1 ? "visita" : "visitas"}
              </span>
            </div>
          </div>

          {/* Links sociales */}
          {enabledLinks.length > 0 ? (
            <div className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-white text-center mb-4">
                Mis Enlaces
              </h2>
              {enabledLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-900/60 hover:bg-slate-900 border border-slate-700 hover:border-cyan-500/50 rounded-xl md:rounded-2xl p-3 md:p-4 transition-all group"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Icono de la red social */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                      <div
                        className="w-6 h-6 md:w-8 md:h-8 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity"
                        style={{
                          backgroundImage: `url('/social/icon_${link.name}.svg')`,
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors text-sm md:text-base capitalize">
                        {link.name}
                      </p>
                      <p className="text-xs md:text-sm text-slate-400 truncate">
                        {link.url}
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm md:text-base">
                Este usuario aún no ha agregado enlaces
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 md:mt-8 text-center">
          <p className="text-slate-500 text-xs md:text-sm">
            Creado con{" "}
            <Link to="/" className="text-cyan-400 hover:text-cyan-300">
              DevTree
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
