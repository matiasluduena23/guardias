import { Guardias, Medicos, Solicitudes } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventCalendarT } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function eventFormat(
  events: Guardias[],
  medicos: Medicos[],
  solicitudes: Solicitudes[]
) {
  const medicosMap = new Map(medicos.map((m) => [m.id, m]));
  const solicitudesMap = new Map(solicitudes.map((s) => [s.guardiaId, s]));

  const formattedEvents: EventCalendarT[] = events.map((item) => {
    const endDay = new Date(item.inicio);
    endDay.setHours(endDay.getHours() + item.horas);

    const medico = item.medicosId ? medicosMap.get(item.medicosId) : undefined;
    const nombreCompleto = medico
      ? `${medico.nombre} ${medico.apellido}`
      : undefined;
    const solicitud = solicitudesMap.get(item.id);

    return {
      id: item.id,
      title: nombreCompleto ?? "Vacante",
      start: item.inicio,
      end: endDay,
      extendedProps: {
        idMedico: medico?.id,
        idGuardia: item.id,
        medico: nombreCompleto ?? "",
        image: medico?.imagen ?? "",
        sector: item.sector,
        valor: item.valor,
        descripcion: item.descripcion,
        horas: item.horas,
        estado: item.estado,
        estadoSolicitud: solicitud?.estado,
      },
    };
  });

  return formattedEvents;
}

export function eventFormatMedico(
  events: Guardias[],
  medico: Medicos,
  solicitudes: Solicitudes[]
): EventCalendarT[] {
  return events
    .map((item) => {
      const startDate = new Date(item.inicio);
      if (isNaN(startDate.getTime()) || typeof item.horas !== "number") {
        console.warn(`Invalid data for event: ${item.id}`);
        return null; // O lanzar un error dependiendo de cómo manejes los datos inválidos
      }

      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + item.horas);

      const solicitud = solicitudes.find((s) => s.guardiaId === item.id);
      return {
        id: item.id,
        title: item.estado,
        start: startDate,
        end: endDate,
        extendedProps: {
          idGuardia: item.id,
          idMedico: medico.id,
          sector: item.sector,
          valor: item.valor,
          descripcion: item.descripcion,
          horas: item.horas,
          estado: item.estado,
          estadoSolicitud: solicitud?.estado,
        },
      };
    })
    .filter((event) => event !== null); // Filtra eventos inválidos
}
