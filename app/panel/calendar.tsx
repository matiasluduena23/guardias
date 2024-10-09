"use client";
import { Guardias } from "@prisma/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { GuardiaPopover } from "./guardia-popover";
import { eventFormat } from "@/lib/utils";

export default function Calendar({ events }: { events: Guardias[] }) {
  const eventFormated = eventFormat(events);
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
        eventContent={GuardiaPopover}
        eventBorderColor=""
      />
    </section>
  );
}
