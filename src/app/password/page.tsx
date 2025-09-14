
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import { BotIcon, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import '../login/login-ui.css';

// ---------- Esquemas ----------
const emailSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo válido." }),
});

const passwordSchema = z
  .string()
  .min(10, { message: "Mínimo 10 caracteres." })
  .regex(/[a-z]/, { message: "Incluye al menos una letra minúscula." })
  .regex(/[A-Z]/, { message: "Incluye al menos una letra mayúscula." })
  .regex(/\d/,   { message: "Incluye al menos un número." })
  .regex(/[^A-Za-z0-9]/, { message: "Incluye al menos un carácter especial." })
  .refine((v) => !/\s/.test(v), { message: "La contraseña no puede contener espacios." });

const resetSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

function ForgotPasswordContent() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const blockPasteHandlers = {
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault(),
    onDrop: (e: React.DragEvent<HTMLInputElement>) => e.preventDefault(),
  };

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  async function onSubmitEmail(values: z.infer<typeof emailSchema>) {
    // Solicitar reseteo de contraseña
    toast({
      title: "Revisa tu correo",
      description: "Te enviamos un enlace para restablecer tu contraseña.",
    });
    // Redireccionar al flujo de token si es necesario
  }

  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  async function onSubmitReset(values: z.infer<typeof resetSchema>) {
    // Contraseña actualizada exitosamente
    toast({
      title: "Contraseña actualizada",
      description: "Ya puedes iniciar sesión con tu nueva contraseña.",
    });
    router.push("/login");
  }

  return (
    <div className="app">
      <div className="login-card">
         <header className="flex justify-center mb-6">
            <div className="logo">
                <span className="badge">
                    <BotIcon style={{ color: 'var(--ink)'}} size={20} />
                </span>
                <span>KallpaIA</span>
            </div>
        </header>

          {!token ? (
            <>
              <h1 className="title">Recuperar contraseña</h1>
               <p className="text-center text-sm text-muted-foreground -mt-4 mb-6">
                  Ingresa tu correo y te enviaremos un enlace para restablecerla.
                </p>
              
                <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-4">
                     <div>
                        <label htmlFor="email" className="label">Correo Electrónico</label>
                        <div className="input-wrap">
                            <span className="input-icon-left">
                                <Mail size={18} />
                            </span>
                            <input
                                id="email"
                                className="input"
                                type="email"
                                placeholder="tucorreo@ejemplo.com"
                                autoComplete="email"
                                inputMode="email"
                                {...blockPasteHandlers}
                                {...emailForm.register("email")}
                            />
                        </div>
                        {emailForm.formState.errors.email && <p className="error">{emailForm.formState.errors.email.message}</p>}
                    </div>
                  
                  <div className="pt-2">
                    <button type="submit" className="btn btn-primary">
                        Enviar enlace
                    </button>
                  </div>

                  <p className="form-footer">
                    ¿Ya la recordaste?{" "}
                    <Link href="/login" className="link">
                      Inicia sesión
                    </Link>
                  </p>
                </form>
            </>
          ) : (
            <>
              <h1 className="title">Crea una nueva contraseña</h1>
                <p className="text-center text-sm text-muted-foreground -mt-4 mb-6">
                  Elige una contraseña segura para tu cuenta.
                </p>

                <form onSubmit={resetForm.handleSubmit(onSubmitReset)}>
                    <div className="stack-20">
                        <div>
                            <label htmlFor="password" aria-label="Nueva contraseña" className="label">Nueva contraseña</label>
                            <div className="input-wrap">
                                <span className="input-icon-left"><Lock size={18} /></span>
                                <input
                                    id="password"
                                    className="input"
                                    type={showPw ? "text" : "password"}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    {...blockPasteHandlers}
                                    {...resetForm.register("password")}
                                />
                                <button type="button" className="input-icon-right" onClick={() => setShowPw(s => !s)}>
                                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {resetForm.formState.errors.password ? 
                              <p className="error">{resetForm.formState.errors.password.message}</p> :
                              <p className="help">Mín. 10 caracteres con Aa, 0-9 y símbolo.</p>
                            }
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" aria-label="Confirmar contraseña" className="label">Confirmar contraseña</label>
                            <div className="input-wrap">
                                <span className="input-icon-left"><Lock size={18} /></span>
                                <input
                                    id="confirmPassword"
                                    className="input"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    {...blockPasteHandlers}
                                    {...resetForm.register("confirmPassword")}
                                />
                                <button type="button" className="input-icon-right" onClick={() => setShowConfirm(s => !s)}>
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {resetForm.formState.errors.confirmPassword && <p className="error">{resetForm.formState.errors.confirmPassword.message}</p>}
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="btn btn-primary">
                                Restablecer contraseña
                            </button>
                        </div>
                    </div>
                </form>
                <p className="form-footer">
                  ¿Recordaste tu contraseña?{" "}
                  <Link href="/login" className="link">Inicia sesión</Link>
                </p>
            </>
          )}
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}

    