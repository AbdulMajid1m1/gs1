/*
  Warnings:

  - The primary key for the `crs` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
BEGIN TRY

BEGIN TRAN;

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'crs'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_crs] (
    [id] NVARCHAR(1000) NOT NULL,
    [cr] NVARCHAR(max),
    [activity] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [crs_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[crs])
    EXEC('INSERT INTO [dbo].[_prisma_new_crs] ([activity],[cr],[created_at],[id],[status],[updated_at]) SELECT [activity],[cr],[created_at],[id],[status],[updated_at] FROM [dbo].[crs] WITH (holdlock tablockx)');
DROP TABLE [dbo].[crs];
EXEC SP_RENAME N'dbo._prisma_new_crs', N'crs';
COMMIT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
