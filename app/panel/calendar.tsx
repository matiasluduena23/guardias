"use client";
import { Guardia } from "@prisma/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { GuardiaPopover } from "./guardia-popover";
type EventCalendarT = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

export default function Calendar({ events }: { events: Guardia[] }) {
  const eventFormat: EventCalendarT[] = events.map((item) => {
    const endDay = new Date(item.inicio);
    endDay.setHours(item.inicio.getHours() + item.horas);

    return {
      id: item.id,
      title: `${item.profesional ? item.profesional?.split(" ")[1] : ""} ${
        item.sector
      }`,
      start: item.inicio,
      end: endDay,
      extendedProps: {
        profesional: item.profesional,
        sector: item.sector,
        valor: item.valor,
        descripcion: item.descripcion,
        horas: item.horas,
        estado: item.estado,
      },
    };
  });
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
        events={eventFormat}
        eventContent={GuardiaPopover}
        eventBorderColor=""
        // eventClick={(e) => console.log(e)}
        // eventDidMount={(e) =>
        //   console.log(
        //    )
        // }
      />
    </section>
  );
}
