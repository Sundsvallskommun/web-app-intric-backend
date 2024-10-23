-- CreateTable
CREATE TABLE "UserSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Assistant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "app" TEXT NOT NULL,
    "assistantId" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Assistant_app_key" ON "Assistant"("app");
