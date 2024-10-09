import { Guardias, Medicos } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventCalendarT } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function eventFormat(events: Guardias[], medicos: Medicos[]) {
  console.log("medicos", medicos);
  const eventFormat: EventCalendarT[] = events.map((item) => {
    const endDay = new Date(item.inicio);
    endDay.setHours(item.inicio.getHours() + item.horas);
    const medico = item.medicosId
      ? medicos.find((m) => m.id === item.medicosId)
      : undefined;
    const nombreCompleto = medico
      ? `${medico.nombre} ${medico.apellido}`
      : undefined;
    return {
      id: item.id,
      title: nombreCompleto ? nombreCompleto : "Vacante",
      start: item.inicio,
      end: endDay,
      extendedProps: {
        medico: nombreCompleto ? nombreCompleto : "",
        image: medico ? medico.imagen : "",
        sector: item.sector,
        valor: item.valor,
        descripcion: item.descripcion,
        horas: item.horas,
        estado: item.estado,
      },
    };
  });
  return eventFormat;
}
