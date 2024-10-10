"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { FormEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addGuardia } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { Medicos } from "@prisma/client";
import Image from "next/image";
import { TimePicker } from "@/components/ui/time-picker";

export default function DialogGuardia({ medicos }: { medicos: Medicos[] }) {
  const [state, formAction] = useFormState(addGuardia, { message: "" });
  const [open, setOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (date) formData.set("inicio", date.toString());
    formAction(formData);
  };

  useEffect(() => {
    if (state.message === "guardia Added") {
      toast({
        title: "Guardia agregada",
        description: format(date!, "PPP - HH:mm", { locale: es }),
      });
      setOpen(false);
    }
  }, [state, date]);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>Cargar Guardia</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nueva Guardia</DialogTitle>
          <DialogDescription>Complete todos los campos</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <div className="w-3/4 relative">
              <Label>Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                      state.error?.fieldErrors.inicio && "border-rose-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP - HH:mm", { locale: es })
                    ) : (
                      <span>Elegir fecha y hora de inicio</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(e) => e !== undefined && setDate(e)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={`${
                      state.error?.fieldErrors.inicio ? "border-rose-500" : ""
                    }`}
                  />
                  <div className="p-3 border-t border-border">
                    <TimePicker setDate={setDate} date={date} />
                  </div>
                </PopoverContent>
              </Popover>
              {state.error?.fieldErrors.inicio && (
                <>
                  {state.error.fieldErrors.inicio.map((err, index) => (
                    <span
                      key={index}
                      className="text-rose-500 text-[12px] absolute -bottom-4 left-0"
                    >
                      {err}
                    </span>
                  ))}
                </>
              )}
            </div>

            <div className="w-1/4 relative">
              <Label>Valor $</Label>
              <Input
                name="valor"
                placeholder="$10000"
                type="number"
                className={`${
                  state.error?.fieldErrors.horas ? "border-rose-500" : ""
                }`}
              />
              {state.error?.fieldErrors.valor && (
                <>
                  {state.error.fieldErrors.valor.map((err, index) => (
                    <span
                      key={index}
                      className="text-rose-500 text-[12px] absolute -bottom-4 left-0"
                    >
                      {err}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 relative">
            <div className="w-3/4">
              <Label>Sector</Label>
              <Select name="sector">
                <SelectTrigger
                  className={`${
                    state.error?.fieldErrors.sector ? "border-rose-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Seleccione un sector medico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pediatria">pediatria</SelectItem>
                  <SelectItem value="clinica">clinica</SelectItem>
                </SelectContent>
              </Select>
              {state.error?.fieldErrors.sector && (
                <>
                  {state.error.fieldErrors.sector.map((err, index) => (
                    <span
                      key={index}
                      className="text-rose-500 text-[12px] absolute -bottom-4 left-0"
                    >
                      {err}
                    </span>
                  ))}
                </>
              )}
            </div>
            <div className="w-1/4 relative">
              <Label>Horas</Label>
              <Input
                name="horas"
                placeholder="00"
                type="number"
                className={`${
                  state.error?.fieldErrors.horas ? "border-rose-500" : ""
                }`}
              />
              {state.error?.fieldErrors.horas && (
                <>
                  {state.error.fieldErrors.horas.map((err, index) => (
                    <span
                      key={index}
                      className="text-rose-500 text-[12px] absolute -bottom-4 left-0"
                    >
                      {err}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>

          <div>
            <Label>Profesional</Label>
            <Select name="medicosId">
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un profesional" />
              </SelectTrigger>
              <SelectContent>
                {medicos.map((medico) => (
                  <SelectItem key={medico.id} value={medico.id}>
                    <div className="flex items-center gap-4">
                      <Image
                        src={medico.imagen}
                        alt={medico.apellido}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <span>
                        {medico.nombre} {medico.apellido}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Descripcion</Label>
            <Textarea
              placeholder="Detalles a tener en cuenta en la guardia..."
              name="descripcion"
              className="resize-none"
            />
          </div>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      Cargar
    </Button>
  );
}
