"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createSolicitud } from "@/lib/actions";
import { Event } from "@/lib/definitions";
import { cn } from "@/lib/utils";

export function ProfesionalPopover(eventInfo: Event) {
  const {
    idGuardia,
    idMedico,
    sector,
    valor,

    estado,
    estadoSolicitud,
  } = eventInfo.event.extendedProps;
  return (
    <Popover>
      <PopoverTrigger asChild>
        {estadoSolicitud ? (
          <Button
            className={cn(
              `flex flex-col gap-1 px-1 justify-start cursor-pointer  w-full h-auto bg-green-500 hover:bg-green-400`,
              estadoSolicitud === "PENDIENTE" &&
                "bg-yellow-500 hover:bg-yellow-400",
              estadoSolicitud === "RECHAZADA" && "bg-rose-500 hover:bg-rose-400"
            )}
          >
            <b>{estadoSolicitud}</b>
          </Button>
        ) : (
          <Button
            className={cn(
              `flex flex-col gap-1 px-1 justify-start cursor-pointer  w-full h-auto bg-green-500 hover:bg-green-400`,
              estado === "VACANTE" && "bg-orange-500 hover:bg-orange-400"
            )}
          >
            <b>{estado}</b>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <span className="bg-green-500 text-white p-1 rounded-xl text-[12px] leading-loose">
          {sector}
        </span>
        <div className="space-y-2 ">
          {/* <h1 className="font-semibold ">{medico}</h1> */}

          <p>
            Desde:
            {eventInfo.event.start?.toLocaleDateString("es-AR", {
              hour: "2-digit",
            })}
          </p>
          <p>
            Hasta:
            {eventInfo.event.end?.toLocaleDateString("es-AR", {
              hour: "2-digit",
            })}
          </p>
          <strong>
            $
            {valor.toLocaleString("es-AR", {
              currency: "ARS",
            })}
          </strong>

          {estadoSolicitud ? (
            <>
              {estadoSolicitud === "PENDIENTE" && (
                <p>Esperando respuesta de la institucion</p>
              )}
            </>
          ) : (
            <>
              {estado === "ASIGNADO" ? (
                <Button variant={"destructive"} className="block">
                  Revocar
                </Button>
              ) : (
                <Button
                  className="block"
                  onClick={async () =>
                    await createSolicitud(idMedico, idGuardia)
                  }
                >
                  Solicitar
                </Button>
              )}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
