"use server";

import { Estado } from "@prisma/client";
import prisma from "./db";
import { guardiaSchema } from "./definitions";
import { revalidatePath } from "next/cache";

type FormState = {
  message?: string;
};

export async function addGuardia(state: FormState, formData: FormData) {
  const values = Object.fromEntries(formData);
  const validateFields = guardiaSchema.safeParse(values);

  console.log("data", values);
  if (!validateFields.success) {
    return { message: "Error en los datos " };
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
    const newGuardia = await prisma.guardia.create({ data: data });
    console.log("guardia", newGuardia);
    revalidatePath("/panel");
    return { message: "guardia Added" };
  } catch (error) {
    console.log("Error creando la guardia", error);
    return { message: "Error cargando la guardia" };
  }
}
