import React from "react";
import Calendar from "./calendar";
import prisma from "@/lib/db";
import MedicoProvider from "../context/MedicoProvider";

export default async function page() {
  const medico = await prisma.medicos.findUnique({
    where: {
      id: "jkdsfisdf9",
    },
  });

  if (!medico) throw new Error("Error cargando el medico");

  const solicitudes = await prisma.solicitudes.findMany({
    where: { medicosId: "jkdsfisdf9" },
  });
  const events = await prisma.guardias.findMany({
    where: {
      OR: [
        {
          medicosId: "jkdsfisdf9",
        },
        {
          estado: "VACANTE",
        },
      ],
    },
  });
  return (
    <div>
      <MedicoProvider medico={medico}>
        <Calendar events={events} solicitudes={solicitudes} />
      </MedicoProvider>
    </div>
  );
}
