/*
  Warnings:

  - You are about to drop the column `dia` on the `Guardia` table. All the data in the column will be lost.
  - Added the required column `inicio` to the `Guardia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guardia" DROP COLUMN "dia",
ADD COLUMN     "inicio" TIMESTAMP(3) NOT NULL;
