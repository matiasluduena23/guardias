"use client";

import { Guardias, Solicitudes, Medicos } from "@prisma/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { confimarSolicitud } from "@/lib/actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function CardSolicitud({ guardia }: { guardia: any }) {
  const [horaHasta, setHoraHasta] = useState();
  return (
    <div className="max-w-[600px] mx-auto">
      <Card className="p-8">
        <CardHeader className="text-center">
          <CardTitle className="capitalize text-2xl ">
            {guardia.sector}
          </CardTitle>
          <CardDescription className="flex flex-col gap-1 ">
            <span>
              Desde: {format(guardia.inicio, "PPP - HH:mm", { locale: es })}
            </span>
            <span>
              Hasta:{" "}
              {format(
                guardia.inicio.setHours(
                  guardia.inicio.getHours() + guardia.horas
                ),
                "PPP - HH:mm",
                { locale: es }
              )}
            </span>
          </CardDescription>

          <strong>Valor: {guardia.valor}</strong>
        </CardHeader>

        <CardContent>
          {guardia?.Solicitudes.map((item: any) => (
            <Card className="border p-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Image
                  src={item.Medicos?.imagen!}
                  alt={item.Medicos?.apellido!}
                  width={30}
                  height={30}
                  className="rounded-full object-cover"
                />
                <p>
                  <b>Dr/a.</b> {item.Medicos?.nombre} {item.Medicos?.apellido}{" "}
                </p>
              </div>
              <Button onClick={async () => confimarSolicitud(item.id)}>
                Aceptar Solicitud
              </Button>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
