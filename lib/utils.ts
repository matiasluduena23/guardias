import { Guardia } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventCalendarT } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function eventFormat(events: Guardia[]) {
  const eventFormat: EventCalendarT[] = events.map((item) => {
    const endDay = new Date(item.inicio);
    endDay.setHours(item.inicio.getHours() + item.horas);

    return {
      id: item.id,
      title: `${item.profesional ? item.profesional?.split(" ")[1] : ""} ${
        item.sector
      }`,
      start: item.inicio,
      end: endDay,
      extendedProps: {
        profesional: item.profesional,
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
