/*
  Warnings:

  - Made the column `userId` on table `GuestBookEntry` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GuestBookEntry" DROP CONSTRAINT "GuestBookEntry_userId_fkey";

-- AlterTable
ALTER TABLE "GuestBookEntry" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "GuestBookEntry" ADD CONSTRAINT "GuestBookEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
