-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "creator_score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "opponent_score" INTEGER NOT NULL DEFAULT 0;
