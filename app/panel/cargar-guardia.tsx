"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
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

export default function DialogGuardia() {
  const [state, formAction] = useFormState(addGuardia, { message: "" });
  const [open, setOpen] = useState(false);
  const [date, setDate] = React.useState<Date>(new Date());

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("inicio", date.toString());
    formAction(formData);
  };

  useEffect(() => {
    if (state.message === "guardia Added") {
      toast({
        title: "Guardia agregada",
        description: date.toLocaleDateString("es-AR", {
          dateStyle: "full",
        }),
      });
      setOpen(false);
    }
  }, [state]);

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
          <div className="flex items-center gap-2">
            <div className="w-2/4">
              <Label>Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Elegir fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(e) => e !== undefined && setDate(e)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-1/4">
              <Label>Hora</Label>
              <Input name="time" defaultValue={"00:00"} type="time" />
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
          <div>
            <Label>Profesional</Label>
            <Select name="profesional">
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un profesional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rodrigo Perez">Rodrigo Perez</SelectItem>
                <SelectItem value="Juan Carilo">Juan Carilo</SelectItem>
                <SelectItem value="Gustavo Ortega">Gustavo Ortega</SelectItem>
                <SelectItem value="Pedro Contanti">Pedro Contanti</SelectItem>
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
