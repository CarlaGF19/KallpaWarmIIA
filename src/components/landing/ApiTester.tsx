"use client";
import { useState } from "react";

/**
 * Usa la URL del backend desde .env.local.
 * Ejemplo: NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
 */
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api/v1";

export function ApiTester() {
  const [echoRes, setEchoRes] = useState<any>(null);
  const [contactRes, setContactRes] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const probarEcho = async () => {
    setLoading(true);
    setErr(null);
    try {
      const r = await fetch(`${API_BASE}/echo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: "hola desde Next.js" }),
      });
      const data = await r.json();
      setEchoRes(data);
    } catch (e: any) {
      setErr(e?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const enviarContacto = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setLoading(true);
    setErr(null);
    const fd = new FormData(ev.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const r = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      setContactRes(data);
    } catch (e: any) {
      setErr(e?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6 my-10 rounded-2xl bg-white/70 shadow">
      <h2 className="text-2xl font-semibold mb-4">Prueba de backend Flask</h2>

      <div className="mb-6">
        <button
          onClick={probarEcho}
          className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Probar /echo"}
        </button>
        <pre className="mt-3 p-3 rounded bg-black text-green-200 overflow-auto">
{JSON.stringify(echoRes, null, 2)}
        </pre>
      </div>

      <form onSubmit={enviarContacto} className="space-y-3">
        <h3 className="text-xl font-medium">Formulario de contacto</h3>
        <input name="nombre" placeholder="Nombre" className="w-full p-2 rounded border" required />
        <input name="correo" type="email" placeholder="Correo" className="w-full p-2 rounded border" required />
        <textarea name="mensaje" placeholder="Mensaje" className="w-full p-2 rounded border" required />
        <button type="submit" className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60" disabled={loading}>
          {loading ? "Enviando..." : "Enviar a /contact"}
        </button>
      </form>

      {err && <p className="mt-3 text-red-600">Error: {err}</p>}

      <pre className="mt-3 p-3 rounded bg-black text-green-200 overflow-auto">
{JSON.stringify(contactRes, null, 2)}
      </pre>
    </section>
  );
}
