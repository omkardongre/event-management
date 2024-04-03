/*
  Warnings:

  - You are about to drop the column `capacity` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Event` table. All the data in the column will be lost.
  - Added the required column `Date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Time` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "capacity",
DROP COLUMN "endDate",
DROP COLUMN "price",
DROP COLUMN "startDate",
ADD COLUMN     "Date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Time" TEXT NOT NULL;
