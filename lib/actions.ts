"use server";

import { Estado } from "@prisma/client";
import prisma from "./db";
import { guardiaSchema } from "./definitions";
import { revalidatePath } from "next/cache";

type FormState = {
  message?: string;
  errors?: {
    sector?: string[];
    horas?: string[];
    inicio?: string[];
    valor?: string[];
    time?: string[];
    medicosId?: string[];
    descripcion?: string[];
  };
};

export async function addGuardia(state: FormState, formData: FormData) {
  const values = Object.fromEntries(formData);
  const validateFields = guardiaSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      message: "Error en los datos ",
      error: validateFields.error.flatten(),
    };
  }

  const estado: Estado = validateFields.data.medicosId ? "ASIGNADO" : "VACANTE";

  const data = { ...validateFields.data, estado };

  console.log("data", data);
  try {
    await prisma.guardias.create({ data: data });
    revalidatePath("/panel");
    return { message: "guardia Added" };
  } catch (error) {
    console.log(error);
    return { message: "Error cargando la guardia" };
  }
}
