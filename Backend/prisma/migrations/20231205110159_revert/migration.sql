/*
  Warnings:

  - You are about to drop the `users_temp` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[users] ALTER COLUMN [created_at] DATETIME2 NOT NULL;
ALTER TABLE [dbo].[users] ALTER COLUMN [updated_at] DATETIME2 NOT NULL;
ALTER TABLE [dbo].[users] ADD CONSTRAINT [DF_users_payment_status] DEFAULT 0 FOR [payment_status], CONSTRAINT [users_created_at_df] DEFAULT CURRENT_TIMESTAMP FOR [created_at];

-- DropTable
DROP TABLE [dbo].[users_temp];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
