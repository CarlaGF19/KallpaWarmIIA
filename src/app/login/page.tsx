"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BotIcon, User, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

import "./login-ui.css";

// Políticas de ciberseguridad
const nicknameSchema = z
  .string()
  .min(4, { message: "El apodo debe tener al menos 4 caracteres." })
  .max(20, { message: "Máximo 20 caracteres." })
  .regex(/^[A-Za-z0-9_]+$/, {
    message: "Solo letras, números y guion bajo (_), sin espacios.",
  });

const passwordSchema = z
  .string()
  .regex(/[a-z]/, { message: "Incluye al menos una letra minúscula." })
  .regex(/[A-Z]/, { message: "Incluye al menos una letra mayúscula." })
  .regex(/\d/, { message: "Incluye al menos un número." })
  .regex(/[^A-Za-z0-9]/, { message: "Incluye al menos un carácter especial." })
  .refine((v) => !/\s/.test(v), { message: "La contraseña no puede contener espacios." });

const formSchema = z.object({
  nickname: nicknameSchema,
  password: passwordSchema,
});

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { nickname: "", password: "" },
    mode: "onTouched",
  });

  // Bloquear pegar y arrastrar en contraseña
  const blockPasteHandlers = {
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault(),
    onDrop: (e: React.DragEvent<HTMLInputElement>) => e.preventDefault(),
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "¡Inicio de sesión exitoso!",
      description: `¡Bienvenida de vuelta, ${values.nickname}!`,
    });
    
    // Navegar después de mostrar el toast
    setTimeout(() => {
      router.push("/avatar");
    }, 100);
  }

  return (
    <div className="min-h-dvh grid place-items-center relative" 
         style={{
           background: '#0B0F19 url("https://i.ibb.co/yn17D98P/fondo-1.png") center/cover no-repeat fixed'
         }}>

      {/* CARD LOGIN */}
      <section className="relative w-[92%] max-w-[560px] rounded-[20px] p-8
          text-white animate-in fade-in slide-in-from-bottom-2 duration-300
          transition-all duration-300 ease-out
          after:absolute after:inset-0 after:rounded-[20px] after:bg-gradient-to-r after:from-transparent after:via-white/12 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform shimmer-6s after:pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.06))',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,.22)',
            boxShadow: '0 10px 40px rgba(124,58,237,.25), inset 0 1px 0 rgba(255,255,255,.15)'
          }}>

         {/* encabezado: emoji + título */}
         <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl grid place-items-center text-2xl
              bg-gradient-to-br from-purple-500/20 to-cyan-400/15
              border border-white/22 shadow-sm
              transition-all duration-300">🚀</div>
            <div>
              <h1 className="text-3xl font-bold leading-none text-white">Login</h1>
              <p className="text-white/80 text-sm mt-1">Bienvenido/a a KallpaIA</p>
            </div>
          </div>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          {/* NICK */}
          <label className="block text-sm font-medium text-white mb-2" htmlFor="nickname">Nickname</label>
          <div className="relative mb-5">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80">
              <User className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <input 
              id="nickname" 
              type="text" 
              placeholder="Tu apodo"
              autoComplete="username"
              inputMode="text"
              {...form.register("nickname")}
              className="w-full h-12 pl-11 pr-4 rounded-[12px] text-white transition-all duration-300
                placeholder:text-white/65 focus:outline-none"
              style={{
                background: 'rgba(255,255,255,.08)',
                border: '1px solid rgba(255,255,255,.18)'
              }}
              onFocus={(e) => {
                const target = e.target as HTMLInputElement;
                target.style.borderColor = 'rgba(124,58,237,.65)';
                target.style.boxShadow = '0 0 0 3px rgba(124,58,237,.25)';
              }}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                target.style.borderColor = 'rgba(255,255,255,.18)';
                target.style.boxShadow = 'none';
              }} 
            />
          </div>
          {form.formState.errors.nickname && (
            <p className="text-red-400 text-sm mb-3 -mt-3">{form.formState.errors.nickname.message}</p>
          )}

          {/* PASS */}
          <label className="block text-sm font-medium text-white mb-2" htmlFor="password">Contraseña</label>
          <div className="relative mb-6">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80">
              <Lock className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <input 
              id="password" 
              type={showPassword ? 'text' : 'password'} 
              placeholder="••••••••"
              autoComplete="current-password"
              {...blockPasteHandlers}
              onKeyDown={(e) => { if (e.key === " ") e.preventDefault(); }}
              {...form.register("password")}
              className="w-full h-12 pl-11 pr-10 rounded-[12px] text-white transition-all duration-300
                placeholder:text-white/65 focus:outline-none"
              style={{
                background: 'rgba(255,255,255,.08)',
                border: '1px solid rgba(255,255,255,.18)'
              }}
              onFocus={(e) => {
                const target = e.target as HTMLInputElement;
                target.style.borderColor = 'rgba(124,58,237,.65)';
                target.style.boxShadow = '0 0 0 3px rgba(124,58,237,.25)';
              }}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                target.style.borderColor = 'rgba(255,255,255,.18)';
                target.style.boxShadow = 'none';
              }} 
            />
            <button 
              type="button" 
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-red-400 text-sm mb-3 -mt-3">{form.formState.errors.password.message}</p>
          )}

          {/* acciones superiores */}
          <div className="flex items-center justify-end gap-3 mb-6">
              <button type="button" className="text-sm text-cyan-300 hover:text-cyan-200 font-medium transition-colors">
                Olvidé mi contraseña
              </button>
            </div>

          {/* BOTÓN PRIMARIO */}
          <button
              type="submit"
              className="w-full h-12 rounded-[14px] text-white font-semibold border-0 transition-all duration-200 focus:outline-none"
              style={{
                background: 'linear-gradient(90deg, #7C3AED, #3B82F6)',
                boxShadow: '0 8px 24px rgba(60,120,255,.35)'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'translateY(-1px) scale(1.01)';
                target.style.filter = 'brightness(1.06)';
                target.style.boxShadow = '0 12px 36px rgba(60,120,255,.45)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'translateY(0) scale(1)';
                target.style.filter = 'brightness(1)';
                target.style.boxShadow = '0 8px 24px rgba(60,120,255,.35)';
              }}
            >
              Entrar
            </button>

          {/* BOTÓN SECUNDARIO */}
          <button
            type="button"
            onClick={() => router.push("/password")}
            className="w-full h-11 mt-3 rounded-[14px] text-white font-semibold border-0 transition-all duration-200 focus:outline-none"
            style={{
              background: 'linear-gradient(90deg, #EC4899, #22D3EE)'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = 'translateY(-1px) scale(1.01)';
              target.style.filter = 'brightness(1.06)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = 'translateY(0) scale(1)';
              target.style.filter = 'brightness(1)';
            }}
          >
            Olvidé mi contraseña
          </button>
        </form>

        {/* pie */}
        <p className="mt-6 text-center text-sm text-white">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-cyan-300 font-medium hover:text-cyan-200 transition-colors">
            Crear cuenta
          </Link>
        </p>
      </section>
    </div>
  );
}
