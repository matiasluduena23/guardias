"use client";

import { Medicos } from "@prisma/client";
import React, { createContext, ReactNode } from "react";

export default function MedicoProvider({
  children,
  medico,
}: {
  children: ReactNode;
  medico: Medicos;
}) {
  return (
    <MedicoContext.Provider value={medico}>{children}</MedicoContext.Provider>
  );
}

export const MedicoContext = createContext<Medicos | null>(null);
