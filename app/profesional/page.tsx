import React from "react";
import Calendar from "./calendar";
import prisma from "@/lib/db";
import MedicoProvider from "../context/MedicoProvider";
import { PerfilPopover } from "./perfil-popover";
import {
  BookHeartIcon,
  HeartIcon,
  HeartOffIcon,
  HeartPulseIcon,
} from "lucide-react";
import { HeartFilledIcon } from "@radix-ui/react-icons";

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
    <div className="container mx-auto max-w-[1100px]">
      <header className="flex justify-between items-center py-8">
        <div className="flex gap-2 items-center">
          <p className="font-mono text-3xl text-violet-800">MED-GUARD</p>
          <HeartPulseIcon className="text-violet-800 w-8 h-8" />
        </div>
        <PerfilPopover medico={medico} />
      </header>
      <div className="flex justify-between mb-4">
        <MedicoProvider medico={medico}>
          <Calendar events={events} solicitudes={solicitudes} />
        </MedicoProvider>
      </div>
    </div>
  );
}
