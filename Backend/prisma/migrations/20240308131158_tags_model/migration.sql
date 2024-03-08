/*
  Warnings:

  - You are about to drop the column `count` on the `my_downloads` table. All the data in the column will be lost.
  - You are about to drop the column `ids` on the `my_downloads` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `my_downloads` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `my_downloads` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skipped_barcodes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tblProducstInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `udiGLNIDEvents` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `cr_documents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `g_c_p_information` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `countries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `upcoming_events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `other_products_subcriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `other_date` on the `other_products_subcriptions` table. All the data in the column will be lost.
  - You are about to drop the column `prod_limit_increment` on the `other_products_subcriptions` table. All the data in the column will be lost.
  - The primary key for the `other_products_subscription_histories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `add_member_sscc_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `other_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `mega_menu_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `product_packagings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `barcode_type` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `psource` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `products` table. All the data in the column will be lost.
  - The primary key for the `help_desks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `hs_codes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_guide_pdfs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_guide_videos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `featured_articales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `partners` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `brands` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `footer_menus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `states` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `gtin_subcriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pkg_date` on the `gtin_subcriptions` table. All the data in the column will be lost.
  - The primary key for the `admins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `group_id` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `remember_token` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `verification_code` on the `admins` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `admins` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Int`.
  - The primary key for the `board_members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `faq_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `help_desk_comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `carts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `file_path` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `payment_status` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `carts` table. All the data in the column will be lost.
  - The primary key for the `member_documents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `admin_id` on the `member_documents` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `member_documents` table. All the data in the column will be lost.
  - The primary key for the `member_history_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `member_history_logs` table. All the data in the column will be lost.
  - You are about to drop the column `member_id` on the `member_history_logs` table. All the data in the column will be lost.
  - The primary key for the `sliders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `member_other_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `gtin_helper_reports` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `bank_slips` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `cities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `units` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `unspscs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `our_teams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `prod_desc_languages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `gtin_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `product_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `address1` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `licence_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `licence_no` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `member_registration_type` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `membership_type` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `renewal_invitation` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `renewal_process_by` on the `users` table. All the data in the column will be lost.
  - The primary key for the `gcp_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `featured_services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `country_of_sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `foreign_gtins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `add_member_gln_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `admin_id` on the `add_member_gln_products` table. The data in that column could be lost. The data in that column will be cast from `Int` to `String`.
  - The primary key for the `crs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `gtin_subscription_histories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `mega_menus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `MembershipRangeID` to the `membership_ranges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MigratedUserID` to the `migrated_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PasswordResetID` to the `password_resets` table without a default value. This is not possible if the table is not empty.
  - Made the column `BlogCommentID` on table `blog_comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `cr_documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `g_c_p_information` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `countries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_id` on table `other_products_subcriptions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transaction_id` on table `other_products_subcriptions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `other_products_subcriptions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_id` on table `other_products_subscription_histories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transaction_id` on table `other_products_subscription_histories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `other_products_subscription_histories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `add_member_sscc_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `other_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parent_id` on table `mega_menu_categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `hs_codes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `brands` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parent_id` on table `footer_menus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pkg_id` on table `gtin_subcriptions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `admins` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `carts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `carts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `member_documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `gtin_helper_reports` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `bank_slips` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `units` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `unspscs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `gcp_types` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `country_of_sales` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `foreign_gtins` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `add_member_gln_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pkg_id` on table `gtin_subscription_histories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `gtin_subscription_histories` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[membership_ranges] ADD CONSTRAINT PK__membersh__41FFC3EC023AEE6F PRIMARY KEY CLUSTERED ([MembershipRangeID]);
ALTER TABLE [dbo].[membership_ranges] ADD [MembershipRangeID] INT NOT NULL IDENTITY(1,1);

-- AlterTable
ALTER TABLE [dbo].[migrated_users] ADD CONSTRAINT PK__migrated__3BAC2519CAF02728 PRIMARY KEY CLUSTERED ([MigratedUserID]);
ALTER TABLE [dbo].[migrated_users] ADD [MigratedUserID] INT NOT NULL IDENTITY(1,1);

-- AlterTable
EXEC SP_RENAME N'dbo.PK__my_downl__3213E83F02EE6458', N'PK_my_downloads';
ALTER TABLE [dbo].[my_downloads] ALTER COLUMN [date] NVARCHAR(255) NULL;
ALTER TABLE [dbo].[my_downloads] ALTER COLUMN [document] NVARCHAR(max) NULL;
ALTER TABLE [dbo].[my_downloads] ALTER COLUMN [user_id] INT NULL;
ALTER TABLE [dbo].[my_downloads] ALTER COLUMN [admin_id] INT NULL;
ALTER TABLE [dbo].[my_downloads] DROP COLUMN [count],
[ids],
[time],
[type];

-- AlterTable
ALTER TABLE [dbo].[password_resets] ADD CONSTRAINT PK__password__2CA0AE7C0D4E1ECB PRIMARY KEY CLUSTERED ([PasswordResetID]);
ALTER TABLE [dbo].[password_resets] ADD [PasswordResetID] INT NOT NULL IDENTITY(1,1);

-- DropTable
DROP TABLE [dbo].[categories];

-- DropTable
DROP TABLE [dbo].[jobs];

-- DropTable
DROP TABLE [dbo].[skipped_barcodes];

-- DropTable
DROP TABLE [dbo].[tblProducstInfo];

-- DropTable
DROP TABLE [dbo].[udiGLNIDEvents];

-- CreateTable
CREATE TABLE [dbo].[admin_test] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [created_at] DATETIME2 CONSTRAINT [admin_test_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    CONSTRAINT [admin_test_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Role_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Permission] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Permission_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AdminRole] (
    [adminId] NVARCHAR(1000) NOT NULL,
    [roleId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [AdminRole_pkey] PRIMARY KEY CLUSTERED ([adminId],[roleId])
);

-- CreateTable
CREATE TABLE [dbo].[RolePermission] (
    [roleId] NVARCHAR(1000) NOT NULL,
    [permissionId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [RolePermission_pkey] PRIMARY KEY CLUSTERED ([roleId],[permissionId])
);

-- CreateTable
CREATE TABLE [dbo].[rejected_carts] (
    [id] NVARCHAR(1000) NOT NULL,
    [transaction_id] NVARCHAR(1000),
    [cart_items] NVARCHAR(max),
    [total] FLOAT(53),
    [documents] NVARCHAR(max),
    [request_type] NVARCHAR(max),
    [payment_type] NVARCHAR(max),
    [user_id] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [rejected_carts_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME,
    [reject_reason] TEXT,
    [reject_by] INT,
    [receipt] TEXT,
    [receipt_path] NVARCHAR(max),
    [admin_id] INT CONSTRAINT [DF_rejected_carts_admin_id] DEFAULT 0,
    [assign_to] INT CONSTRAINT [DF_rejected_carts_assign_to] DEFAULT 0,
    [discount] FLOAT(53) CONSTRAINT [DF_rejected_carts_discount] DEFAULT 0,
    CONSTRAINT [rejected_carts_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[product_categroies] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(max),
    [name_ar] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [product_categroies_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [product_categroies_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[emailsetting] (
    [id] NVARCHAR(1000) NOT NULL,
    [emailfrom] NVARCHAR(max),
    [emailmethod] NVARCHAR(max),
    [smtp_host] NVARCHAR(max),
    [smtp_username] NVARCHAR(max),
    [smtp_password] NVARCHAR(max),
    [smtp_port] NVARCHAR(max),
    [smtp_encryption] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [emailsetting_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [emailsetting_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [emailsetting_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[admin_history_logs] (
    [id] NVARCHAR(1000) NOT NULL,
    [subject] NVARCHAR(255) NOT NULL,
    [admin_id] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME CONSTRAINT [admin_history_logs_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    [user_id] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [admin_history_logs_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TagTest] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [TagTest_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[rejected_users] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_type] VARCHAR(20),
    [slug] NVARCHAR(max),
    [location_uk] NVARCHAR(max),
    [have_cr] NVARCHAR(max),
    [cr_documentID] NVARCHAR(100),
    [document_number] NVARCHAR(max),
    [fname] NVARCHAR(max),
    [lname] NVARCHAR(max),
    [email] NVARCHAR(max),
    [mobile] NVARCHAR(max),
    [image] NVARCHAR(max),
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
    [verification_code] INT,
    [cr_number] NVARCHAR(max),
    [cr_activity] NVARCHAR(max),
    [company_name_eng] NVARCHAR(max),
    [company_name_arabic] NVARCHAR(max),
    [bussiness_activity] NVARCHAR(max),
    [member_category] NVARCHAR(50),
    [other_products] NVARCHAR(max),
    [gpc] NVARCHAR(max),
    [product_addons] NVARCHAR(max),
    [total] FLOAT(53),
    [contactPerson] NVARCHAR(max),
    [companyLandLine] NVARCHAR(max),
    [documents] NVARCHAR(max),
    [address_image] NVARCHAR(max),
    [status] VARCHAR(10) CONSTRAINT [DF_rejected_users_status] DEFAULT 'inactive',
    [is_login] INT CONSTRAINT [DF_rejected_users_is_login] DEFAULT 0,
    [payment_type] NVARCHAR(max),
    [payment_status] INT CONSTRAINT [DF_rejected_users_payment_status] DEFAULT 0,
    [online_payment] NVARCHAR(max),
    [remember_token] NVARCHAR(max),
    [parent_memberID] NVARCHAR(1000) CONSTRAINT [DF_rejected_users_member_id] DEFAULT '0',
    [industryTypes] NVARCHAR(max),
    [invoice_file] NVARCHAR(max),
    [otp_status] INT,
    [transaction_id] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [rejected_users_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [gcpGLNID] VARCHAR(50),
    [gln] NVARCHAR(50),
    [gcp_type] VARCHAR(50),
    [deleted_at] DATETIME,
    [gcp_expiry] DATETIME,
    [memberID] NVARCHAR(max),
    [user_id] NVARCHAR(max),
    [remarks] NVARCHAR(max) CONSTRAINT [DF_rejected_users_remarks] DEFAULT 'Pending Invoice',
    [assign_to] INT CONSTRAINT [DF_rejected_users_to] DEFAULT 0,
    [membership_category] NVARCHAR(50),
    [membership_category_id] NVARCHAR(1000),
    [upgradation_disc] INT CONSTRAINT [DF_rejected_rejected_users_disc] DEFAULT 0,
    [upgradation_disc_amount] FLOAT(53) CONSTRAINT [DF_rejected_rejected_users_amount] DEFAULT 0,
    [renewal_disc] INT CONSTRAINT [DF_rejected_users_disc] DEFAULT 0,
    [renewal_disc_amount] FLOAT(53) CONSTRAINT [DF_rejected_users_renewal_disc_amount] DEFAULT 0,
    [membership_otherCategory] NVARCHAR(50),
    [activityID] INT CONSTRAINT [DF_rejected_users_activityID] DEFAULT 0,
    [registration_type] NCHAR(10),
    [city] NVARCHAR(max),
    [country] NVARCHAR(max),
    [state] NVARCHAR(max),
    [zip_code] VARCHAR(50),
    [old_member_recheck] INT CONSTRAINT [DF_rejected_users_old_member_recheck] DEFAULT 0,
    [isproductApproved] INT CONSTRAINT [DF_rejected_users_isproductApproved] DEFAULT 0,
    [pending_invoices] VARCHAR(50) NOT NULL CONSTRAINT [DF_rejected_users_for_approval] DEFAULT 'for_review',
    [reject_reason] NVARCHAR(max),
    CONSTRAINT [rejected_users_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[document_type] (
    [id] NVARCHAR(1000) NOT NULL,
    [file_name] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [document_type_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME,
    CONSTRAINT [document_type_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gtin_upgrade_pricing] (
    [id] NVARCHAR(1000) NOT NULL,
    [total_no_of_barcodes] FLOAT(53),
    [price] FLOAT(53),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [gtin_upgrade_pricing_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [gtin_upgrade_pricing_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[upgrade_member_ship_cart] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [gtin_product_id] NVARCHAR(1000),
    [transaction_id] NVARCHAR(1000) NOT NULL,
    [status] INT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [upgrade_member_ship_cart_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [registered_product_transaction_id] NVARCHAR(1000) NOT NULL,
    [cart] NVARCHAR(1000),
    CONSTRAINT [upgrade_member_ship_cart_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gln_upgrade_pricing] (
    [id] NVARCHAR(1000) NOT NULL,
    [total_no_of_gln] FLOAT(53),
    [price] FLOAT(53),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [gln_upgrade_pricing_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [gln_upgrade_pricing_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[add_gln_cart] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [new_gln_id] NVARCHAR(1000) NOT NULL,
    [other_products_subscription_id] NVARCHAR(1000) NOT NULL,
    [transaction_id] NVARCHAR(1000) NOT NULL,
    [registered_product_transaction_id] NVARCHAR(1000) NOT NULL,
    [status] INT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [add_gln_cart_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [cart] NVARCHAR(1000),
    CONSTRAINT [add_gln_cart_pkey] PRIMARY KEY CLUSTERED ([id])
);

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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'blog_comments'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_blog_comments] (
    [id] BIGINT,
    [blog_id] FLOAT(53),
    [name] NVARCHAR(max),
    [email] NVARCHAR(max),
    [phone] NVARCHAR(max),
    [comment] NVARCHAR(max),
    [disabled] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [BlogCommentID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__blog_com__5F60E1F1D7D1BF0B] PRIMARY KEY CLUSTERED ([BlogCommentID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_blog_comments] ON;
IF EXISTS(SELECT * FROM [dbo].[blog_comments])
    EXEC('INSERT INTO [dbo].[_prisma_new_blog_comments] ([BlogCommentID],[blog_id],[comment],[created_at],[disabled],[email],[id],[name],[phone],[updated_at]) SELECT [BlogCommentID],[blog_id],[comment],[created_at],[disabled],[email],[id],[name],[phone],[updated_at] FROM [dbo].[blog_comments] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_blog_comments] OFF;
DROP TABLE [dbo].[blog_comments];
EXEC SP_RENAME N'dbo._prisma_new_blog_comments', N'blog_comments';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'bricks'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_bricks] (
    [id] FLOAT(53),
    [bricks_code] NVARCHAR(max),
    [bricks_title] NVARCHAR(max),
    [bricks_definition_includes] NVARCHAR(max),
    [bricks_definition_excludes] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [BrickID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__bricks__D0B87DC087EC0CFA] PRIMARY KEY CLUSTERED ([BrickID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_bricks] ON;
IF EXISTS(SELECT * FROM [dbo].[bricks])
    EXEC('INSERT INTO [dbo].[_prisma_new_bricks] ([BrickID],[bricks_code],[bricks_definition_excludes],[bricks_definition_includes],[bricks_title],[created_at],[id],[updated_at]) SELECT [BrickID],[bricks_code],[bricks_definition_excludes],[bricks_definition_includes],[bricks_title],[created_at],[id],[updated_at] FROM [dbo].[bricks] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_bricks] OFF;
DROP TABLE [dbo].[bricks];
EXEC SP_RENAME N'dbo._prisma_new_bricks', N'bricks';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'cr_documents'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_cr_documents] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [cr_documents_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [cr_documents_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[cr_documents])
    EXEC('INSERT INTO [dbo].[_prisma_new_cr_documents] ([created_at],[id],[name],[status],[updated_at]) SELECT [created_at],[id],[name],[status],[updated_at] FROM [dbo].[cr_documents] WITH (holdlock tablockx)');
DROP TABLE [dbo].[cr_documents];
EXEC SP_RENAME N'dbo._prisma_new_cr_documents', N'cr_documents';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'attribute_values'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_attribute_values] (
    [id] FLOAT(53),
    [attributes_value_code] NVARCHAR(max),
    [attributes_value_title] NVARCHAR(max),
    [attributes_value_definition] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [AttributeValueID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__attribut__335E22569F6BC69D] PRIMARY KEY CLUSTERED ([AttributeValueID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_attribute_values] ON;
IF EXISTS(SELECT * FROM [dbo].[attribute_values])
    EXEC('INSERT INTO [dbo].[_prisma_new_attribute_values] ([AttributeValueID],[attributes_value_code],[attributes_value_definition],[attributes_value_title],[created_at],[id],[updated_at]) SELECT [AttributeValueID],[attributes_value_code],[attributes_value_definition],[attributes_value_title],[created_at],[id],[updated_at] FROM [dbo].[attribute_values] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_attribute_values] OFF;
DROP TABLE [dbo].[attribute_values];
EXEC SP_RENAME N'dbo._prisma_new_attribute_values', N'attribute_values';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'g_c_p_information'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_g_c_p_information] (
    [id] NVARCHAR(1000) NOT NULL,
    [gtin_order] VARCHAR(50),
    [company_gcp] VARCHAR(50),
    [gcp_type] NVARCHAR(max),
    [status] VARCHAR(10) CONSTRAINT [DF_g_c_p_information_status] DEFAULT 'active',
    [company_name] NVARCHAR(max),
    [issuer_gln] VARCHAR(255),
    [licensee_gln] NVARCHAR(max),
    [type_pk] NVARCHAR(max),
    [key_pk] NVARCHAR(max),
    [cgs1_prefix] NVARCHAR(max),
    [user_id] NVARCHAR(1000),
    [certificate] NVARCHAR(max),
    [certificate_ar] NVARCHAR(max),
    [receipt] NVARCHAR(max),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [g_c_p_information_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME,
    [gepirPosted] NCHAR(10) CONSTRAINT [DF_g_c_p_information_gepirPosted] DEFAULT '0',
    [updateable] NCHAR(1) CONSTRAINT [DF_g_c_p_information_updateable] DEFAULT '0',
    CONSTRAINT [g_c_p_information_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[g_c_p_information])
    EXEC('INSERT INTO [dbo].[_prisma_new_g_c_p_information] ([certificate],[certificate_ar],[cgs1_prefix],[company_gcp],[company_name],[created_at],[deleted_at],[gcp_type],[gepirPosted],[gtin_order],[id],[issuer_gln],[key_pk],[licensee_gln],[receipt],[status],[type_pk],[updateable],[updated_at],[user_id]) SELECT [certificate],[certificate_ar],[cgs1_prefix],[company_gcp],[company_name],[created_at],[deleted_at],[gcp_type],[gepirPosted],[gtin_order],[id],[issuer_gln],[key_pk],[licensee_gln],[receipt],[status],[type_pk],[updateable],[updated_at],[user_id] FROM [dbo].[g_c_p_information] WITH (holdlock tablockx)');
DROP TABLE [dbo].[g_c_p_information];
EXEC SP_RENAME N'dbo._prisma_new_g_c_p_information', N'g_c_p_information';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'locations'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_locations] (
    [id] FLOAT(53),
    [user_id] FLOAT(53),
    [service_id] FLOAT(53),
    [location] NVARCHAR(max),
    [status] FLOAT(53),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [LocationID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__location__E7FEA477E5758800] PRIMARY KEY CLUSTERED ([LocationID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_locations] ON;
IF EXISTS(SELECT * FROM [dbo].[locations])
    EXEC('INSERT INTO [dbo].[_prisma_new_locations] ([LocationID],[created_at],[id],[location],[service_id],[status],[updated_at],[user_id]) SELECT [LocationID],[created_at],[id],[location],[service_id],[status],[updated_at],[user_id] FROM [dbo].[locations] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_locations] OFF;
DROP TABLE [dbo].[locations];
EXEC SP_RENAME N'dbo._prisma_new_locations', N'locations';
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
    [created_at] DATETIME2 NOT NULL CONSTRAINT [countries_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'upcoming_events'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_upcoming_events] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(max),
    [title_ar] NVARCHAR(max),
    [image] NVARCHAR(max),
    [date] NVARCHAR(255),
    [link] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME CONSTRAINT [upcoming_events_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [upcoming_events_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    [video] NVARCHAR(max),
    [display_type] NVARCHAR(max),
    CONSTRAINT [upcoming_events_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[upcoming_events])
    EXEC('INSERT INTO [dbo].[_prisma_new_upcoming_events] ([created_at],[date],[display_type],[id],[image],[link],[status],[title],[title_ar],[updated_at],[video]) SELECT [created_at],[date],[display_type],[id],[image],[link],[status],[title],[title_ar],[updated_at],[video] FROM [dbo].[upcoming_events] WITH (holdlock tablockx)');
DROP TABLE [dbo].[upcoming_events];
EXEC SP_RENAME N'dbo._prisma_new_upcoming_events', N'upcoming_events';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'other_products_subcriptions'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_other_products_subcriptions] (
    [id] NVARCHAR(1000) NOT NULL,
    [react_no] INT,
    [transaction_id] NVARCHAR(1000) NOT NULL,
    [product_id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53),
    [status] VARCHAR(10) CONSTRAINT [DF_other_products_subcriptions_status] DEFAULT 'inactive',
    [user_id] NVARCHAR(255),
    [createdBy] NVARCHAR(255),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [other_products_subcriptions_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME,
    [expiry_date] DATETIME,
    [other_products_subscription_counter] FLOAT(53) NOT NULL CONSTRAINT [other_products_subcriptions_other_products_subscription_counter_df] DEFAULT 0,
    [other_products_subscription_limit] FLOAT(53) NOT NULL CONSTRAINT [other_products_subcriptions_other_products_subscription_limit_df] DEFAULT 0,
    [other_products_subscription_total_price] FLOAT(53) NOT NULL CONSTRAINT [other_products_subcriptions_other_products_subscription_total_price_df] DEFAULT 0,
    [product_identifier_name] NVARCHAR(255),
    [isDeleted] BIT CONSTRAINT [other_products_subcriptions_isDeleted_df] DEFAULT 0,
    CONSTRAINT [other_products_subcriptions_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[other_products_subcriptions])
    EXEC('INSERT INTO [dbo].[_prisma_new_other_products_subcriptions] ([createdBy],[created_at],[deleted_at],[expiry_date],[id],[price],[product_id],[react_no],[status],[transaction_id],[updated_at],[user_id]) SELECT [createdBy],[created_at],[deleted_at],[expiry_date],[id],[price],[product_id],[react_no],[status],[transaction_id],[updated_at],[user_id] FROM [dbo].[other_products_subcriptions] WITH (holdlock tablockx)');
DROP TABLE [dbo].[other_products_subcriptions];
EXEC SP_RENAME N'dbo._prisma_new_other_products_subcriptions', N'other_products_subcriptions';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'other_products_subscription_histories'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_other_products_subscription_histories] (
    [id] NVARCHAR(1000) NOT NULL,
    [react_no] INT,
    [transaction_id] NVARCHAR(1000) NOT NULL,
    [product_id] NVARCHAR(1000) NOT NULL,
    [other_date] DATETIME,
    [user_id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53),
    [request_type] NVARCHAR(max),
    [document] NVARCHAR(max),
    [payment_type] NVARCHAR(max),
    [status] VARCHAR(255) CONSTRAINT [DF_other_products_subscription_histories_status] DEFAULT 'pending',
    [createdBy] NVARCHAR(255),
    [created_at] DATETIME2 CONSTRAINT [other_products_subscription_histories_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME,
    [expiry_date] DATETIME,
    [admin_id] NVARCHAR(1000),
    [additional_gln_id] NVARCHAR(1000),
    CONSTRAINT [other_products_subscription_histories_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[other_products_subscription_histories])
    EXEC('INSERT INTO [dbo].[_prisma_new_other_products_subscription_histories] ([admin_id],[createdBy],[created_at],[deleted_at],[document],[expiry_date],[id],[other_date],[payment_type],[price],[product_id],[react_no],[request_type],[status],[transaction_id],[updated_at],[user_id]) SELECT [admin_id],[createdBy],[created_at],[deleted_at],[document],[expiry_date],[id],[other_date],[payment_type],[price],[product_id],[react_no],[request_type],[status],[transaction_id],[updated_at],[user_id] FROM [dbo].[other_products_subscription_histories] WITH (holdlock tablockx)');
DROP TABLE [dbo].[other_products_subscription_histories];
EXEC SP_RENAME N'dbo._prisma_new_other_products_subscription_histories', N'other_products_subscription_histories';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'chats'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_chats] (
    [id] FLOAT(53),
    [user_id] FLOAT(53),
    [provider_id] FLOAT(53),
    [booking_id] FLOAT(53),
    [message] NVARCHAR(max),
    [sender] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [ChatID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__chats__A9FBE6267888992D] PRIMARY KEY CLUSTERED ([ChatID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_chats] ON;
IF EXISTS(SELECT * FROM [dbo].[chats])
    EXEC('INSERT INTO [dbo].[_prisma_new_chats] ([ChatID],[booking_id],[created_at],[id],[message],[provider_id],[sender],[updated_at],[user_id]) SELECT [ChatID],[booking_id],[created_at],[id],[message],[provider_id],[sender],[updated_at],[user_id] FROM [dbo].[chats] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_chats] OFF;
DROP TABLE [dbo].[chats];
EXEC SP_RENAME N'dbo._prisma_new_chats', N'chats';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'MemberDocumentOld'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_MemberDocumentOld] (
    [MemberDocumentID] DECIMAL(10,0) NOT NULL CONSTRAINT [DF__MemberDoc__Membe__6D2D2E85] DEFAULT 0,
    [MemberID] DECIMAL(10,0),
    [UserPathName] NVARCHAR(250),
    [SystemPathName] NVARCHAR(100),
    [IsActive] TINYINT NOT NULL CONSTRAINT [DF__MemberDoc__IsAct__70FDBF69] DEFAULT 0,
    [CreatedBy] DECIMAL(10,0) NOT NULL CONSTRAINT [DF__MemberDoc__Creat__71F1E3A2] DEFAULT 0,
    [CreatedDate] DATETIME2 NOT NULL,
    [UpdatedBy] DECIMAL(10,0),
    [UpdatedDate] DATETIME2,
    [MemberDocumentOldID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__MemberDo__E039ACA69EF86A22] PRIMARY KEY CLUSTERED ([MemberDocumentOldID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_MemberDocumentOld] ON;
IF EXISTS(SELECT * FROM [dbo].[MemberDocumentOld])
    EXEC('INSERT INTO [dbo].[_prisma_new_MemberDocumentOld] ([CreatedBy],[CreatedDate],[IsActive],[MemberDocumentID],[MemberDocumentOldID],[MemberID],[SystemPathName],[UpdatedBy],[UpdatedDate],[UserPathName]) SELECT [CreatedBy],[CreatedDate],[IsActive],[MemberDocumentID],[MemberDocumentOldID],[MemberID],[SystemPathName],[UpdatedBy],[UpdatedDate],[UserPathName] FROM [dbo].[MemberDocumentOld] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_MemberDocumentOld] OFF;
DROP TABLE [dbo].[MemberDocumentOld];
EXEC SP_RENAME N'dbo._prisma_new_MemberDocumentOld', N'MemberDocumentOld';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'families'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_families] (
    [id] FLOAT(53),
    [family_code] NVARCHAR(max),
    [family_title] NVARCHAR(max),
    [family_definition] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [FamilyID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__families__41D82F4B3DCAE285] PRIMARY KEY CLUSTERED ([FamilyID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_families] ON;
IF EXISTS(SELECT * FROM [dbo].[families])
    EXEC('INSERT INTO [dbo].[_prisma_new_families] ([FamilyID],[created_at],[family_code],[family_definition],[family_title],[id],[updated_at]) SELECT [FamilyID],[created_at],[family_code],[family_definition],[family_title],[id],[updated_at] FROM [dbo].[families] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_families] OFF;
DROP TABLE [dbo].[families];
EXEC SP_RENAME N'dbo._prisma_new_families', N'families';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'tblSysNo'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_tblSysNo] (
    [TblSysCtrNo] NCHAR(10) NOT NULL,
    [SysNoID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__tblSysNo__68661321043D2983] PRIMARY KEY CLUSTERED ([SysNoID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_tblSysNo] ON;
IF EXISTS(SELECT * FROM [dbo].[tblSysNo])
    EXEC('INSERT INTO [dbo].[_prisma_new_tblSysNo] ([SysNoID],[TblSysCtrNo]) SELECT [SysNoID],[TblSysCtrNo] FROM [dbo].[tblSysNo] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_tblSysNo] OFF;
DROP TABLE [dbo].[tblSysNo];
EXEC SP_RENAME N'dbo._prisma_new_tblSysNo', N'tblSysNo';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'add_member_sscc_products'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_add_member_sscc_products] (
    [id] NVARCHAR(1000) NOT NULL,
    [sscc_type] NVARCHAR(max),
    [product_id] NVARCHAR(1000),
    [reference_id] NVARCHAR(1000),
    [VendorID] NVARCHAR(max),
    [VendorName] NVARCHAR(max),
    [productID] NVARCHAR(max),
    [description] NVARCHAR(max),
    [SerialNumber] NVARCHAR(max),
    [ItemCode] NVARCHAR(max),
    [Qty] NVARCHAR(max),
    [UseBy] NVARCHAR(max),
    [BatchNo] NVARCHAR(max),
    [Boxof] NVARCHAR(max),
    [hsn_sku] NVARCHAR(max),
    [po_no] NVARCHAR(max),
    [expiraton_date] NVARCHAR(max),
    [ship_to] NVARCHAR(max),
    [ship_date] NVARCHAR(max),
    [vendor_item_no] NVARCHAR(max),
    [short_qty_code] NVARCHAR(max),
    [country_id] NVARCHAR(max),
    [carton] NVARCHAR(max),
    [SSCCBarcodeNumber] NVARCHAR(max),
    [SSCCBarcodeNumber_without_check] NVARCHAR(max),
    [user_id] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [add_member_sscc_products_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [gcpGLNID] CHAR(20),
    [deleted_at] DATETIME,
    CONSTRAINT [add_member_sscc_products_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[add_member_sscc_products])
    EXEC('INSERT INTO [dbo].[_prisma_new_add_member_sscc_products] ([BatchNo],[Boxof],[ItemCode],[Qty],[SSCCBarcodeNumber],[SSCCBarcodeNumber_without_check],[SerialNumber],[UseBy],[VendorID],[VendorName],[carton],[country_id],[created_at],[deleted_at],[description],[expiraton_date],[gcpGLNID],[hsn_sku],[id],[po_no],[productID],[product_id],[reference_id],[ship_date],[ship_to],[short_qty_code],[sscc_type],[updated_at],[user_id],[vendor_item_no]) SELECT [BatchNo],[Boxof],[ItemCode],[Qty],[SSCCBarcodeNumber],[SSCCBarcodeNumber_without_check],[SerialNumber],[UseBy],[VendorID],[VendorName],[carton],[country_id],[created_at],[deleted_at],[description],[expiraton_date],[gcpGLNID],[hsn_sku],[id],[po_no],[productID],[product_id],[reference_id],[ship_date],[ship_to],[short_qty_code],[sscc_type],[updated_at],[user_id],[vendor_item_no] FROM [dbo].[add_member_sscc_products] WITH (holdlock tablockx)');
DROP TABLE [dbo].[add_member_sscc_products];
EXEC SP_RENAME N'dbo._prisma_new_add_member_sscc_products', N'add_member_sscc_products';
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
    [name_ar] NVARCHAR(max),
    [total_no_of_barcodes] FLOAT(53),
    [product_subscription_fee] FLOAT(53),
    [code] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [other_products_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [med_subscription_fee] FLOAT(53),
    [variant] NVARCHAR(10),
    CONSTRAINT [other_products_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[other_products])
    EXEC('INSERT INTO [dbo].[_prisma_new_other_products] ([code],[created_at],[id],[med_subscription_fee],[product_name],[product_subscription_fee],[status],[total_no_of_barcodes],[updated_at],[variant]) SELECT [code],[created_at],[id],[med_subscription_fee],[product_name],[product_subscription_fee],[status],[total_no_of_barcodes],[updated_at],[variant] FROM [dbo].[other_products] WITH (holdlock tablockx)');
DROP TABLE [dbo].[other_products];
EXEC SP_RENAME N'dbo._prisma_new_other_products', N'other_products';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'mega_menu_categories'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_mega_menu_categories] (
    [id] NVARCHAR(1000) NOT NULL,
    [parent_id] NVARCHAR(1000) NOT NULL,
    [megamenu_id] NVARCHAR(1000),
    [category_name_en] NVARCHAR(max),
    [category_name_ar] NVARCHAR(max),
    [description] NVARCHAR(max),
    [url] NVARCHAR(max),
    [meta_title] NVARCHAR(max),
    [meta_description] NVARCHAR(max),
    [meta_keywords] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME CONSTRAINT [mega_menu_categories_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [mega_menu_categories_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [mega_menu_categories_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[mega_menu_categories])
    EXEC('INSERT INTO [dbo].[_prisma_new_mega_menu_categories] ([category_name_ar],[category_name_en],[created_at],[description],[id],[megamenu_id],[meta_description],[meta_keywords],[meta_title],[parent_id],[status],[updated_at],[url]) SELECT [category_name_ar],[category_name_en],[created_at],[description],[id],[megamenu_id],[meta_description],[meta_keywords],[meta_title],[parent_id],[status],[updated_at],[url] FROM [dbo].[mega_menu_categories] WITH (holdlock tablockx)');
DROP TABLE [dbo].[mega_menu_categories];
EXEC SP_RENAME N'dbo._prisma_new_mega_menu_categories', N'mega_menu_categories';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'product_packagings'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_product_packagings] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME2 CONSTRAINT [product_packagings_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    CONSTRAINT [product_packagings_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[product_packagings])
    EXEC('INSERT INTO [dbo].[_prisma_new_product_packagings] ([created_at],[id],[name],[status],[updated_at]) SELECT [created_at],[id],[name],[status],[updated_at] FROM [dbo].[product_packagings] WITH (holdlock tablockx)');
DROP TABLE [dbo].[product_packagings];
EXEC SP_RENAME N'dbo._prisma_new_product_packagings', N'product_packagings';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'products'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_products] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [gcpGLNID] VARCHAR(50) NOT NULL,
    [import_code] VARCHAR(50),
    [productnameenglish] NVARCHAR(max),
    [productnamearabic] NVARCHAR(max) NOT NULL,
    [BrandName] NVARCHAR(255),
    [ProductType] VARCHAR(50),
    [Origin] VARCHAR(50),
    [PackagingType] VARCHAR(50),
    [MnfCode] NVARCHAR(50),
    [MnfGLN] NVARCHAR(50),
    [ProvGLN] NVARCHAR(50),
    [unit] VARCHAR(50),
    [size] VARCHAR(50),
    [front_image] VARCHAR(255),
    [back_image] VARCHAR(255),
    [childProduct] VARCHAR(255),
    [quantity] NVARCHAR(10),
    [barcode] NVARCHAR(50),
    [gpc] VARCHAR(255),
    [gpc_code] VARCHAR(50),
    [countrySale] VARCHAR(50),
    [HSCODES] TEXT,
    [HsDescription] TEXT,
    [gcp_type] VARCHAR(50),
    [prod_lang] VARCHAR(50) NOT NULL,
    [details_page] NVARCHAR(max),
    [details_page_ar] NVARCHAR(max),
    [status] TINYINT NOT NULL CONSTRAINT [DF__products__status__54968AE5] DEFAULT 1,
    [deleted_at] DATETIME,
    [created_at] DATETIME CONSTRAINT [products_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL,
    [memberID] NVARCHAR(max),
    [admin_id] INT CONSTRAINT [DF_products_admin_id] DEFAULT 0,
    [save_as] VARCHAR(20) CONSTRAINT [DF_products_save_as] DEFAULT 'final',
    [gtin_type] VARCHAR(4) CONSTRAINT [DF_products_gtin_type] DEFAULT 'gtin',
    [product_url] VARCHAR(255),
    [product_link_url] VARCHAR(255),
    [BrandNameAr] NVARCHAR(max),
    [digitalInfoType] INT,
    [readyForGepir] NCHAR(10) CONSTRAINT [DF_products_readyForGepir] DEFAULT '0',
    [gepirPosted] NCHAR(10) CONSTRAINT [DF_products_gepirPosted] DEFAULT '0',
    [image_1] VARCHAR(255),
    [image_2] VARCHAR(255),
    [image_3] VARCHAR(255),
    CONSTRAINT [products_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[products])
    EXEC('INSERT INTO [dbo].[_prisma_new_products] ([BrandName],[BrandNameAr],[HSCODES],[HsDescription],[MnfCode],[MnfGLN],[Origin],[PackagingType],[ProductType],[ProvGLN],[admin_id],[back_image],[barcode],[childProduct],[countrySale],[created_at],[deleted_at],[details_page],[details_page_ar],[digitalInfoType],[front_image],[gcpGLNID],[gcp_type],[gepirPosted],[gpc],[gpc_code],[gtin_type],[id],[import_code],[memberID],[prod_lang],[product_link_url],[product_url],[productnamearabic],[productnameenglish],[quantity],[readyForGepir],[save_as],[size],[status],[unit],[updated_at],[user_id]) SELECT [BrandName],[BrandNameAr],[HSCODES],[HsDescription],[MnfCode],[MnfGLN],[Origin],[PackagingType],[ProductType],[ProvGLN],[admin_id],[back_image],[barcode],[childProduct],[countrySale],[created_at],[deleted_at],[details_page],[details_page_ar],[digitalInfoType],[front_image],[gcpGLNID],[gcp_type],[gepirPosted],[gpc],[gpc_code],[gtin_type],[id],[import_code],[memberID],[prod_lang],[product_link_url],[product_url],[productnamearabic],[productnameenglish],[quantity],[readyForGepir],[save_as],[size],[status],[unit],[updated_at],[user_id] FROM [dbo].[products] WITH (holdlock tablockx)');
DROP TABLE [dbo].[products];
EXEC SP_RENAME N'dbo._prisma_new_products', N'products';
CREATE NONCLUSTERED INDEX [products_barcode_index] ON [dbo].[products]([barcode]);
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'old_users'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_old_users] (
    [loginid] VARCHAR(50),
    [loginpass] VARCHAR(50),
    [status] VARCHAR(1) CONSTRAINT [DF_old_users_status] DEFAULT '0',
    [UserId] VARCHAR(10),
    [OldUserID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__old_user__F3D5F2C3EAE92EB8] PRIMARY KEY CLUSTERED ([OldUserID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_old_users] ON;
IF EXISTS(SELECT * FROM [dbo].[old_users])
    EXEC('INSERT INTO [dbo].[_prisma_new_old_users] ([OldUserID],[UserId],[loginid],[loginpass],[status]) SELECT [OldUserID],[UserId],[loginid],[loginpass],[status] FROM [dbo].[old_users] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_old_users] OFF;
DROP TABLE [dbo].[old_users];
EXEC SP_RENAME N'dbo._prisma_new_old_users', N'old_users';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'help_desks'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_help_desks] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(max),
    [email] NVARCHAR(max),
    [ticket_no] NVARCHAR(max),
    [description] NVARCHAR(max),
    [document] NVARCHAR(max),
    [user_id] NVARCHAR(max),
    [assignedTo] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [help_desks_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [help_desks_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    [deleted_at] DATETIME,
    CONSTRAINT [help_desks_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[help_desks])
    EXEC('INSERT INTO [dbo].[_prisma_new_help_desks] ([assignedTo],[created_at],[deleted_at],[description],[document],[email],[id],[status],[ticket_no],[title],[updated_at],[user_id]) SELECT [assignedTo],[created_at],[deleted_at],[description],[document],[email],[id],[status],[ticket_no],[title],[updated_at],[user_id] FROM [dbo].[help_desks] WITH (holdlock tablockx)');
DROP TABLE [dbo].[help_desks];
EXEC SP_RENAME N'dbo._prisma_new_help_desks', N'help_desks';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'hs_codes'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_hs_codes] (
    [id] NVARCHAR(1000) NOT NULL,
    [CNKEY] NVARCHAR(255) NOT NULL,
    [HSCODES] NVARCHAR(255) NOT NULL,
    [DescriptionEN] NVARCHAR(max) NOT NULL,
    [addBy] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [hs_codes_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [hs_codes_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[hs_codes])
    EXEC('INSERT INTO [dbo].[_prisma_new_hs_codes] ([CNKEY],[DescriptionEN],[HSCODES],[addBy],[created_at],[id],[updated_at]) SELECT [CNKEY],[DescriptionEN],[HSCODES],[addBy],[created_at],[id],[updated_at] FROM [dbo].[hs_codes] WITH (holdlock tablockx)');
DROP TABLE [dbo].[hs_codes];
EXEC SP_RENAME N'dbo._prisma_new_hs_codes', N'hs_codes';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'user_guide_pdfs'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_user_guide_pdfs] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(255) NOT NULL,
    [pdf] NVARCHAR(255) NOT NULL,
    [status] INT NOT NULL CONSTRAINT [DF__user_guid__statu__51851410] DEFAULT 1,
    [addedBy] INT NOT NULL,
    [created_at] DATETIME CONSTRAINT [user_guide_pdfs_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [user_guide_pdfs_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [user_guide_pdfs_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[user_guide_pdfs])
    EXEC('INSERT INTO [dbo].[_prisma_new_user_guide_pdfs] ([addedBy],[created_at],[id],[pdf],[status],[title],[updated_at]) SELECT [addedBy],[created_at],[id],[pdf],[status],[title],[updated_at] FROM [dbo].[user_guide_pdfs] WITH (holdlock tablockx)');
DROP TABLE [dbo].[user_guide_pdfs];
EXEC SP_RENAME N'dbo._prisma_new_user_guide_pdfs', N'user_guide_pdfs';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'user_guide_videos'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_user_guide_videos] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(255) NOT NULL,
    [video] NVARCHAR(255) NOT NULL,
    [status] INT NOT NULL CONSTRAINT [DF__user_guid__statu__546180BB] DEFAULT 1,
    [addedBy] INT NOT NULL,
    [created_at] DATETIME CONSTRAINT [user_guide_videos_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [user_guide_videos_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [user_guide_videos_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[user_guide_videos])
    EXEC('INSERT INTO [dbo].[_prisma_new_user_guide_videos] ([addedBy],[created_at],[id],[status],[title],[updated_at],[video]) SELECT [addedBy],[created_at],[id],[status],[title],[updated_at],[video] FROM [dbo].[user_guide_videos] WITH (holdlock tablockx)');
DROP TABLE [dbo].[user_guide_videos];
EXEC SP_RENAME N'dbo._prisma_new_user_guide_videos', N'user_guide_videos';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'schedules'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_schedules] (
    [id] FLOAT(53),
    [user_id] FLOAT(53),
    [week_name] NVARCHAR(max),
    [start_time] NVARCHAR(max),
    [end_time] NVARCHAR(max),
    [status] FLOAT(53),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [ScheduleID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__schedule__9C8A5B694792F6C4] PRIMARY KEY CLUSTERED ([ScheduleID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_schedules] ON;
IF EXISTS(SELECT * FROM [dbo].[schedules])
    EXEC('INSERT INTO [dbo].[_prisma_new_schedules] ([ScheduleID],[created_at],[end_time],[id],[start_time],[status],[updated_at],[user_id],[week_name]) SELECT [ScheduleID],[created_at],[end_time],[id],[start_time],[status],[updated_at],[user_id],[week_name] FROM [dbo].[schedules] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_schedules] OFF;
DROP TABLE [dbo].[schedules];
EXEC SP_RENAME N'dbo._prisma_new_schedules', N'schedules';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'featured_articales'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_featured_articales] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(max),
    [title_ar] NVARCHAR(max),
    [image] NVARCHAR(max),
    [date] NVARCHAR(255),
    [link] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME CONSTRAINT [featured_articales_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [featured_articales_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [featured_articales_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[featured_articales])
    EXEC('INSERT INTO [dbo].[_prisma_new_featured_articales] ([created_at],[date],[id],[image],[link],[status],[title],[title_ar],[updated_at]) SELECT [created_at],[date],[id],[image],[link],[status],[title],[title_ar],[updated_at] FROM [dbo].[featured_articales] WITH (holdlock tablockx)');
DROP TABLE [dbo].[featured_articales];
EXEC SP_RENAME N'dbo._prisma_new_featured_articales', N'featured_articales';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'pages'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_pages] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(max),
    [name_ar] NVARCHAR(max),
    [slug] NVARCHAR(max),
    [page_order] INT,
    [sections] NVARCHAR(max),
    [custom_section_data] NVARCHAR(max),
    [custom_section_data_ar] NVARCHAR(max),
    [seo_description] NVARCHAR(max),
    [is_dropdown] INT,
    [status] INT,
    [created_at] DATETIME CONSTRAINT [pages_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [pages_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [pages_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[pages])
    EXEC('INSERT INTO [dbo].[_prisma_new_pages] ([created_at],[custom_section_data],[custom_section_data_ar],[id],[is_dropdown],[name],[name_ar],[page_order],[sections],[seo_description],[slug],[status],[updated_at]) SELECT [created_at],[custom_section_data],[custom_section_data_ar],[id],[is_dropdown],[name],[name_ar],[page_order],[sections],[seo_description],[slug],[status],[updated_at] FROM [dbo].[pages] WITH (holdlock tablockx)');
DROP TABLE [dbo].[pages];
EXEC SP_RENAME N'dbo._prisma_new_pages', N'pages';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'partners'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_partners] (
    [id] NVARCHAR(1000) NOT NULL,
    [image] NVARCHAR(max),
    [link] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME CONSTRAINT [partners_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [partners_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [partners_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[partners])
    EXEC('INSERT INTO [dbo].[_prisma_new_partners] ([created_at],[id],[image],[link],[status],[updated_at]) SELECT [created_at],[id],[image],[link],[status],[updated_at] FROM [dbo].[partners] WITH (holdlock tablockx)');
DROP TABLE [dbo].[partners];
EXEC SP_RENAME N'dbo._prisma_new_partners', N'partners';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'brands'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_brands] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    [name_ar] NVARCHAR(255) NOT NULL,
    [status] NVARCHAR(255) NOT NULL CONSTRAINT [DF__brands__status__092A4EB5] DEFAULT 'inactive',
    [user_id] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [brands_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [companyID] NVARCHAR(1000),
    [brand_certificate] NVARCHAR(max),
    CONSTRAINT [brands_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[brands])
    EXEC('INSERT INTO [dbo].[_prisma_new_brands] ([created_at],[id],[name],[name_ar],[status],[updated_at],[user_id]) SELECT [created_at],[id],[name],[name_ar],[status],[updated_at],[user_id] FROM [dbo].[brands] WITH (holdlock tablockx)');
DROP TABLE [dbo].[brands];
EXEC SP_RENAME N'dbo._prisma_new_brands', N'brands';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'footer_menus'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_footer_menus] (
    [id] NVARCHAR(1000) NOT NULL,
    [parent_id] NVARCHAR(1000) NOT NULL,
    [category_name_en] NVARCHAR(max),
    [category_name_ar] NVARCHAR(max),
    [url] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME CONSTRAINT [footer_menus_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [footer_menus_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [footer_menus_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[footer_menus])
    EXEC('INSERT INTO [dbo].[_prisma_new_footer_menus] ([category_name_ar],[category_name_en],[created_at],[id],[parent_id],[status],[updated_at],[url]) SELECT [category_name_ar],[category_name_en],[created_at],[id],[parent_id],[status],[updated_at],[url] FROM [dbo].[footer_menus] WITH (holdlock tablockx)');
DROP TABLE [dbo].[footer_menus];
EXEC SP_RENAME N'dbo._prisma_new_footer_menus', N'footer_menus';
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
    [name_ar] NVARCHAR(max),
    [country_id] INT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [states_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [states_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'gtin_subcriptions'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_gtin_subcriptions] (
    [id] NVARCHAR(1000) NOT NULL,
    [react_no] INT,
    [transaction_id] NVARCHAR(1000),
    [pkg_id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53),
    [request_type] NVARCHAR(max),
    [status] VARCHAR(10) CONSTRAINT [DF_gtin_subcriptions_status] DEFAULT 'inactive',
    [user_id] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000),
    [created_at] DATETIME2 CONSTRAINT [gtin_subcriptions_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME,
    [expiry_date] DATETIME,
    [gtin_subscription_counter] FLOAT(53) NOT NULL CONSTRAINT [gtin_subcriptions_gtin_subscription_counter_df] DEFAULT 0,
    [gtin_subscription_limit] FLOAT(53) NOT NULL CONSTRAINT [gtin_subcriptions_gtin_subscription_limit_df] DEFAULT 0,
    [gtin_subscription_total_price] FLOAT(53) NOT NULL CONSTRAINT [gtin_subcriptions_gtin_subscription_total_price_df] DEFAULT 0,
    [isDeleted] BIT CONSTRAINT [gtin_subcriptions_isDeleted_df] DEFAULT 0,
    CONSTRAINT [gtin_subcriptions_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[gtin_subcriptions])
    EXEC('INSERT INTO [dbo].[_prisma_new_gtin_subcriptions] ([createdBy],[created_at],[deleted_at],[expiry_date],[id],[pkg_id],[price],[react_no],[request_type],[status],[transaction_id],[updated_at],[user_id]) SELECT [createdBy],[created_at],[deleted_at],[expiry_date],[id],[pkg_id],[price],[react_no],[request_type],[status],[transaction_id],[updated_at],[user_id] FROM [dbo].[gtin_subcriptions] WITH (holdlock tablockx)');
DROP TABLE [dbo].[gtin_subcriptions];
EXEC SP_RENAME N'dbo._prisma_new_gtin_subcriptions', N'gtin_subcriptions';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'admins'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_admins] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(max),
    [email] NVARCHAR(max),
    [password] NVARCHAR(max),
    [image] NVARCHAR(max),
    [mobile] NVARCHAR(max),
    [status] TINYINT NOT NULL CONSTRAINT [DF__admins__status__0F624AF8] DEFAULT 1,
    [is_super_admin] TINYINT NOT NULL CONSTRAINT [DF__super_admins__status__0F624AF8] DEFAULT 0,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [admins_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [admins_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[admins])
    EXEC('INSERT INTO [dbo].[_prisma_new_admins] ([created_at],[email],[id],[image],[mobile],[password],[status],[updated_at],[username]) SELECT [created_at],[email],[id],[image],[mobile],[password],[status],[updated_at],[username] FROM [dbo].[admins] WITH (holdlock tablockx)');
DROP TABLE [dbo].[admins];
EXEC SP_RENAME N'dbo._prisma_new_admins', N'admins';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'board_members'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_board_members] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    [job_title] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(max),
    [image] NVARCHAR(255) NOT NULL,
    [addedBy] TINYINT NOT NULL,
    [status] TINYINT NOT NULL CONSTRAINT [DF__board_mem__statu__3726238F] DEFAULT 1,
    [created_at] DATETIME CONSTRAINT [board_members_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [board_members_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [board_members_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[board_members])
    EXEC('INSERT INTO [dbo].[_prisma_new_board_members] ([addedBy],[created_at],[description],[id],[image],[job_title],[name],[status],[updated_at]) SELECT [addedBy],[created_at],[description],[id],[image],[job_title],[name],[status],[updated_at] FROM [dbo].[board_members] WITH (holdlock tablockx)');
DROP TABLE [dbo].[board_members];
EXEC SP_RENAME N'dbo._prisma_new_board_members', N'board_members';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'membership_type_fees'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_membership_type_fees] (
    [id] FLOAT(53),
    [membershipType_id] FLOAT(53),
    [product] NVARCHAR(max),
    [parent_id] FLOAT(53),
    [total_barcode] FLOAT(53),
    [annual_fee] FLOAT(53),
    [registration_fee] FLOAT(53),
    [status] FLOAT(53),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [MembershipTypeFeeID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__membersh__AF30BFD6DBA5A115] PRIMARY KEY CLUSTERED ([MembershipTypeFeeID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_membership_type_fees] ON;
IF EXISTS(SELECT * FROM [dbo].[membership_type_fees])
    EXEC('INSERT INTO [dbo].[_prisma_new_membership_type_fees] ([MembershipTypeFeeID],[annual_fee],[created_at],[id],[membershipType_id],[parent_id],[product],[registration_fee],[status],[total_barcode],[updated_at]) SELECT [MembershipTypeFeeID],[annual_fee],[created_at],[id],[membershipType_id],[parent_id],[product],[registration_fee],[status],[total_barcode],[updated_at] FROM [dbo].[membership_type_fees] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_membership_type_fees] OFF;
DROP TABLE [dbo].[membership_type_fees];
EXEC SP_RENAME N'dbo._prisma_new_membership_type_fees', N'membership_type_fees';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'segments'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_segments] (
    [id] FLOAT(53),
    [segment_code] NVARCHAR(max),
    [segment_title] NVARCHAR(max),
    [segment_definition] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [SegmentID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__segments__C680609BC4E3853D] PRIMARY KEY CLUSTERED ([SegmentID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_segments] ON;
IF EXISTS(SELECT * FROM [dbo].[segments])
    EXEC('INSERT INTO [dbo].[_prisma_new_segments] ([SegmentID],[created_at],[id],[segment_code],[segment_definition],[segment_title],[updated_at]) SELECT [SegmentID],[created_at],[id],[segment_code],[segment_definition],[segment_title],[updated_at] FROM [dbo].[segments] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_segments] OFF;
DROP TABLE [dbo].[segments];
EXEC SP_RENAME N'dbo._prisma_new_segments', N'segments';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'faq_categories'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_faq_categories] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(max),
    [created_at] DATETIME CONSTRAINT [faq_categories_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [faq_categories_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [faq_categories_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[faq_categories])
    EXEC('INSERT INTO [dbo].[_prisma_new_faq_categories] ([created_at],[id],[name],[updated_at]) SELECT [created_at],[id],[name],[updated_at] FROM [dbo].[faq_categories] WITH (holdlock tablockx)');
DROP TABLE [dbo].[faq_categories];
EXEC SP_RENAME N'dbo._prisma_new_faq_categories', N'faq_categories';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'help_desk_comments'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_help_desk_comments] (
    [id] NVARCHAR(1000) NOT NULL,
    [helpDeskID] NVARCHAR(max),
    [comment] NVARCHAR(max),
    [document] NVARCHAR(max),
    [commentByAdmin] NVARCHAR(max),
    [commentByUser] NVARCHAR(max),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [help_desk_comments_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [help_desk_comments_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [help_desk_comments_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[help_desk_comments])
    EXEC('INSERT INTO [dbo].[_prisma_new_help_desk_comments] ([comment],[commentByAdmin],[commentByUser],[created_at],[document],[helpDeskID],[id],[updated_at]) SELECT [comment],[commentByAdmin],[commentByUser],[created_at],[document],[helpDeskID],[id],[updated_at] FROM [dbo].[help_desk_comments] WITH (holdlock tablockx)');
DROP TABLE [dbo].[help_desk_comments];
EXEC SP_RENAME N'dbo._prisma_new_help_desk_comments', N'help_desk_comments';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'carts'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_carts] (
    [id] NVARCHAR(1000) NOT NULL,
    [transaction_id] NVARCHAR(1000),
    [cart_items] NVARCHAR(max),
    [total] FLOAT(53),
    [documents] NVARCHAR(max),
    [request_type] NVARCHAR(max),
    [payment_type] NVARCHAR(max),
    [user_id] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [carts_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME,
    [reject_reason] TEXT,
    [reject_by] INT,
    [receipt] TEXT,
    [receipt_path] NVARCHAR(max),
    [admin_id] INT CONSTRAINT [DF_carts_admin_id] DEFAULT 0,
    [assign_to] INT CONSTRAINT [DF_carts_assign_to] DEFAULT 0,
    [discount] FLOAT(53) CONSTRAINT [DF_carts_discount] DEFAULT 0,
    CONSTRAINT [carts_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[carts])
    EXEC('INSERT INTO [dbo].[_prisma_new_carts] ([admin_id],[assign_to],[cart_items],[created_at],[deleted_at],[discount],[documents],[id],[payment_type],[receipt],[receipt_path],[reject_by],[reject_reason],[request_type],[total],[transaction_id],[updated_at],[user_id]) SELECT [admin_id],[assign_to],[cart_items],[created_at],[deleted_at],[discount],[documents],[id],[payment_type],[receipt],[receipt_path],[reject_by],[reject_reason],[request_type],[total],[transaction_id],[updated_at],[user_id] FROM [dbo].[carts] WITH (holdlock tablockx)');
DROP TABLE [dbo].[carts];
EXEC SP_RENAME N'dbo._prisma_new_carts', N'carts';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'member_documents'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_member_documents] (
    [id] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(255) NOT NULL,
    [document] NVARCHAR(max) NOT NULL,
    [transaction_id] NVARCHAR(255) NOT NULL CONSTRAINT [DF__member_do__trans__01BE3717] DEFAULT '0',
    [user_id] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [member_documents_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [doc_type] VARCHAR(20) CONSTRAINT [DF_member_documents_doc_type] DEFAULT 'member_document',
    [status] VARCHAR(20) CONSTRAINT [DF_member_documents_status] DEFAULT 'pending',
    [reject_reason] VARCHAR(1000),
    [uploaded_by] NVARCHAR(1000),
    [no_of_years] INT NOT NULL CONSTRAINT [DF_member_documents_no_of_years] DEFAULT 1,
    [cron_job_check_time] DATETIME2 NOT NULL CONSTRAINT [member_documents_cron_job_check_time_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [member_documents_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[member_documents])
    EXEC('INSERT INTO [dbo].[_prisma_new_member_documents] ([created_at],[doc_type],[document],[id],[transaction_id],[type],[updated_at],[user_id]) SELECT [created_at],[doc_type],[document],[id],[transaction_id],[type],[updated_at],[user_id] FROM [dbo].[member_documents] WITH (holdlock tablockx)');
DROP TABLE [dbo].[member_documents];
EXEC SP_RENAME N'dbo._prisma_new_member_documents', N'member_documents';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'member_history_logs'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_member_history_logs] (
    [id] NVARCHAR(1000) NOT NULL,
    [subject] NVARCHAR(255) NOT NULL,
    [admin_id] NVARCHAR(1000),
    [created_at] DATETIME CONSTRAINT [member_history_logs_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    [user_id] NVARCHAR(1000) NOT NULL,
    [created_by_admin] BIT CONSTRAINT [DF_member_history_logs_created_by_admin] DEFAULT 0,
    [rejected_usersId] NVARCHAR(1000),
    CONSTRAINT [member_history_logs_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[member_history_logs])
    EXEC('INSERT INTO [dbo].[_prisma_new_member_history_logs] ([admin_id],[created_at],[id],[subject],[updated_at],[user_id]) SELECT [admin_id],[created_at],[id],[subject],[updated_at],[user_id] FROM [dbo].[member_history_logs] WITH (holdlock tablockx)');
DROP TABLE [dbo].[member_history_logs];
EXEC SP_RENAME N'dbo._prisma_new_member_history_logs', N'member_history_logs';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'sliders'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_sliders] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(max),
    [link] NVARCHAR(max),
    [description] NVARCHAR(max),
    [caption] VARCHAR(150),
    [image] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME CONSTRAINT [sliders_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [sliders_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [sliders_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[sliders])
    EXEC('INSERT INTO [dbo].[_prisma_new_sliders] ([caption],[created_at],[description],[id],[image],[link],[status],[title],[updated_at]) SELECT [caption],[created_at],[description],[id],[image],[link],[status],[title],[updated_at] FROM [dbo].[sliders] WITH (holdlock tablockx)');
DROP TABLE [dbo].[sliders];
EXEC SP_RENAME N'dbo._prisma_new_sliders', N'sliders';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'gpc_classes'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_gpc_classes] (
    [id] FLOAT(53),
    [class_code] NVARCHAR(max),
    [class_title] NVARCHAR(max),
    [class_definition] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [GpcClassID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__gpc_clas__E140D1DA7E572618] PRIMARY KEY CLUSTERED ([GpcClassID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_gpc_classes] ON;
IF EXISTS(SELECT * FROM [dbo].[gpc_classes])
    EXEC('INSERT INTO [dbo].[_prisma_new_gpc_classes] ([GpcClassID],[class_code],[class_definition],[class_title],[created_at],[id],[updated_at]) SELECT [GpcClassID],[class_code],[class_definition],[class_title],[created_at],[id],[updated_at] FROM [dbo].[gpc_classes] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_gpc_classes] OFF;
DROP TABLE [dbo].[gpc_classes];
EXEC SP_RENAME N'dbo._prisma_new_gpc_classes', N'gpc_classes';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'member_other_products'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_member_other_products] (
    [id] NVARCHAR(1000) NOT NULL,
    [product_id] NVARCHAR(max),
    [prodcutName] NVARCHAR(max),
    [location_name_en] NVARCHAR(max),
    [location_name_ar] NVARCHAR(max),
    [Longitude] NVARCHAR(max),
    [Latitude] NVARCHAR(max),
    [GLNStatus] NVARCHAR(max),
    [GLNBarcodeNumber] NVARCHAR(max),
    [PalletID] NVARCHAR(max),
    [PONumber] NVARCHAR(max),
    [OrderNumber] NVARCHAR(max),
    [VendorName] NVARCHAR(max),
    [OrderQty] NVARCHAR(max),
    [SSCCBarcodeNumber] NVARCHAR(max),
    [total] FLOAT(53),
    [user_id] NVARCHAR(1000),
    [created_at] DATETIME CONSTRAINT [member_other_products_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    CONSTRAINT [member_other_products_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[member_other_products])
    EXEC('INSERT INTO [dbo].[_prisma_new_member_other_products] ([GLNBarcodeNumber],[GLNStatus],[Latitude],[Longitude],[OrderNumber],[OrderQty],[PONumber],[PalletID],[SSCCBarcodeNumber],[VendorName],[created_at],[id],[location_name_ar],[location_name_en],[prodcutName],[product_id],[total],[updated_at],[user_id]) SELECT [GLNBarcodeNumber],[GLNStatus],[Latitude],[Longitude],[OrderNumber],[OrderQty],[PONumber],[PalletID],[SSCCBarcodeNumber],[VendorName],[created_at],[id],[location_name_ar],[location_name_en],[prodcutName],[product_id],[total],[updated_at],[user_id] FROM [dbo].[member_other_products] WITH (holdlock tablockx)');
DROP TABLE [dbo].[member_other_products];
EXEC SP_RENAME N'dbo._prisma_new_member_other_products', N'member_other_products';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'gtin_helper_reports'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_gtin_helper_reports] (
    [id] NVARCHAR(1000) NOT NULL,
    [report_barcode] NVARCHAR(255) NOT NULL,
    [report_comment] NVARCHAR(255) NOT NULL,
    [report_action] NVARCHAR(255) NOT NULL,
    [report_images] NVARCHAR(max) NOT NULL,
    [report_status] INT NOT NULL CONSTRAINT [DF_gtin_helper_reports_report_status] DEFAULT 0,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [gtin_helper_reports_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [reporter_email] VARCHAR(50),
    CONSTRAINT [gtin_helper_reports_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[gtin_helper_reports])
    EXEC('INSERT INTO [dbo].[_prisma_new_gtin_helper_reports] ([created_at],[id],[report_action],[report_barcode],[report_comment],[report_images],[report_status],[reporter_email],[updated_at]) SELECT [created_at],[id],[report_action],[report_barcode],[report_comment],[report_images],[report_status],[reporter_email],[updated_at] FROM [dbo].[gtin_helper_reports] WITH (holdlock tablockx)');
DROP TABLE [dbo].[gtin_helper_reports];
EXEC SP_RENAME N'dbo._prisma_new_gtin_helper_reports', N'gtin_helper_reports';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'bank_slips'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_bank_slips] (
    [id] NVARCHAR(1000) NOT NULL,
    [transaction_id] NVARCHAR(1000),
    [details] NVARCHAR(max),
    [documents] NVARCHAR(max),
    [status] VARCHAR(10) CONSTRAINT [DF_bank_slips_status] DEFAULT 'pending',
    [user_id] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [bank_slips_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME,
    [admin_id] VARCHAR(10) CONSTRAINT [DF_bank_slips_admin_id] DEFAULT '0',
    [reject_reason] TEXT,
    CONSTRAINT [bank_slips_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[bank_slips])
    EXEC('INSERT INTO [dbo].[_prisma_new_bank_slips] ([admin_id],[created_at],[deleted_at],[details],[documents],[id],[reject_reason],[status],[transaction_id],[updated_at],[user_id]) SELECT [admin_id],[created_at],[deleted_at],[details],[documents],[id],[reject_reason],[status],[transaction_id],[updated_at],[user_id] FROM [dbo].[bank_slips] WITH (holdlock tablockx)');
DROP TABLE [dbo].[bank_slips];
EXEC SP_RENAME N'dbo._prisma_new_bank_slips', N'bank_slips';
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
    [name_ar] NVARCHAR(max),
    [state_id] INT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [cities_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [cities_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [cities_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[cities])
    EXEC('INSERT INTO [dbo].[_prisma_new_cities] ([created_at],[id],[name],[state_id],[updated_at]) SELECT [created_at],[id],[name],[state_id],[updated_at] FROM [dbo].[cities] WITH (holdlock tablockx)');
DROP TABLE [dbo].[cities];
EXEC SP_RENAME N'dbo._prisma_new_cities', N'cities';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'units'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_units] (
    [id] NVARCHAR(1000) NOT NULL,
    [unit_code] VARCHAR(50),
    [unit_name] NVARCHAR(50),
    [status] INT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [units_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [units_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[units])
    EXEC('INSERT INTO [dbo].[_prisma_new_units] ([created_at],[id],[status],[unit_code],[unit_name],[updated_at]) SELECT [created_at],[id],[status],[unit_code],[unit_name],[updated_at] FROM [dbo].[units] WITH (holdlock tablockx)');
DROP TABLE [dbo].[units];
EXEC SP_RENAME N'dbo._prisma_new_units', N'units';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'unspscs'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_unspscs] (
    [id] NVARCHAR(1000) NOT NULL,
    [commodity] INT NOT NULL,
    [title] NVARCHAR(255) NOT NULL,
    [definition] NVARCHAR(max) NOT NULL,
    [addedBy] TINYINT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [unspscs_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [unspscs_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[unspscs])
    EXEC('INSERT INTO [dbo].[_prisma_new_unspscs] ([addedBy],[commodity],[created_at],[definition],[id],[title],[updated_at]) SELECT [addedBy],[commodity],[created_at],[definition],[id],[title],[updated_at] FROM [dbo].[unspscs] WITH (holdlock tablockx)');
DROP TABLE [dbo].[unspscs];
EXEC SP_RENAME N'dbo._prisma_new_unspscs', N'unspscs';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'our_teams'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_our_teams] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    [job_title] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(max),
    [image] NVARCHAR(255) NOT NULL,
    [addedBy] TINYINT NOT NULL,
    [status] TINYINT NOT NULL CONSTRAINT [DF__our_teams__statu__25A691D2] DEFAULT 1,
    [created_at] DATETIME CONSTRAINT [our_teams_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [our_teams_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [our_teams_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[our_teams])
    EXEC('INSERT INTO [dbo].[_prisma_new_our_teams] ([addedBy],[created_at],[description],[id],[image],[job_title],[name],[status],[updated_at]) SELECT [addedBy],[created_at],[description],[id],[image],[job_title],[name],[status],[updated_at] FROM [dbo].[our_teams] WITH (holdlock tablockx)');
DROP TABLE [dbo].[our_teams];
EXEC SP_RENAME N'dbo._prisma_new_our_teams', N'our_teams';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'prod_desc_languages'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_prod_desc_languages] (
    [id] NVARCHAR(1000) NOT NULL,
    [language_code] NVARCHAR(255) NOT NULL,
    [alpha3] NVARCHAR(255) NOT NULL,
    [iso639_2B] NVARCHAR(255) NOT NULL,
    [language_name] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [prod_desc_languages_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[prod_desc_languages])
    EXEC('INSERT INTO [dbo].[_prisma_new_prod_desc_languages] ([alpha3],[created_at],[id],[iso639_2B],[language_code],[language_name],[updated_at]) SELECT [alpha3],[created_at],[id],[iso639_2B],[language_code],[language_name],[updated_at] FROM [dbo].[prod_desc_languages] WITH (holdlock tablockx)');
DROP TABLE [dbo].[prod_desc_languages];
EXEC SP_RENAME N'dbo._prisma_new_prod_desc_languages', N'prod_desc_languages';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'withdraw_gateways'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_withdraw_gateways] (
    [id] FLOAT(53),
    [name] NVARCHAR(max),
    [charge] FLOAT(53),
    [charge_type] NVARCHAR(max),
    [min_withdraw] FLOAT(53),
    [max_withdraw] FLOAT(53),
    [withdraw_instruction] NVARCHAR(max),
    [status] FLOAT(53),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [WithdrawGatewayID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__withdraw__12283BF1B95F4402] PRIMARY KEY CLUSTERED ([WithdrawGatewayID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_withdraw_gateways] ON;
IF EXISTS(SELECT * FROM [dbo].[withdraw_gateways])
    EXEC('INSERT INTO [dbo].[_prisma_new_withdraw_gateways] ([WithdrawGatewayID],[charge],[charge_type],[created_at],[id],[max_withdraw],[min_withdraw],[name],[status],[updated_at],[withdraw_instruction]) SELECT [WithdrawGatewayID],[charge],[charge_type],[created_at],[id],[max_withdraw],[min_withdraw],[name],[status],[updated_at],[withdraw_instruction] FROM [dbo].[withdraw_gateways] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_withdraw_gateways] OFF;
DROP TABLE [dbo].[withdraw_gateways];
EXEC SP_RENAME N'dbo._prisma_new_withdraw_gateways', N'withdraw_gateways';
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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'product_types'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_product_types] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(max),
    [name_ar] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [product_types_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[product_types])
    EXEC('INSERT INTO [dbo].[_prisma_new_product_types] ([created_at],[id],[name],[status],[updated_at]) SELECT [created_at],[id],[name],[status],[updated_at] FROM [dbo].[product_types] WITH (holdlock tablockx)');
DROP TABLE [dbo].[product_types];
EXEC SP_RENAME N'dbo._prisma_new_product_types', N'product_types';
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
    [cr_documentID] NVARCHAR(100),
    [document_number] NVARCHAR(max),
    [fname] NVARCHAR(max),
    [lname] NVARCHAR(max),
    [email] NVARCHAR(max),
    [mobile] NVARCHAR(max),
    [image] NVARCHAR(max),
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
    [verification_code] INT,
    [cr_number] NVARCHAR(max),
    [cr_activity] NVARCHAR(max),
    [company_name_eng] NVARCHAR(max),
    [company_name_arabic] NVARCHAR(max),
    [bussiness_activity] NVARCHAR(max),
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
    [payment_status] INT CONSTRAINT [DF_users_payment_status] DEFAULT 0,
    [online_payment] NVARCHAR(max),
    [remember_token] NVARCHAR(max),
    [parent_memberID] NVARCHAR(1000) CONSTRAINT [DF_parent_member_id] DEFAULT '0',
    [invoice_file] NVARCHAR(max),
    [otp_status] INT,
    [transaction_id] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [users_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [gcpGLNID] VARCHAR(50),
    [gln] NVARCHAR(50),
    [gcp_type] VARCHAR(50),
    [deleted_at] DATETIME,
    [gcp_expiry] DATETIME,
    [memberID] NVARCHAR(max),
    [user_id] NVARCHAR(max),
    [remarks] NVARCHAR(max) CONSTRAINT [DF_users_remarks] DEFAULT 'Pending Invoice',
    [assign_to] NVARCHAR(1000),
    [membership_category] NVARCHAR(50),
    [upgradation_disc] INT CONSTRAINT [DF_users_upgradation_disc] DEFAULT 0,
    [upgradation_disc_amount] FLOAT(53) CONSTRAINT [DF_users_upgradation_disc_amount] DEFAULT 0,
    [renewal_disc] INT CONSTRAINT [DF_users_renewal_disc] DEFAULT 0,
    [renewal_disc_amount] FLOAT(53) CONSTRAINT [DF_users_renewal_disc_amount] DEFAULT 0,
    [membership_otherCategory] NVARCHAR(50),
    [activityID] INT CONSTRAINT [DF_users_activityID] DEFAULT 0,
    [registration_type] NCHAR(10),
    [city] NVARCHAR(max),
    [country] NVARCHAR(max),
    [state] NVARCHAR(max),
    [zip_code] VARCHAR(50),
    [old_member_recheck] INT CONSTRAINT [DF_users_old_member_recheck] DEFAULT 0,
    [is_login] INT CONSTRAINT [DF_users_is_login] DEFAULT 0,
    [membership_category_id] NVARCHAR(1000),
    [industryTypes] NVARCHAR(max),
    [isproductApproved] INT CONSTRAINT [DF_users_isproductApproved] DEFAULT 0,
    [pending_invoices] VARCHAR(50) NOT NULL CONSTRAINT [DF_users_for_approval] DEFAULT 'for_review',
    [member_type] NVARCHAR(max),
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[users])
    EXEC('INSERT INTO [dbo].[_prisma_new_users] ([activityID],[additional_number],[address_image],[assign_to],[building_no],[bussiness_activity],[companyID],[companyLandLine],[company_name_arabic],[company_name_eng],[contactPerson],[cr_activity],[cr_documentID],[cr_number],[created_at],[deleted_at],[district],[document_number],[documents],[email],[email_verified_at],[fname],[gcpGLNID],[gcp_expiry],[gcp_type],[gln],[gpc],[have_cr],[id],[image],[invoice_file],[lname],[location_uk],[mbl_extension],[memberID],[member_category],[member_type],[membership_category],[membership_otherCategory],[mobile],[no_of_staff],[old_member_recheck],[online_payment],[other_landline],[other_products],[otp_status],[parent_memberID],[password],[payment_status],[payment_type],[po_box],[product_addons],[qr_corde],[registration_type],[remarks],[remember_token],[renewal_disc],[renewal_disc_amount],[slug],[status],[total],[transaction_id],[unit_number],[updated_at],[upgradation_disc],[upgradation_disc_amount],[user_id],[user_type],[verification_code],[website]) SELECT [activityID],[additional_number],[address_image],[assign_to],[building_no],[bussiness_activity],[companyID],[companyLandLine],[company_name_arabic],[company_name_eng],[contactPerson],[cr_activity],[cr_documentID],[cr_number],[created_at],[deleted_at],[district],[document_number],[documents],[email],[email_verified_at],[fname],[gcpGLNID],[gcp_expiry],[gcp_type],[gln],[gpc],[have_cr],[id],[image],[invoice_file],[lname],[location_uk],[mbl_extension],[memberID],[member_category],[member_type],[membership_category],[membership_otherCategory],[mobile],[no_of_staff],[old_member_recheck],[online_payment],[other_landline],[other_products],[otp_status],[parent_memberID],[password],[payment_status],[payment_type],[po_box],[product_addons],[qr_corde],[registration_type],[remarks],[remember_token],[renewal_disc],[renewal_disc_amount],[slug],[status],[total],[transaction_id],[unit_number],[updated_at],[upgradation_disc],[upgradation_disc_amount],[user_id],[user_type],[verification_code],[website] FROM [dbo].[users] WITH (holdlock tablockx)');
DROP TABLE [dbo].[users];
EXEC SP_RENAME N'dbo._prisma_new_users', N'users';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'attributes'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_attributes] (
    [id] FLOAT(53),
    [attributes_code] NVARCHAR(max),
    [attributes_title] NVARCHAR(max),
    [attributes_definition] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [AttributeID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__attribut__C189298AD25B931E] PRIMARY KEY CLUSTERED ([AttributeID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_attributes] ON;
IF EXISTS(SELECT * FROM [dbo].[attributes])
    EXEC('INSERT INTO [dbo].[_prisma_new_attributes] ([AttributeID],[attributes_code],[attributes_definition],[attributes_title],[created_at],[id],[updated_at]) SELECT [AttributeID],[attributes_code],[attributes_definition],[attributes_title],[created_at],[id],[updated_at] FROM [dbo].[attributes] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_attributes] OFF;
DROP TABLE [dbo].[attributes];
EXEC SP_RENAME N'dbo._prisma_new_attributes', N'attributes';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'membership_types'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_membership_types] (
    [id] FLOAT(53),
    [name_en] NVARCHAR(max),
    [name_ar] NVARCHAR(max),
    [description] NVARCHAR(max),
    [max_length] NVARCHAR(max),
    [status] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [MembershipTypeID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__membersh__F35A3E595FBDD5D8] PRIMARY KEY CLUSTERED ([MembershipTypeID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_membership_types] ON;
IF EXISTS(SELECT * FROM [dbo].[membership_types])
    EXEC('INSERT INTO [dbo].[_prisma_new_membership_types] ([MembershipTypeID],[created_at],[description],[id],[max_length],[name_ar],[name_en],[status],[updated_at]) SELECT [MembershipTypeID],[created_at],[description],[id],[max_length],[name_ar],[name_en],[status],[updated_at] FROM [dbo].[membership_types] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_membership_types] OFF;
DROP TABLE [dbo].[membership_types];
EXEC SP_RENAME N'dbo._prisma_new_membership_types', N'membership_types';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'withdraw_logs'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_withdraw_logs] (
    [id] FLOAT(53),
    [user_id] FLOAT(53),
    [withdraw_gateway_id] FLOAT(53),
    [trx] NVARCHAR(max),
    [user_data] NVARCHAR(max),
    [charge] FLOAT(53),
    [balance_remains] FLOAT(53),
    [amount] FLOAT(53),
    [reason_of_reject] NVARCHAR(max),
    [status] FLOAT(53),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [WithdrawLogID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__withdraw__AD995F8BC87A4506] PRIMARY KEY CLUSTERED ([WithdrawLogID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_withdraw_logs] ON;
IF EXISTS(SELECT * FROM [dbo].[withdraw_logs])
    EXEC('INSERT INTO [dbo].[_prisma_new_withdraw_logs] ([WithdrawLogID],[amount],[balance_remains],[charge],[created_at],[id],[reason_of_reject],[status],[trx],[updated_at],[user_data],[user_id],[withdraw_gateway_id]) SELECT [WithdrawLogID],[amount],[balance_remains],[charge],[created_at],[id],[reason_of_reject],[status],[trx],[updated_at],[user_data],[user_id],[withdraw_gateway_id] FROM [dbo].[withdraw_logs] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_withdraw_logs] OFF;
DROP TABLE [dbo].[withdraw_logs];
EXEC SP_RENAME N'dbo._prisma_new_withdraw_logs', N'withdraw_logs';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'membership_range_increases'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_membership_range_increases] (
    [id] FLOAT(53),
    [member_category_id] FLOAT(53),
    [range_start] FLOAT(53),
    [range_end] FLOAT(53),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [MembershipRangeIncreaseID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__membersh__9E0FEC6F62A68910] PRIMARY KEY CLUSTERED ([MembershipRangeIncreaseID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_membership_range_increases] ON;
IF EXISTS(SELECT * FROM [dbo].[membership_range_increases])
    EXEC('INSERT INTO [dbo].[_prisma_new_membership_range_increases] ([MembershipRangeIncreaseID],[created_at],[id],[member_category_id],[range_end],[range_start],[updated_at]) SELECT [MembershipRangeIncreaseID],[created_at],[id],[member_category_id],[range_end],[range_start],[updated_at] FROM [dbo].[membership_range_increases] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_membership_range_increases] OFF;
DROP TABLE [dbo].[membership_range_increases];
EXEC SP_RENAME N'dbo._prisma_new_membership_range_increases', N'membership_range_increases';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'gcp_types'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_gcp_types] (
    [id] NVARCHAR(1000) NOT NULL,
    [gcp_code] NVARCHAR(255) NOT NULL,
    [gcp_description] NVARCHAR(max),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [gcp_types_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [gcp_types_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[gcp_types])
    EXEC('INSERT INTO [dbo].[_prisma_new_gcp_types] ([created_at],[gcp_code],[gcp_description],[id],[updated_at]) SELECT [created_at],[gcp_code],[gcp_description],[id],[updated_at] FROM [dbo].[gcp_types] WITH (holdlock tablockx)');
DROP TABLE [dbo].[gcp_types];
EXEC SP_RENAME N'dbo._prisma_new_gcp_types', N'gcp_types';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'featured_services'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_featured_services] (
    [id] NVARCHAR(1000) NOT NULL,
    [image] NVARCHAR(max),
    [link] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME CONSTRAINT [featured_services_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [featured_services_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [featured_services_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[featured_services])
    EXEC('INSERT INTO [dbo].[_prisma_new_featured_services] ([created_at],[id],[image],[link],[status],[updated_at]) SELECT [created_at],[id],[image],[link],[status],[updated_at] FROM [dbo].[featured_services] WITH (holdlock tablockx)');
DROP TABLE [dbo].[featured_services];
EXEC SP_RENAME N'dbo._prisma_new_featured_services', N'featured_services';
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
    [created_at] DATETIME2 NOT NULL CONSTRAINT [country_of_sales_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'bookings'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_bookings] (
    [id] FLOAT(53),
    [trx] NVARCHAR(max),
    [user_id] FLOAT(53),
    [service_id] FLOAT(53),
    [service_date] DATETIME,
    [hours] FLOAT(53),
    [end_date] NVARCHAR(255),
    [start_time] NVARCHAR(255),
    [end_time] NVARCHAR(255),
    [amount] FLOAT(53),
    [charge] FLOAT(53),
    [message] NVARCHAR(max),
    [location] NVARCHAR(max),
    [is_accepted] FLOAT(53),
    [payment_confirmed] FLOAT(53),
    [payment_type] FLOAT(53),
    [payment_proof] NVARCHAR(max),
    [is_completed] FLOAT(53),
    [job_end] FLOAT(53),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [BookingID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__bookings__73951ACDE903ED32] PRIMARY KEY CLUSTERED ([BookingID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_bookings] ON;
IF EXISTS(SELECT * FROM [dbo].[bookings])
    EXEC('INSERT INTO [dbo].[_prisma_new_bookings] ([BookingID],[amount],[charge],[created_at],[end_date],[end_time],[hours],[id],[is_accepted],[is_completed],[job_end],[location],[message],[payment_confirmed],[payment_proof],[payment_type],[service_date],[service_id],[start_time],[trx],[updated_at],[user_id]) SELECT [BookingID],[amount],[charge],[created_at],[end_date],[end_time],[hours],[id],[is_accepted],[is_completed],[job_end],[location],[message],[payment_confirmed],[payment_proof],[payment_type],[service_date],[service_id],[start_time],[trx],[updated_at],[user_id] FROM [dbo].[bookings] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_bookings] OFF;
DROP TABLE [dbo].[bookings];
EXEC SP_RENAME N'dbo._prisma_new_bookings', N'bookings';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'failed_jobs'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_failed_jobs] (
    [id] FLOAT(53),
    [uuid] NVARCHAR(max),
    [connection] NVARCHAR(max),
    [queue] NVARCHAR(max),
    [payload] NVARCHAR(max),
    [exception] NVARCHAR(max),
    [failed_at] DATETIME,
    [failed_jobs_id] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__failed_j__BB09620F734B2573] PRIMARY KEY CLUSTERED ([failed_jobs_id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_failed_jobs] ON;
IF EXISTS(SELECT * FROM [dbo].[failed_jobs])
    EXEC('INSERT INTO [dbo].[_prisma_new_failed_jobs] ([connection],[exception],[failed_at],[failed_jobs_id],[id],[payload],[queue],[uuid]) SELECT [connection],[exception],[failed_at],[failed_jobs_id],[id],[payload],[queue],[uuid] FROM [dbo].[failed_jobs] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_failed_jobs] OFF;
DROP TABLE [dbo].[failed_jobs];
EXEC SP_RENAME N'dbo._prisma_new_failed_jobs', N'failed_jobs';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'foreign_gtins'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_foreign_gtins] (
    [id] NVARCHAR(1000) NOT NULL,
    [BrandName] VARCHAR(255) NOT NULL,
    [productnameenglish] VARCHAR(255) NOT NULL,
    [moName] VARCHAR(255),
    [barcode] VARCHAR(50) NOT NULL,
    [details_page] VARCHAR(255),
    [unit] VARCHAR(50),
    [front_image] NVARCHAR(255),
    [gpc] NVARCHAR(255),
    [gpc_code] NVARCHAR(255),
    [size] NVARCHAR(255),
    [countrySale] NVARCHAR(255),
    [user_id] NVARCHAR(1000),
    [admin_id] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [foreign_gtins_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [companyId] NVARCHAR(1000),
    CONSTRAINT [foreign_gtins_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[foreign_gtins])
    EXEC('INSERT INTO [dbo].[_prisma_new_foreign_gtins] ([BrandName],[admin_id],[barcode],[countrySale],[created_at],[details_page],[front_image],[gpc],[gpc_code],[id],[moName],[productnameenglish],[size],[unit],[updated_at],[user_id]) SELECT [BrandName],[admin_id],[barcode],[countrySale],[created_at],[details_page],[front_image],[gpc],[gpc_code],[id],[moName],[productnameenglish],[size],[unit],[updated_at],[user_id] FROM [dbo].[foreign_gtins] WITH (holdlock tablockx)');
DROP TABLE [dbo].[foreign_gtins];
EXEC SP_RENAME N'dbo._prisma_new_foreign_gtins', N'foreign_gtins';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'add_member_gln_products'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_add_member_gln_products] (
    [id] NVARCHAR(1000) NOT NULL,
    [product_id] NVARCHAR(1000),
    [reference_id] NVARCHAR(1000),
    [locationNameEn] NVARCHAR(max),
    [locationNameAr] NVARCHAR(max),
    [AddressEn] NVARCHAR(max),
    [AddressAr] NVARCHAR(max),
    [pobox] NVARCHAR(max),
    [postal_code] NVARCHAR(max),
    [country_id] NVARCHAR(1000),
    [state_id] NVARCHAR(1000),
    [city_id] NVARCHAR(1000),
    [licence_no] NVARCHAR(max),
    [locationCRNumber] NVARCHAR(max),
    [office_tel] NVARCHAR(max),
    [tel_extension] NVARCHAR(max),
    [office_fax] NVARCHAR(max),
    [fax_extension] NVARCHAR(max),
    [contact1Name] NVARCHAR(max),
    [contact1Email] NVARCHAR(max),
    [contact1Mobile] NVARCHAR(max),
    [contact2Name] NVARCHAR(max),
    [contact2Email] NVARCHAR(max),
    [contact2Mobile] NVARCHAR(max),
    [longitude] NVARCHAR(max),
    [latitude] NVARCHAR(max),
    [image] NVARCHAR(max),
    [GLNBarcodeNumber] NVARCHAR(max),
    [GLNBarcodeNumber_without_check] NVARCHAR(max),
    [status] NVARCHAR(1000),
    [user_id] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [add_member_gln_products_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [gcpGLNID] NCHAR(20),
    [deleted_at] DATETIME,
    [admin_id] VARCHAR(10) CONSTRAINT [DF_add_member_gln_products_admin_id] DEFAULT '0',
    CONSTRAINT [add_member_gln_products_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[add_member_gln_products])
    EXEC('INSERT INTO [dbo].[_prisma_new_add_member_gln_products] ([AddressAr],[AddressEn],[GLNBarcodeNumber],[GLNBarcodeNumber_without_check],[admin_id],[city_id],[contact1Email],[contact1Mobile],[contact1Name],[contact2Email],[contact2Mobile],[contact2Name],[country_id],[created_at],[deleted_at],[fax_extension],[gcpGLNID],[id],[image],[latitude],[licence_no],[locationCRNumber],[locationNameAr],[locationNameEn],[longitude],[office_fax],[office_tel],[pobox],[postal_code],[product_id],[reference_id],[state_id],[status],[tel_extension],[updated_at],[user_id]) SELECT [AddressAr],[AddressEn],[GLNBarcodeNumber],[GLNBarcodeNumber_without_check],[admin_id],[city_id],[contact1Email],[contact1Mobile],[contact1Name],[contact2Email],[contact2Mobile],[contact2Name],[country_id],[created_at],[deleted_at],[fax_extension],[gcpGLNID],[id],[image],[latitude],[licence_no],[locationCRNumber],[locationNameAr],[locationNameEn],[longitude],[office_fax],[office_tel],[pobox],[postal_code],[product_id],[reference_id],[state_id],[status],[tel_extension],[updated_at],[user_id] FROM [dbo].[add_member_gln_products] WITH (holdlock tablockx)');
DROP TABLE [dbo].[add_member_gln_products];
EXEC SP_RENAME N'dbo._prisma_new_add_member_gln_products', N'add_member_gln_products';
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
    [created_at] DATETIME2 NOT NULL CONSTRAINT [crs_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [crs_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    [isRegistered] INT NOT NULL CONSTRAINT [DF_crs_isRegistered] DEFAULT 0,
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
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'gtin_subscription_histories'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_gtin_subscription_histories] (
    [id] NVARCHAR(1000) NOT NULL,
    [react_no] INT,
    [transaction_id] NVARCHAR(1000),
    [pkg_id] NVARCHAR(1000) NOT NULL,
    [pkg_date] DATETIME CONSTRAINT [gtin_subscription_histories_pkg_date_df] DEFAULT CURRENT_TIMESTAMP,
    [user_id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53),
    [request_type] NVARCHAR(max),
    [document] NVARCHAR(max),
    [payment_type] NVARCHAR(max),
    [status] VARCHAR(10) CONSTRAINT [DF_gtin_subscription_histories_status] DEFAULT 'pending',
    [createdBy] INT CONSTRAINT [DF_gtin_subscription_histories_createdBy] DEFAULT 0,
    [created_at] DATETIME CONSTRAINT [gtin_subscription_histories_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME,
    [expiry_date] DATETIME,
    [admin_id] NVARCHAR(1000),
    [additional_products_id] NVARCHAR(1000),
    CONSTRAINT [gtin_subscription_histories_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[gtin_subscription_histories])
    EXEC('INSERT INTO [dbo].[_prisma_new_gtin_subscription_histories] ([createdBy],[created_at],[deleted_at],[document],[expiry_date],[id],[payment_type],[pkg_date],[pkg_id],[price],[react_no],[request_type],[status],[transaction_id],[updated_at],[user_id]) SELECT [createdBy],[created_at],[deleted_at],[document],[expiry_date],[id],[payment_type],[pkg_date],[pkg_id],[price],[react_no],[request_type],[status],[transaction_id],[updated_at],[user_id] FROM [dbo].[gtin_subscription_histories] WITH (holdlock tablockx)');
DROP TABLE [dbo].[gtin_subscription_histories];
EXEC SP_RENAME N'dbo._prisma_new_gtin_subscription_histories', N'gtin_subscription_histories';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'mega_menus'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_mega_menus] (
    [id] NVARCHAR(1000) NOT NULL,
    [name_en] NVARCHAR(max),
    [name_ar] NVARCHAR(max),
    [status] INT NOT NULL,
    [created_at] DATETIME CONSTRAINT [mega_menus_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [mega_menus_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [mega_menus_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[mega_menus])
    EXEC('INSERT INTO [dbo].[_prisma_new_mega_menus] ([created_at],[id],[name_ar],[name_en],[status],[updated_at]) SELECT [created_at],[id],[name_ar],[name_en],[status],[updated_at] FROM [dbo].[mega_menus] WITH (holdlock tablockx)');
DROP TABLE [dbo].[mega_menus];
EXEC SP_RENAME N'dbo._prisma_new_mega_menus', N'mega_menus';
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'reviews'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_reviews] (
    [id] FLOAT(53),
    [service_id] FLOAT(53),
    [user_id] FLOAT(53),
    [review] FLOAT(53),
    [review_message] NVARCHAR(max),
    [status] FLOAT(53),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [ReviewID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__reviews__74BC79AE5D2369AC] PRIMARY KEY CLUSTERED ([ReviewID])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_reviews] ON;
IF EXISTS(SELECT * FROM [dbo].[reviews])
    EXEC('INSERT INTO [dbo].[_prisma_new_reviews] ([ReviewID],[created_at],[id],[review],[review_message],[service_id],[status],[updated_at],[user_id]) SELECT [ReviewID],[created_at],[id],[review],[review_message],[service_id],[status],[updated_at],[user_id] FROM [dbo].[reviews] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_reviews] OFF;
DROP TABLE [dbo].[reviews];
EXEC SP_RENAME N'dbo._prisma_new_reviews', N'reviews';
COMMIT;

-- AddForeignKey
ALTER TABLE [dbo].[AdminRole] ADD CONSTRAINT [AdminRole_adminId_fkey] FOREIGN KEY ([adminId]) REFERENCES [dbo].[admins]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AdminRole] ADD CONSTRAINT [AdminRole_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RolePermission] ADD CONSTRAINT [RolePermission_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RolePermission] ADD CONSTRAINT [RolePermission_permissionId_fkey] FOREIGN KEY ([permissionId]) REFERENCES [dbo].[Permission]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[rejected_carts] ADD CONSTRAINT [rejected_carts_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[rejected_users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[admin_history_logs] ADD CONSTRAINT [admin_history_logs_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[admin_history_logs] ADD CONSTRAINT [admin_history_logs_admin_id_fkey] FOREIGN KEY ([admin_id]) REFERENCES [dbo].[admins]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[add_gln_cart] ADD CONSTRAINT [add_gln_cart_new_gln_id_fkey] FOREIGN KEY ([new_gln_id]) REFERENCES [dbo].[gln_upgrade_pricing]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[add_gln_cart] ADD CONSTRAINT [add_gln_cart_other_products_subscription_id_fkey] FOREIGN KEY ([other_products_subscription_id]) REFERENCES [dbo].[other_products_subcriptions]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
