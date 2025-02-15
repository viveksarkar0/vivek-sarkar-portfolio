-- DropForeignKey
ALTER TABLE "GuestBookEntry" DROP CONSTRAINT "GuestBookEntry_userId_fkey";

-- AlterTable
ALTER TABLE "GuestBookEntry" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "GuestBookEntry" ADD CONSTRAINT "GuestBookEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
