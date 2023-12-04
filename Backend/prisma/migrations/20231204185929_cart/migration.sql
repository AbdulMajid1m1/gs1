/*
  Warnings:

  - Made the column `user_id` on table `carts` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[carts] DROP CONSTRAINT [DF_carts_user_id];
ALTER TABLE [dbo].[carts] ALTER COLUMN [user_id] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
