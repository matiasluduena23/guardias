"use server";

import { Estado } from "@prisma/client";
import prisma from "./db";
import { guardiaSchema } from "./definitions";
import { revalidatePath } from "next/cache";
import { error } from "console";

type FormState = {
  message?: string;
  errors?: {
    sector?: string[];
    horas?: string[];
    inicio?: string[];
    valor?: string[];
    time?: string[];
    profesional?: string[];
    descripcion?: string[];
  };
};

export async function addGuardia(state: FormState, formData: FormData) {
  const values = Object.fromEntries(formData);
  const validateFields = guardiaSchema.safeParse(values);

  console.log("data", values);
  if (!validateFields.success) {
    return {
      message: "Error en los datos ",
      error: validateFields.error.flatten(),
    };
  }
  validateFields.data.inicio.setHours(+validateFields.data.time!.split(":")[0]);
  validateFields.data.inicio.setMinutes(
    +validateFields.data.time!.split(":")[1]
  );
  const estado: Estado = validateFields.data.profesional
    ? "CUBIERTA"
    : "VACANTE";

  const data = { ...validateFields.data, estado };
  delete data.time;

  try {
    await prisma.guardia.create({ data: data });
    revalidatePath("/panel");
    return { message: "guardia Added" };
  } catch (error) {
    return { message: "Error cargando la guardia" };
  }
}
