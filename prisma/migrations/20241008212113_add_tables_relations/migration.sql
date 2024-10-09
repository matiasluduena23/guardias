/*
  Warnings:

  - You are about to drop the `Guardia` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('VACANTE', 'ASIGNADO');

-- CreateEnum
CREATE TYPE "Estado_Solicitud" AS ENUM ('PENDIENTE', 'APROBADA', 'RECHAZADA');

-- DropTable
DROP TABLE "Guardia";

-- CreateTable
CREATE TABLE "Guardias" (
    "id" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "sector" TEXT NOT NULL,
    "horas" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "descripcion" TEXT,
    "estado" "Estado" NOT NULL,
    "medicosId" TEXT
);

-- CreateTable
CREATE TABLE "Medicos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "matricula" INTEGER NOT NULL,
    "especialidad" TEXT NOT NULL,
    "imagen" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Solicitudes" (
    "id" TEXT NOT NULL,
    "estado" "Estado_Solicitud" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medicosId" TEXT,
    "guardiaId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Guardias_id_key" ON "Guardias"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Medicos_id_key" ON "Medicos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Solicitudes_id_key" ON "Solicitudes"("id");

-- AddForeignKey
ALTER TABLE "Guardias" ADD CONSTRAINT "Guardias_medicosId_fkey" FOREIGN KEY ("medicosId") REFERENCES "Medicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitudes" ADD CONSTRAINT "Solicitudes_medicosId_fkey" FOREIGN KEY ("medicosId") REFERENCES "Medicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitudes" ADD CONSTRAINT "Solicitudes_guardiaId_fkey" FOREIGN KEY ("guardiaId") REFERENCES "Guardias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
