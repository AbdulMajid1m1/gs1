/*
  Warnings:

  - The primary key for the `country_of_sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `crs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `countries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `states` table will be changed. If it partially fails, the table could be left without primary key constraint.
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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'country_of_sales'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_country_of_sales] (
    [id] NVARCHAR(1000) NOT NULL,
    [Alpha2] NVARCHAR(255) NOT NULL,
    [Alpha3] NVARCHAR(255) NOT NULL,
    [country_code_numeric3] NVARCHAR(255) NOT NULL,
    [country_name] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [country_of_sales_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[country_of_sales])
    EXEC('INSERT INTO [dbo].[_prisma_new_country_of_sales] ([Alpha2],[Alpha3],[country_code_numeric3],[country_name],[created_at],[id],[updated_at]) SELECT [Alpha2],[Alpha3],[country_code_numeric3],[country_name],[created_at],[id],[updated_at] FROM [dbo].[country_of_sales] WITH (holdlock tablockx)');
DROP TABLE [dbo].[country_of_sales];
EXEC SP_RENAME N'dbo._prisma_new_country_of_sales', N'country_of_sales';
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
