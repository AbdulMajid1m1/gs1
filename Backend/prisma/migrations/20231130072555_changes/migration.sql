/*
  Warnings:

  - The primary key for the `gtin_products` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'gtin_products'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_gtin_products] (
    [id] NVARCHAR(1000) NOT NULL,
    [member_category_description] NVARCHAR(max),
    [total_no_of_barcodes] INT,
    [member_registration_fee] INT,
    [gtin_yearly_subscription_fee] INT,
    [type] NVARCHAR(max),
    [status] INT,
    [gcp_start_range] VARCHAR(50),
    [quotation] NVARCHAR(max),
    [allow_otherProducts] NVARCHAR(max),
    [gcp_type] VARCHAR(50),
    [gtin_order] NVARCHAR(50),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [member_category_description_ar] NVARCHAR(max),
    [med_registration_fee] FLOAT(53),
    [med_yearly_subscription_fee] FLOAT(53),
    CONSTRAINT [gtin_products_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[gtin_products])
    EXEC('INSERT INTO [dbo].[_prisma_new_gtin_products] ([allow_otherProducts],[created_at],[gcp_start_range],[gcp_type],[gtin_order],[gtin_yearly_subscription_fee],[id],[med_registration_fee],[med_yearly_subscription_fee],[member_category_description],[member_category_description_ar],[member_registration_fee],[quotation],[status],[total_no_of_barcodes],[type],[updated_at]) SELECT [allow_otherProducts],[created_at],[gcp_start_range],[gcp_type],[gtin_order],[gtin_yearly_subscription_fee],[id],[med_registration_fee],[med_yearly_subscription_fee],[member_category_description],[member_category_description_ar],[member_registration_fee],[quotation],[status],[total_no_of_barcodes],[type],[updated_at] FROM [dbo].[gtin_products] WITH (holdlock tablockx)');
DROP TABLE [dbo].[gtin_products];
EXEC SP_RENAME N'dbo._prisma_new_gtin_products', N'gtin_products';
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
