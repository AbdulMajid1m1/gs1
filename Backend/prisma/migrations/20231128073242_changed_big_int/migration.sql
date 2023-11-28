/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'users'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_users] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_type] VARCHAR(20),
    [slug] NVARCHAR(max),
    [location_uk] NVARCHAR(max),
    [have_cr] NVARCHAR(max),
    [cr_documentID] INT,
    [document_number] NVARCHAR(max),
    [fname] NVARCHAR(max),
    [lname] NVARCHAR(max),
    [email] NVARCHAR(max),
    [mobile] NVARCHAR(max),
    [image] NVARCHAR(max),
    [address] NVARCHAR(max),
    [address1] NVARCHAR(max),
    [address2] NVARCHAR(max),
    [po_box] NVARCHAR(max),
    [mbl_extension] NVARCHAR(max),
    [website] NVARCHAR(max),
    [no_of_staff] NVARCHAR(max),
    [companyID] NVARCHAR(max),
    [district] NVARCHAR(max),
    [building_no] NVARCHAR(max),
    [additional_number] NVARCHAR(max),
    [other_landline] NVARCHAR(max),
    [unit_number] NVARCHAR(max),
    [qr_corde] NVARCHAR(max),
    [email_verified_at] DATETIME,
    [password] NVARCHAR(max),
    [code] VARCHAR(50),
    [verification_code] INT,
    [cr_number] NVARCHAR(max),
    [cr_activity] NVARCHAR(max),
    [company_name_eng] NVARCHAR(max),
    [company_name_arabic] NVARCHAR(max),
    [bussiness_activity] NVARCHAR(max),
    [membership_type] NVARCHAR(max),
    [member_category] NVARCHAR(50),
    [other_products] NVARCHAR(max),
    [gpc] NVARCHAR(max),
    [product_addons] NVARCHAR(max),
    [total] FLOAT(53),
    [contactPerson] NVARCHAR(max),
    [companyLandLine] NVARCHAR(max),
    [documents] NVARCHAR(max),
    [address_image] NVARCHAR(max),
    [status] VARCHAR(10) CONSTRAINT [DF_users_status] DEFAULT 'inactive',
    [payment_type] NVARCHAR(max),
    [payment_status] INT,
    [online_payment] NVARCHAR(max),
    [remember_token] NVARCHAR(max),
    [parent_memberID] INT,
    [member_type] VARCHAR(50),
    [invoice_file] NVARCHAR(max),
    [otp_status] INT,
    [transaction_id] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [gcpGLNID] VARCHAR(50),
    [gln] NVARCHAR(50),
    [gcp_type] VARCHAR(50),
    [deleted_at] DATETIME,
    [gcp_expiry] DATETIME,
    [memberID] NVARCHAR(max),
    [user_id] NVARCHAR(max),
    [remarks] NVARCHAR(max),
    [assign_to] INT CONSTRAINT [DF_users_assign_to] DEFAULT 0,
    [membership_category] NVARCHAR(50),
    [upgradation_disc] INT CONSTRAINT [DF_users_upgradation_disc] DEFAULT 0,
    [upgradation_disc_amount] FLOAT(53) CONSTRAINT [DF_users_upgradation_disc_amount] DEFAULT 0,
    [renewal_disc] INT CONSTRAINT [DF_users_renewal_disc] DEFAULT 0,
    [renewal_disc_amount] FLOAT(53) CONSTRAINT [DF_users_renewal_disc_amount] DEFAULT 0,
    [membership_otherCategory] NVARCHAR(50),
    [activityID] INT CONSTRAINT [DF_users_activityID] DEFAULT 0,
    [registration_type] NCHAR(10),
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[users])
    EXEC('INSERT INTO [dbo].[_prisma_new_users] ([activityID],[additional_number],[address],[address1],[address2],[address_image],[assign_to],[building_no],[bussiness_activity],[code],[companyID],[companyLandLine],[company_name_arabic],[company_name_eng],[contactPerson],[cr_activity],[cr_documentID],[cr_number],[created_at],[deleted_at],[district],[document_number],[documents],[email],[email_verified_at],[fname],[gcpGLNID],[gcp_expiry],[gcp_type],[gln],[gpc],[have_cr],[id],[image],[invoice_file],[lname],[location_uk],[mbl_extension],[memberID],[member_category],[member_type],[membership_category],[membership_otherCategory],[membership_type],[mobile],[no_of_staff],[online_payment],[other_landline],[other_products],[otp_status],[parent_memberID],[password],[payment_status],[payment_type],[po_box],[product_addons],[qr_corde],[registration_type],[remarks],[remember_token],[renewal_disc],[renewal_disc_amount],[slug],[status],[total],[transaction_id],[unit_number],[updated_at],[upgradation_disc],[upgradation_disc_amount],[user_id],[user_type],[verification_code],[website]) SELECT [activityID],[additional_number],[address],[address1],[address2],[address_image],[assign_to],[building_no],[bussiness_activity],[code],[companyID],[companyLandLine],[company_name_arabic],[company_name_eng],[contactPerson],[cr_activity],[cr_documentID],[cr_number],[created_at],[deleted_at],[district],[document_number],[documents],[email],[email_verified_at],[fname],[gcpGLNID],[gcp_expiry],[gcp_type],[gln],[gpc],[have_cr],[id],[image],[invoice_file],[lname],[location_uk],[mbl_extension],[memberID],[member_category],[member_type],[membership_category],[membership_otherCategory],[membership_type],[mobile],[no_of_staff],[online_payment],[other_landline],[other_products],[otp_status],[parent_memberID],[password],[payment_status],[payment_type],[po_box],[product_addons],[qr_corde],[registration_type],[remarks],[remember_token],[renewal_disc],[renewal_disc_amount],[slug],[status],[total],[transaction_id],[unit_number],[updated_at],[upgradation_disc],[upgradation_disc_amount],[user_id],[user_type],[verification_code],[website] FROM [dbo].[users] WITH (holdlock tablockx)');
DROP TABLE [dbo].[users];
EXEC SP_RENAME N'dbo._prisma_new_users', N'users';
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
