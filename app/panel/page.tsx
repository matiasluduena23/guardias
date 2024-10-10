import React from "react";
import Calendar from "./calendar";
import DialogGuardia from "./cargar-guardia";
import prisma from "@/lib/db";
import { HeartPulseIcon } from "lucide-react";
import { InstitucionPopover } from "./intitucion-popover";

export default async function page() {
  const events = (await prisma.guardias.findMany()) || [];
  const medicos = await prisma.medicos.findMany();
  const solicitudes = await prisma.solicitudes.findMany();

  return (
    <div className="container mx-auto  max-w-[1100px]">
      <header className="flex justify-between items-center py-8">
        <div className="flex gap-2 items-center">
          <p className="font-mono text-3xl text-violet-800">MED-GUARD</p>
          <HeartPulseIcon className="text-violet-800 w-8 h-8" />
        </div>
        <DialogGuardia medicos={medicos} />

        <InstitucionPopover />
      </header>
      <div className="flex justify-between mb-4"></div>
      <Calendar events={events} medicos={medicos} solicitudes={solicitudes} />
    </div>
  );
}
