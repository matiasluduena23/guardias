import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Medicos } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { HospitalIcon, LogOutIcon, SettingsIcon } from "lucide-react";

export function InstitucionPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">DEL MARCO</p>
          <Button variant={"outline"} className="rounded-full w-12 h-12 p-0">
            <HospitalIcon />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0">
        <div className="p-2">
          <p className="capitalize font-semibold">Sanatorio Delmarco</p>
          <p className="text-slate-600 text-[12px]">
            sanatoriodelmarco@gmail.com
          </p>
        </div>
        <Separator />

        <ul className="p-2 text-sm space-y-1 font-semibold">
          <li className="flex justify-between items-center">
            <p>Profesionales</p>
            <strong>25</strong>
          </li>
          <li className="flex justify-between items-center">
            <p>Guardias Pendientes</p>
            <strong>15</strong>
          </li>
          <li className="flex justify-between items-center">
            <p>ausencias</p>
            <strong>3</strong>
          </li>
        </ul>
        <Separator />

        <Button
          variant={"ghost"}
          className="w-full border-none focus:border-none flex justify-between items-center font-semibold text-slate-700"
        >
          <span>Configuración</span>
          <SettingsIcon className=" ml-2 w-4 h-4" />
        </Button>
        <Button
          variant={"ghost"}
          className="w-full border-none focus:border-none flex justify-between items-center font-semibold text-slate-700"
        >
          <span>Cerrar Sesión</span>
          <LogOutIcon className=" ml-2 w-4 h-4" />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
