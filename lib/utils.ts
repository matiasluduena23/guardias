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
  const eventFormat: EventCalendarT[] = events.map((item) => {
    const endDay = new Date(item.inicio);
    endDay.setHours(item.inicio.getHours() + item.horas);
    const medico = item.medicosId
      ? medicos.find((m) => m.id === item.medicosId)
      : undefined;
    const nombreCompleto = medico
      ? `${medico.nombre} ${medico.apellido}`
      : undefined;
    const solicitud = solicitudes.find((s) => s.guardiaId === item.id);
    return {
      id: item.id,
      title: nombreCompleto ? nombreCompleto : "Vacante",
      start: item.inicio,
      end: endDay,
      extendedProps: {
        idMedico: medico?.id,
        idGuardia: item.id,
        medico: nombreCompleto ? nombreCompleto : "",
        image: medico ? medico.imagen : "",
        sector: item.sector,
        valor: item.valor,
        descripcion: item.descripcion,
        horas: item.horas,
        estado: item.estado,
        estadoSolicitud: solicitud?.estado,
      },
    };
  });
  return eventFormat;
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
