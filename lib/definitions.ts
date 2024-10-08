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
  inicio: z.coerce.date({ message: "Ingrese una fecha" }),
  time: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Ingrese una hora",
    })
    .optional(),
  valor: z.coerce.number().gt(1000, { message: "Ingrese un valor" }),
  profesional: z.string().optional(),
  descripcion: z.string().optional(),
});
