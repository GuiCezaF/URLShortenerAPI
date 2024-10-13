-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "shortenedUrl" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortenedUrl_key" ON "Url"("shortenedUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Url_hash_key" ON "Url"("hash");
