import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PropsAtt } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Half1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export function GuardiaPopover(eventInfo: any) {
  const {
    medico,
    image,
    sector,
    valor,
    descripcion,
    horas,
    estado,
    idGuardia,
  }: PropsAtt = eventInfo.event.extendedProps;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            `flex gap-1 px-1 justify-start cursor-pointer  w-full h-auto bg-green-500 hover:bg-green-400`,
            estado === "VACANTE" && "bg-orange-500 hover:bg-orange-400"
          )}
        >
          <b>{eventInfo.event._def.title}</b>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <span className="bg-green-500 text-white p-1 rounded-xl text-[12px] leading-loose">
          {sector}
        </span>
        <div className="space-y-2 ">
          {medico ? (
            <div className="flex items-center gap-4">
              <Image
                src={image}
                alt={medico}
                width={30}
                height={30}
                className="rounded-full"
              />
              <h1 className="font-semibold ">{medico}</h1>
            </div>
          ) : (
            <h1>Vacante</h1>
          )}

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

          {!medico && (
            <Button className="block">
              <Link href={`/panel/${idGuardia}`}>Ver Solicitudes</Link>
            </Button>
          )}
          <Button variant={"outline"} className="block">
            Editar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
