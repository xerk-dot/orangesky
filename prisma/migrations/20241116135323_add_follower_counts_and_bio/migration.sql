/*
  Warnings:

  - You are about to drop the column `isAnalyzed` on the `orangesky_bluesky_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orangesky_bluesky_user" DROP COLUMN "isAnalyzed",
ADD COLUMN     "isFiftyMostRecentFollowAnalyzed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isProfileAnalyzed" BOOLEAN NOT NULL DEFAULT false;
