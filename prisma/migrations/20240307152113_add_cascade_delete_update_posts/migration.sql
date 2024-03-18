-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryTitle_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryTitle_fkey" FOREIGN KEY ("categoryTitle") REFERENCES "Category"("title") ON DELETE CASCADE ON UPDATE CASCADE;
