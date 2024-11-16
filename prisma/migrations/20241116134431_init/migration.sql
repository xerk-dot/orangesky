-- CreateTable
CREATE TABLE "orangesky_bluesky_user" (
    "id" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "displayName" TEXT,
    "bio" TEXT,
    "numOfFollowers" INTEGER NOT NULL DEFAULT 0,
    "numOfFollowing" INTEGER NOT NULL DEFAULT 0,
    "isAnalyzed" BOOLEAN NOT NULL DEFAULT false,
    "isIndividual" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isMale" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orangesky_bluesky_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orangesky_bluesky_user_did_key" ON "orangesky_bluesky_user"("did");
