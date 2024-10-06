import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type PropsAtt = {
  profesional: string;
  sector: string;
  valor: number;
  descripcion: string;
  horas: number;
};

export function GuardiaPopover(eventInfo: any) {
  const { profesional, sector, valor, descripcion, horas }: PropsAtt =
    eventInfo.event.extendedProps;
  console.log(eventInfo);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            `flex gap-1 px-1 justify-start cursor-pointer  w-full h-auto bg-green-500 hover:bg-green-400`,
            !profesional && "bg-orange-500 hover:bg-orange-400"
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
          <h1 className="font-semibold ">{profesional}</h1>

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

          {!profesional && <Button className="block">Publicar</Button>}
        </div>
      </PopoverContent>
    </Popover>
  );
}
