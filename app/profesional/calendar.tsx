"use client";
import { Guardias, Medicos, Solicitudes } from "@prisma/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { eventFormatMedico } from "@/lib/utils";
import { ProfesionalPopover } from "./profesional-popover";
import { MedicoContext } from "../context/MedicoProvider";
import { useContext } from "react";

export default function Calendar({
  events,
  solicitudes,
}: {
  events: Guardias[];
  solicitudes: Solicitudes[];
}) {
  const medico = useContext(MedicoContext) as Medicos;
  const eventFormated = eventFormatMedico(events, medico, solicitudes);
  return (
    <section className="w-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        views={{
          dayGridMonth: {
            fixedWeekCount: false,
          },
        }}
        headerToolbar={{
          start: "", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "prev,next", // will normally be on the right. if RTL, will be on the left
        }}
        weekends={true}
        locale={"es"}
        events={eventFormated}
        eventContent={ProfesionalPopover}
        eventBorderColor=""
      />
    </section>
  );
}
