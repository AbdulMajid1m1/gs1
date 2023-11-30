/*
  Warnings:

  - The primary key for the `other_products` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'other_products'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_other_products] (
    [id] NVARCHAR(1000) NOT NULL,
    [product_name] NVARCHAR(max),
    [total_no_of_barcodes] FLOAT(53),
    [product_subscription_fee] FLOAT(53),
    [code] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [med_subscription_fee] FLOAT(53),
    [variant] NVARCHAR(10),
    CONSTRAINT [other_products_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[other_products])
    EXEC('INSERT INTO [dbo].[_prisma_new_other_products] ([code],[created_at],[id],[med_subscription_fee],[product_name],[product_subscription_fee],[status],[total_no_of_barcodes],[updated_at],[variant]) SELECT [code],[created_at],[id],[med_subscription_fee],[product_name],[product_subscription_fee],[status],[total_no_of_barcodes],[updated_at],[variant] FROM [dbo].[other_products] WITH (holdlock tablockx)');
DROP TABLE [dbo].[other_products];
EXEC SP_RENAME N'dbo._prisma_new_other_products', N'other_products';
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
