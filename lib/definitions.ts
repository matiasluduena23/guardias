import z from "zod";

export type GuardiaT = {
  sector: string;
  horas: number;
  inicio: Date;
  valor: number;
  time?: string | undefined;
  profesional?: string | undefined;
  descripcion?: string | undefined;
};

export const guardiaSchema = z.object({
  sector: z.string().min(2, {
    message: "Seleccione una option",
  }),
  horas: z.coerce.number().gt(2, { message: "Ingrese un numero" }),
  inicio: z.coerce.date({
    message: "Ingrese una fecha",
  }),
  valor: z.coerce.number().gt(1000, { message: "Ingrese un valor" }),
  medicosId: z.string().optional(),
  descripcion: z.string().optional(),
});

export type EventCalendarT = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

export type PropsAtt = {
  idMedico: string;
  idGuardia: string;
  medico: string;
  image: string;
  sector: string;
  valor: number;
  descripcion: string;
  horas: number;
  estado: "VACANTE" | "ASIGNADO";
  estadoSolicitud: "PENDIENTE" | "APROBADA" | "RECHAZADA";
};
