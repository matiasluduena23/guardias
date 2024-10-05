-- CreateTable
CREATE TABLE "Guardia" (
    "id" TEXT NOT NULL,
    "dia" TIMESTAMP(3) NOT NULL,
    "sector" TEXT NOT NULL,
    "profesional" TEXT,
    "horas" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "descripcion" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Guardia_id_key" ON "Guardia"("id");
