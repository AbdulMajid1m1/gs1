/*
  Warnings:

  - You are about to drop the column `date` on the `carts` table. All the data in the column will be lost.
  - Made the column `created_at` on table `carts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `carts` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[carts] ALTER COLUMN [created_at] DATETIME2 NOT NULL;
ALTER TABLE [dbo].[carts] ALTER COLUMN [updated_at] DATETIME2 NOT NULL;
ALTER TABLE [dbo].[carts] DROP COLUMN [date];
ALTER TABLE [dbo].[carts] ADD CONSTRAINT [carts_created_at_df] DEFAULT CURRENT_TIMESTAMP FOR [created_at];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
