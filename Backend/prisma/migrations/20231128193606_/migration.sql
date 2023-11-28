/*
  Warnings:

  - The primary key for the `states` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'states'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_states] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(max),
    [country_id] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [states_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[states])
    EXEC('INSERT INTO [dbo].[_prisma_new_states] ([country_id],[created_at],[id],[name],[updated_at]) SELECT [country_id],[created_at],[id],[name],[updated_at] FROM [dbo].[states] WITH (holdlock tablockx)');
DROP TABLE [dbo].[states];
EXEC SP_RENAME N'dbo._prisma_new_states', N'states';
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
