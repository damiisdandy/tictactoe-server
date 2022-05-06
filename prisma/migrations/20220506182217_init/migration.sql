-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "opponent" TEXT,
    "board" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_code_key" ON "Game"("code");
