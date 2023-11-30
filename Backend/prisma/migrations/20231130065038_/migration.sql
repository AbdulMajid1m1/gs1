/*
  Warnings:

  - The primary key for the `gtin_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `gtin_subcriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'gtin_subcriptions'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_gtin_subcriptions] (
    [id] NVARCHAR(1000) NOT NULL,
    [react_no] INT,
    [transaction_id] INT,
    [pkg_id] INT,
    [pkg_date] DATETIME,
    [price] FLOAT(53),
    [request_type] NVARCHAR(max),
    [status] VARCHAR(10) CONSTRAINT [DF_gtin_subcriptions_status] DEFAULT 'inactive',
    [user_id] INT CONSTRAINT [DF_gtin_subcriptions_user_id] DEFAULT 0,
    [createdBy] INT CONSTRAINT [DF_gtin_subcriptions_createdBy] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    [expiry_date] DATETIME,
    CONSTRAINT [gtin_subcriptions_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[gtin_subcriptions])
    EXEC('INSERT INTO [dbo].[_prisma_new_gtin_subcriptions] ([createdBy],[created_at],[deleted_at],[expiry_date],[id],[pkg_date],[pkg_id],[price],[react_no],[request_type],[status],[transaction_id],[updated_at],[user_id]) SELECT [createdBy],[created_at],[deleted_at],[expiry_date],[id],[pkg_date],[pkg_id],[price],[react_no],[request_type],[status],[transaction_id],[updated_at],[user_id] FROM [dbo].[gtin_subcriptions] WITH (holdlock tablockx)');
DROP TABLE [dbo].[gtin_subcriptions];
EXEC SP_RENAME N'dbo._prisma_new_gtin_subcriptions', N'gtin_subcriptions';
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
