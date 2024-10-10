"use server";

import { Estado } from "@prisma/client";
import prisma from "./db";
import { guardiaSchema } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  if (data.medicosId === "") delete data.medicosId;

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

export async function createSolicitud(idMedico: string, idGuardia: string) {
  console.log("datos", idMedico, idGuardia);
  try {
    const solicitud = await prisma.solicitudes.create({
      data: {
        guardiaId: idGuardia,
        medicosId: idMedico,
        estado: "PENDIENTE",
      },
    });
    revalidatePath("/profesional");
  } catch (error) {
    console.log("error creating solicitud", error);
  }
}

export async function confimarSolicitud(idSolicitud: string) {
  try {
    const solicitud = await prisma.solicitudes.update({
      where: {
        id: idSolicitud,
      },
      data: {
        estado: "APROBADA",
      },
    });
    await prisma.guardias.update({
      where: { id: solicitud.guardiaId },
      data: {
        medicosId: solicitud.medicosId,
        estado: "ASIGNADO",
      },
    });
  } catch (error) {
    console.log("Error updating solicitud and guardia", error);
  }
  revalidatePath("/panel");
  redirect("/panel");
}
