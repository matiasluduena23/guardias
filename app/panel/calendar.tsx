"use client";
import { Guardia } from "@prisma/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
type EventCalendarT = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

export default function Calendar({ events }: { events: Guardia[] }) {
  const eventFormat: EventCalendarT[] = events.map((item) => {
    return {
      id: item.id,
      title: `${item.profesional} ${item.sector}`,
      start: item.inicio,
      end: new Date(item.inicio.setHours(item.inicio.getHours() + item.horas)),
    };
  });
  return (
    <section className="max-w-900px">
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
        eventContent={renderEventContent}
        eventDidMount={(e) =>
          console.log(
            e.event.start
              ?.toLocaleDateString("es-AR", { hour: "2-digit" })
              .split(",")[1]
          )
        }
      />
    </section>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div className="flex flex-col justify-start">
      <b>{eventInfo.event._def.title.split(" ")[1]}</b>
      <p>
        Desde
        {
          eventInfo.event.start
            ?.toLocaleDateString("es-AR", { hour: "2-digit" })
            .split(",")[1]
        }
      </p>
    </div>
  );
}
