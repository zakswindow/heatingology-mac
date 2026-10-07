/*
  Warnings:

  - Changed the type of `tag` on the `Text` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HtmlTag" AS ENUM ('PARAGRAPH', 'LIST', 'HEADER', 'NONE');

-- AlterTable
ALTER TABLE "Text" DROP COLUMN "tag",
ADD COLUMN     "tag" "HtmlTag" NOT NULL;

-- DropEnum
DROP TYPE "HTML_TAG";
