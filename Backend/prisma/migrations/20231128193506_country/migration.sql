/*
  Warnings:

  - The primary key for the `countries` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'countries'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_countries] (
    [id] NVARCHAR(1000) NOT NULL,
    [name_en] NVARCHAR(max),
    [name_ar] NVARCHAR(max),
    [country_code] NVARCHAR(max),
    [country_shortName] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [countries_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[countries])
    EXEC('INSERT INTO [dbo].[_prisma_new_countries] ([country_code],[country_shortName],[created_at],[id],[name_ar],[name_en],[status],[updated_at]) SELECT [country_code],[country_shortName],[created_at],[id],[name_ar],[name_en],[status],[updated_at] FROM [dbo].[countries] WITH (holdlock tablockx)');
DROP TABLE [dbo].[countries];
EXEC SP_RENAME N'dbo._prisma_new_countries', N'countries';
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
