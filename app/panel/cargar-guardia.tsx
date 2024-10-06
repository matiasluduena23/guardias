"use client";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
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
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";

export default function DialogGuardia() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Cargar Guardia</Button>
      </DialogTrigger>
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
  horas: z.coerce.number().gt(2, { message: "Ingrese un numero valido" }),
  inicio: z.date(),
  time: z.string().optional(),
  valor: z.coerce.number().gt(1000, { message: "Ingrese un valor" }),
  profesional: z.string().optional(),
  descripcion: z.string().optional(),
});

export function GuardiaForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sector: "",
      horas: 0,
      time: "00:00",
      valor: 0,
      profesional: "",
      descripcion: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.time) return;
    values.inicio.setHours(Number(values.time?.substring(0, 2)));
    values.inicio.setMinutes(Number(values.time?.substring(3)));

    delete values.time;
    console.log("se envia", values);
    fetch("/cargar", {
      body: JSON.stringify(values),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error in the server");
        return res.json();
      })
      .then((data) => console.log(data));
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
              name="horas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas</FormLabel>
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
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
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
                    <Input type="time" {...field} />
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
                  <FormLabel>Valor $</FormLabel>
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
                  <SelectItem value="Rodrigo Perez">Rodrigo Perez</SelectItem>
                  <SelectItem value="Juan Carilo">Juan Carilo</SelectItem>
                  <SelectItem value="Gustavo Ortega">Gustavo Ortega</SelectItem>
                  <SelectItem value="Pedro Contanti">Pedro Contanti</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detalles a tener en cuenta en la guardia..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Cargar</Button>
      </form>
    </Form>
  );
}
