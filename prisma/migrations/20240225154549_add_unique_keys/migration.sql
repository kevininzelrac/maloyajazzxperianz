/*
  Warnings:

  - A unique constraint covering the columns `[title,type,categoryId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fullName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_title_type_categoryId_key" ON "Post"("title", "type", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "User_fullName_key" ON "User"("fullName");
