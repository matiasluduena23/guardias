import prisma from "@/lib/db";
import React from "react";
import CardSolicitud from "./CardSolicitud";

export default async function page({ params }: { params: { id: string } }) {
  const guardia = await prisma.guardias.findUnique({
    where: {
      id: params.id,
    },

    include: {
      Solicitudes: {
        where: {
          estado: "PENDIENTE",
        },
        include: {
          Medicos: {},
        },
      },
    },
  });
  if (!guardia) throw new Error("Error cargando la guardia");
  return (
    <div className="container mx-auto mt-20">
      <CardSolicitud guardia={guardia} />
    </div>
  );
}
