"use client";
import { Calendar } from "@/components/ui/calendar";
import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";

export default function CargarGuardia() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        onDayClick={() => setOpen(true)}
      />
      <DialogGuardia open={open} setOpen={setOpen} />
    </div>
  );
}

export function DialogGuardia({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nueva Guardia</DialogTitle>
          <DialogDescription>Complete todos los campos</DialogDescription>
        </DialogHeader>
        <GuardiaForm />
      </DialogContent>
    </Dialog>
  );
}

const formSchema = z.object({
  sector: z.string().min(2, {
    message: "Seleccione una option",
  }),
  duracion: z.number().gt(2, { message: "Ingrese un numero valido" }),
  inicio: z.date({
    required_error: "Seleccione una fecha de inicio.",
  }),
  time: z.string().datetime(),
  valor: z.number().gt(1000, { message: "Ingrese un valor" }),
  profesional: z.string().min(2, {
    message: "Seleccione una option",
  }),
});

export function GuardiaForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sector: "",
      duracion: 0,
      time: "00:00",
      valor: 0,
      profesional: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center gap-2">
          <div className="w-3/4">
            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un sector medico" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pediatria">pediatria</SelectItem>
                      <SelectItem value="clinica">clinica</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="duracion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duracion</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2/4">
            <FormField
              control={form.control}
              name="inicio"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between gap-[6px]">
                  <FormLabel className="mt-[4px]">Fecha Inicio</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[220px] pl-3  text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora</FormLabel>

                  <FormControl>
                    <Input placeholder="shadcn" type="time" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="valor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="profesional"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profesional</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un profesional" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Rodrigo Perez</SelectItem>
                  <SelectItem value="2">Juan Carilo</SelectItem>
                  <SelectItem value="3">Gustavo Ortega</SelectItem>
                  <SelectItem value="4">Pedro Contanti</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Cargar</Button>
      </form>
    </Form>
  );
}
