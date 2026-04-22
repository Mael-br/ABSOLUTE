import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Informe um e-mail válido."),
  password: z
    .string()
    .min(8, "A senha precisa ter pelo menos 8 caracteres.")
    .regex(/[A-Z]/, "Use pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "Use pelo menos uma letra minúscula.")
    .regex(/[0-9]/, "Use pelo menos um número.")
});

export const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(1, "Informe sua senha.")
});

export const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Informe um e-mail válido."),
  message: z.string().min(20, "Descreva seu projeto com mais detalhes.")
});

export const checkoutSchema = z.object({
  productSlug: z.string().min(1, "Produto inválido.")
});

