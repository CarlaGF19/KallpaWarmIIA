
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { BotIcon, User, Mail, Lock, Eye, EyeOff, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import '../login/login-ui.css';

// ---------- Schemas ----------
const nicknameSchema = z
  .string()
  .min(4, { message: "El apodo debe tener al menos 4 caracteres." })
  .max(20, { message: "Máximo 20 caracteres." })
  .regex(/^[A-Za-z0-9_]+$/, {
    message: "Solo letras, números y guion bajo (_), sin espacios.",
  });

const passwordSchema = z
  .string()
  .min(10, { message: "Mínimo 10 caracteres." })
  .regex(/[a-z]/, { message: "Incluye al menos una letra minúscula." })
  .regex(/[A-Z]/, { message: "Incluye al menos una letra mayúscula." })
  .regex(/\d/, { message: "Incluye al menos un número." })
  .regex(/[^A-Za-z0-9]/, { message: "Incluye al menos un carácter especial." })
  .refine((v) => !/\s/.test(v), { message: "La contraseña no puede contener espacios." });

const formSchema = z
  .object({
    nickname: nicknameSchema,
    email: z.string().email({ message: "Correo electrónico inválido." }),
    confirmEmail: z.string().email({ message: "Correo electrónico inválido." }),
    age: z.enum(["12", "13", "14", "15", "16", "17"], {
      required_error: "Selecciona tu edad.",
    }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Los correos no coinciden.",
    path: ["confirmEmail"],
  })
  .superRefine((data, ctx) => {
    const local = data.email.split("@")[0]?.toLowerCase?.() ?? "";
    const pw = data.password.toLowerCase();
    if (pw.includes(data.nickname.toLowerCase())) {
      ctx.addIssue({
        path: ["password"],
        code: z.ZodIssueCode.custom,
        message: "La contraseña no debe contener tu apodo.",
      });
    }
    if (local && pw.includes(local)) {
      ctx.addIssue({
        path: ["password"],
        code: z.ZodIssueCode.custom,
        message: "La contraseña no debe contener tu correo.",
      });
    }
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Las contraseñas no coinciden.",
      });
    }
  });

async function checkNicknameAvailable(nickname: string): Promise<boolean> {
  // Mock check
  return !['wawita', 'kallpa', 'admin'].includes(nickname.toLowerCase());
}

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [checkingNick, setCheckingNick] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      email: "",
      confirmEmail: "",
      age: undefined,
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const blockPasteHandlers = {
    onPaste: (e: React.ClipboardEvent) => e.preventDefault(),
    onDrop: (e: React.DragEvent) => e.preventDefault(),
  };

  async function validateNicknameUnique(nick: string) {
    if (!nick) return;
    setCheckingNick(true);
    const available = await checkNicknameAvailable(nick);
    setCheckingNick(false);
    if (!available) {
      form.setError("nickname", {
        type: "manual",
        message: "Ese apodo ya está en uso. Elige otro.",
      });
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const available = await checkNicknameAvailable(values.nickname);
    if (!available) {
      form.setError("nickname", {
        type: "manual",
        message: "Ese apodo ya está en uso. Elige otro.",
      });
      return;
    }
    
    toast({
      title: "¡Registro exitoso!",
      description: `¡Bienvenida, ${values.nickname}! Comienza tu aventura.`,
    });
    router.push("/avatar");
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

        <h1 className="title">Crea tu Cuenta</h1>
        <p className="text-center text-sm text-muted-foreground -mt-4 mb-6">
            Completa tus datos para empezar.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="stack-16">
                <div>
                    <label htmlFor="nickname" className="label">Nickname</label>
                    <div className="input-wrap">
                        <span className="input-icon-left"><User size={18} /></span>
                        <input
                            id="nickname"
                            className="input"
                            placeholder="Tu apodo"
                            autoComplete="username"
                            {...form.register("nickname", {
                                onBlur: (e) => validateNicknameUnique(e.target.value.trim()),
                            })}
                        />
                    </div>
                    {form.formState.errors.nickname ? <p className="error">{form.formState.errors.nickname.message}</p> :
                     checkingNick && <p className="help">Verificando disponibilidad...</p>}
                </div>
                
                <div>
                    <label htmlFor="email" className="label">Correo electrónico</label>
                    <div className="input-wrap">
                        <span className="input-icon-left"><Mail size={18} /></span>
                        <input
                            id="email"
                            className="input"
                            type="email"
                            placeholder="tucorreo@ejemplo.com"
                            autoComplete="email"
                            inputMode="email"
                            {...form.register("email")}
                            {...blockPasteHandlers}
                        />
                    </div>
                    {form.formState.errors.email && <p className="error">{form.formState.errors.email.message}</p>}
                </div>
                
                <div>
                    <label htmlFor="confirmEmail" className="label">Confirmar correo</label>
                    <div className="input-wrap">
                        <span className="input-icon-left"><Mail size={18} /></span>
                        <input
                            id="confirmEmail"
                            className="input"
                            type="email"
                            placeholder="Repite tu correo"
                            autoComplete="off"
                            inputMode="email"
                            {...form.register("confirmEmail")}
                             {...blockPasteHandlers}
                        />
                    </div>
                     {form.formState.errors.confirmEmail && <p className="error">{form.formState.errors.confirmEmail.message}</p>}
                </div>

                {/* Age selector is not a standard input, so it won't use the .input class */}
                <div>
                    <label htmlFor="age" className="label">Edad</label>
                     <div className="input-wrap">
                        <span className="input-icon-left"><Calendar size={18}/></span>
                        <Select onValueChange={(value) => form.setValue('age', value as any)} defaultValue={form.getValues('age')}>
                            <SelectTrigger className="input !px-11" id="age">
                                <SelectValue placeholder="Selecciona tu edad" />
                            </SelectTrigger>
                            <SelectContent>
                                {["12", "13", "14", "15", "16", "17"].map((y) => (
                                <SelectItem key={y} value={y}>{y}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                     </div>
                      {form.formState.errors.age && <p className="error">{form.formState.errors.age.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" aria-label="Contraseña" className="label">Contraseña</label>
                    <div className="input-wrap">
                        <span className="input-icon-left"><Lock size={18} /></span>
                        <input
                            id="password"
                            className="input"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            autoComplete="new-password"
                             {...form.register("password")}
                             {...blockPasteHandlers}
                        />
                        <button type="button" className="input-icon-right" onClick={() => setShowPassword(s => !s)}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                     {form.formState.errors.password ? 
                        <p className="error">{form.formState.errors.password.message}</p> :
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
                             {...form.register("confirmPassword")}
                             {...blockPasteHandlers}
                        />
                        <button type="button" className="input-icon-right" onClick={() => setShowConfirm(s => !s)}>
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {form.formState.errors.confirmPassword && <p className="error">{form.formState.errors.confirmPassword.message}</p>}
                </div>

                <div className="pt-2">
                    <button type="submit" className="btn btn-primary">
                        Crear cuenta
                    </button>
                </div>
            </div>
        </form>

         <p className="form-footer">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="link">
                Inicia sesión
            </Link>
        </p>
      </div>
    </div>
  );
}

    