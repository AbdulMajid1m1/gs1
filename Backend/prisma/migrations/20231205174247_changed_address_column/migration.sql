/*
  Warnings:

  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `address1` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `users` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[users] DROP COLUMN [address],
[address1],
[address2],
[code];
ALTER TABLE [dbo].[users] ADD [city] NVARCHAR(max),
[country] NVARCHAR(max),
[state] NVARCHAR(max),
[zip_code] VARCHAR(50);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
