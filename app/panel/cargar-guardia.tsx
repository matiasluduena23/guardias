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
import { guardiaSchema } from "@/lib/definitions";
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
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <div className="w-3/4">
              <Label>Sector</Label>
              <Select name="sector">
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un sector medico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pediatria">pediatria</SelectItem>
                  <SelectItem value="clinica">clinica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/4">
              <Label>Horas</Label>
              <Input name="horas" placeholder="00" type="number" />
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
            <div className="w-1/4">
              <Label>Valor $</Label>
              <Input name="valor" placeholder="$10000" type="number" />
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

// export function GuardiaForm({
//   open,
//   setOpen,
// }: {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }) {
//   const { mutateAsync } = useMutation({
//     mutationFn: addGuardia,
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       sector: "",
//       horas: 0,
//       time: "00:00",
//       valor: 0,
//       profesional: "",
//       descripcion: "",
//     },
//   });

//   // 2. Define a submit handler.
//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     if (!values.time) return;
//     values.inicio.setHours(Number(values.time?.substring(0, 2)));
//     values.inicio.setMinutes(Number(values.time?.substring(3)));

//     delete values.time;

//     try {
//       const res = await mutateAsync(values);

//       setOpen(false);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <div className="flex items-center gap-2">
//

//         <div className="flex items-center gap-2">
//           <div className="w-2/4">
//             <FormField
//               control={form.control}
//               name="inicio"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col justify-between gap-[6px]">
//                   <FormLabel className="mt-[4px]">Fecha Inicio</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl className="">
//                         <Button
//                           variant={"outline"}
//                           className={cn(
//                             "w-[220px] pl-3  text-left font-normal",
//                             !field.value && "text-muted-foreground"
//                           )}
//                         >
//                           {field.value ? (
//                             format(field.value, "PPP")
//                           ) : (
//                             <span>Seleccione una fecha</span>
//                           )}
//                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         selected={new Date(field.value)}
//                         onSelect={field.onChange}
//                         disabled={(date) => date < new Date()}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="w-1/4">
//             <FormField
//               control={form.control}
//               name="time"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Hora</FormLabel>

//                   <FormControl>
//                     <Input type="time" {...field} />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="w-1/4">
//             <FormField
//               control={form.control}
//               name="valor"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Valor $</FormLabel>
//                   <FormControl>
//                     <Input placeholder="shadcn" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>

//         <FormField
//           control={form.control}
//           name="profesional"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Profesional</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Seleccione un profesional" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Rodrigo Perez">Rodrigo Perez</SelectItem>
//                   <SelectItem value="Juan Carilo">Juan Carilo</SelectItem>
//                   <SelectItem value="Gustavo Ortega">Gustavo Ortega</SelectItem>
//                   <SelectItem value="Pedro Contanti">Pedro Contanti</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormDescription>
//                 *Si deja este campo vacio luego tiene que publicar la guardia.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="descripcion"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Descripcion</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Detalles a tener en cuenta en la guardia..."
//                   className="resize-none"
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Cargar</Button>
//       </form>
//     </Form>
//   );
// }
