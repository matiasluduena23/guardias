import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Medicos } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { LogOutIcon, SettingsIcon } from "lucide-react";

export function PerfilPopover({ medico }: { medico: Medicos }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-4">
          <p className="font-semibold">Hola {medico.nombre}</p>
          <Avatar className="cursor-pointer">
            <AvatarImage src={medico.imagen} alt={medico.apellido} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0">
        <div className="p-2">
          <p className="capitalize font-semibold">
            {medico.nombre} {medico.apellido}
          </p>
          <p className="text-slate-600 text-[12px]">
            {medico.nombre}
            {medico.apellido}@gmail.com
          </p>
        </div>
        <Separator />

        <ul className="p-2 text-sm space-y-1 font-semibold">
          <li className="flex justify-between items-center">
            <p>Horas Mensuales</p>
            <strong>32</strong>
          </li>
          <li className="flex justify-between items-center">
            <p>Guardias Pendientes</p>
            <strong>0</strong>
          </li>
          <li className="flex justify-between items-center">
            <p>Valor Mensual</p>
            <strong>$460.000</strong>
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
