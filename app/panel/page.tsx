import React from "react";
import CargarGuardia from "./cargar-guardia";
import Calendar from "./calendar";
import DialogGuardia from "./cargar-guardia";

export default function page() {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <h1>Panel</h1>
        <DialogGuardia />
      </div>
      <Calendar />
    </div>
  );
}
