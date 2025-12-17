import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkHandleAvailability } from "../api/DevTreeApi";

type SearchFormData = { handle: string };

function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export default function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({ defaultValues: { handle: "" } });
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: SearchFormData) => {
    const slug = makeSlug(data.handle);
    if (!slug) return;

    setLoading(true);
    setAvailable(null);
    setMessage("");
    try {
      const res = await checkHandleAvailability(slug);
      if (res.available) {
        setAvailable(true);
        setMessage(`El handle "${slug}" está disponible.`);

        navigate(`/auth/register?handle=${encodeURIComponent(slug)}`);
      } else {
        setAvailable(false);
        setMessage(`El handle "${slug}" ya está tomado.`);
        // Redirigir al perfil público
        navigate(`/${slug}`);
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="relative flex flex-col md:flex-row md:items-center bg-white px-2 py-2 md:py-0 rounded-md border border-slate-200 gap-2 md:gap-0">
        <label
          htmlFor="handle"
          className="text-slate-600 pl-2 md:pr-2 text-sm md:text-base font-medium"
        >
          devtree.com/
        </label>
        <input
          id="handle"
          type="text"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1 text-slate-900 placeholder:text-slate-400 min-w-0 font-medium"
          placeholder="usuario"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>

      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer hover:bg-cyan-500 transition-colors"
          disabled={loading}
        >
          {loading ? "Comprobando..." : "Obtener mi DevTree"}
        </button>
      </div>

      {message && (
        <p className={`mt-2 ${available ? "text-green-500" : "text-red-400"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
