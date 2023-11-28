/*
  Warnings:

  - The primary key for the `cities` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'cities'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_cities] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(max),
    [state_id] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [cities_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[cities])
    EXEC('INSERT INTO [dbo].[_prisma_new_cities] ([created_at],[id],[name],[state_id],[updated_at]) SELECT [created_at],[id],[name],[state_id],[updated_at] FROM [dbo].[cities] WITH (holdlock tablockx)');
DROP TABLE [dbo].[cities];
EXEC SP_RENAME N'dbo._prisma_new_cities', N'cities';
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
