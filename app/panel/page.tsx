import React from "react";
import CargarGuardia from "./cargar-guardia";
import Calendar from "./calendar";
import DialogGuardia from "./cargar-guardia";
import prisma from "@/lib/db";

export default async function page() {
  const events = (await prisma.guardias.findMany()) || [];
  const medicos = await prisma.medicos.findMany();
  const solicitudes = await prisma.solicitudes.findMany();

  return (
    <div className="container mx-auto my-16 max-w-[1100px]">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Hospital X</h1>
        <DialogGuardia medicos={medicos} />
      </div>
      <Calendar events={events} medicos={medicos} solicitudes={solicitudes} />
    </div>
  );
}
