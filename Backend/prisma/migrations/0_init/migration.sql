BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[add_member_gln_products] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [product_id] INT,
    [reference_id] INT,
    [locationNameEn] NVARCHAR(max),
    [locationNameAr] NVARCHAR(max),
    [AddressEn] NVARCHAR(max),
    [AddressAr] NVARCHAR(max),
    [pobox] NVARCHAR(max),
    [postal_code] NVARCHAR(max),
    [country_id] INT,
    [state_id] INT,
    [city_id] INT,
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
    [status] INT,
    [user_id] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [gcpGLNID] NCHAR(20),
    [deleted_at] DATETIME,
    [admin_id] INT CONSTRAINT [DF_add_member_gln_products_admin_id] DEFAULT 0,
    CONSTRAINT [PK_add_member_gln_products] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[add_member_sscc_products] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [sscc_type] NVARCHAR(max),
    [product_id] INT,
    [reference_id] INT,
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
    [user_id] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [gcpGLNID] CHAR(20),
    [deleted_at] DATETIME,
    CONSTRAINT [PK_add_member_sscc_products] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[admin_test] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [created_at] DATETIME2 CONSTRAINT [admin_test_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    CONSTRAINT [admin_test_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[admins] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] NVARCHAR(max),
    [group_id] INT,
    [email] NVARCHAR(max),
    [password] NVARCHAR(max),
    [image] NVARCHAR(max),
    [mobile] NVARCHAR(max),
    [status] INT,
    [verification_code] NVARCHAR(max),
    [remember_token] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_admins] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[attribute_values] (
    [id] FLOAT(53),
    [attributes_value_code] NVARCHAR(max),
    [attributes_value_title] NVARCHAR(max),
    [attributes_value_definition] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [AttributeValueID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__attribut__335E22569F6BC69D] PRIMARY KEY CLUSTERED ([AttributeValueID])
);

-- CreateTable
CREATE TABLE [dbo].[attributes] (
    [id] FLOAT(53),
    [attributes_code] NVARCHAR(max),
    [attributes_title] NVARCHAR(max),
    [attributes_definition] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [AttributeID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__attribut__C189298AD25B931E] PRIMARY KEY CLUSTERED ([AttributeID])
);

-- CreateTable
CREATE TABLE [dbo].[auto_generated_documents] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [type] NVARCHAR(255) NOT NULL,
    [document] NVARCHAR(255) NOT NULL,
    [date] DATETIME NOT NULL,
    [user_id] INT NOT NULL CONSTRAINT [DF__auto_gene__user___7DEDA633] DEFAULT 0,
    [admin_id] INT NOT NULL CONSTRAINT [DF__auto_gene__admin__7EE1CA6C] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [doc_type] VARCHAR(20) CONSTRAINT [DF__auto_gene__doc_t__5887175A] DEFAULT 'auto_document',
    CONSTRAINT [PK__auto_gen__3213E83FB3233DD8] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[bank_slips] (
    [id] INT NOT NULL IDENTITY(1,1),
    [transaction_id] INT,
    [details] NVARCHAR(max),
    [documents] NVARCHAR(max),
    [status] VARCHAR(10) CONSTRAINT [DF_bank_slips_status] DEFAULT 'pending',
    [user_id] INT CONSTRAINT [DF_bank_slips_user_id] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    [admin_id] VARCHAR(10) CONSTRAINT [DF_bank_slips_admin_id] DEFAULT '0',
    [reject_reason] TEXT,
    CONSTRAINT [PK_bank_slips] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[blog_categories] (
    [id] BIGINT,
    [name] NVARCHAR(max),
    [slug] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [BlogCategoryID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__blog_cat__6BD2DA61FF59A720] PRIMARY KEY CLUSTERED ([BlogCategoryID])
);

-- CreateTable
CREATE TABLE [dbo].[blog_comments] (
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

-- CreateTable
CREATE TABLE [dbo].[board_members] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [job_title] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(max),
    [image] NVARCHAR(255) NOT NULL,
    [addedBy] TINYINT NOT NULL,
    [status] TINYINT NOT NULL CONSTRAINT [DF__board_mem__statu__3726238F] DEFAULT 1,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__board_me__3213E83FCC16072D] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[bookings] (
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

-- CreateTable
CREATE TABLE [dbo].[brands] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [name_ar] NVARCHAR(255) NOT NULL,
    [status] NVARCHAR(255) NOT NULL CONSTRAINT [DF__brands__status__092A4EB5] DEFAULT 'inactive',
    [user_id] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__brands__3213E83F8E9220FB] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[brandsForApproval] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [name_ar] NVARCHAR(255) NOT NULL,
    [status] NVARCHAR(255) NOT NULL,
    [user_id] INT NOT NULL,
    [companyID] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__brandsFo__3213E83F4A503AE0] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[bricks] (
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

-- CreateTable
CREATE TABLE [dbo].[carts] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [transaction_id] INT,
    [date] NVARCHAR(255),
    [cart_items] NVARCHAR(max),
    [total] FLOAT(53),
    [documents] NVARCHAR(max),
    [file_path] NVARCHAR(max),
    [request_type] NVARCHAR(max),
    [payment_type] NVARCHAR(max),
    [payment_status] NVARCHAR(max),
    [user_id] INT CONSTRAINT [DF_carts_user_id] DEFAULT 0,
    [status] VARCHAR(10) CONSTRAINT [DF_carts_status] DEFAULT 'pending',
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    [reject_reason] TEXT,
    [reject_by] INT,
    [receipt] TEXT,
    [receipt_path] NVARCHAR(max),
    [admin_id] INT CONSTRAINT [DF_carts_admin_id] DEFAULT 0,
    [assign_to] INT CONSTRAINT [DF_carts_assign_to] DEFAULT 0,
    [discount] FLOAT(53) CONSTRAINT [DF_carts_discount] DEFAULT 0,
    CONSTRAINT [PK_carts] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[categories] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max),
    [image] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_categories] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[chats] (
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

-- CreateTable
CREATE TABLE [dbo].[cities] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max),
    [state_id] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_cities] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[classes] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [class_code] NVARCHAR(max),
    [class_title] NVARCHAR(max),
    [class_definition] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_classes] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[company_details] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(max),
    [account_no] NVARCHAR(max),
    [iban_no] NVARCHAR(max),
    [bank_name] NVARCHAR(max),
    [bank_swift_code] NVARCHAR(max),
    [email] NVARCHAR(max),
    [mobile] NVARCHAR(max),
    [fax] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_company_details] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[cookie_consents] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [allow_modal] INT,
    [button_text] NVARCHAR(max),
    [cookie_text] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_cookie_consents] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[countries] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name_en] NVARCHAR(max),
    [name_ar] NVARCHAR(max),
    [country_code] NVARCHAR(max),
    [country_shortName] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_countries] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[country_of_sales] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [Alpha2] NVARCHAR(255) NOT NULL,
    [Alpha3] NVARCHAR(255) NOT NULL,
    [country_code_numeric3] NVARCHAR(255) NOT NULL,
    [country_name] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__country___3213E83F52C909D1] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[cr_documents] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_cr_documents] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[crs] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [cr] NVARCHAR(max),
    [activity] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_crs] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[email_reminders] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [transaction_id] INT,
    [subject] NVARCHAR(max),
    [message] NVARCHAR(max),
    [images] NVARCHAR(max),
    [sendBy] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_email_reminders] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[email_templates] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max),
    [subject] NVARCHAR(max),
    [template] NVARCHAR(max),
    [meaning] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_email_templates] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[failed_jobs] (
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

-- CreateTable
CREATE TABLE [dbo].[families] (
    [id] FLOAT(53),
    [family_code] NVARCHAR(max),
    [family_title] NVARCHAR(max),
    [family_definition] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [FamilyID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__families__41D82F4B3DCAE285] PRIMARY KEY CLUSTERED ([FamilyID])
);

-- CreateTable
CREATE TABLE [dbo].[faq_categories] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_faq_categories] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[featured_articales] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(max),
    [title_ar] NVARCHAR(max),
    [image] NVARCHAR(max),
    [date] NVARCHAR(255),
    [link] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_featured_articales] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[featured_services] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [image] NVARCHAR(max),
    [link] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_featured_services] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[footer_menus] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [parent_id] INT,
    [category_name_en] NVARCHAR(max),
    [category_name_ar] NVARCHAR(max),
    [url] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_footer_menus] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[foreign_barcodes_downloads] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [date] DATE NOT NULL,
    [document] NVARCHAR(max) NOT NULL,
    [user_id] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__foreign___3213E83FE54D487A] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[foreign_gtins] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
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
    [user_id] INT NOT NULL CONSTRAINT [DF__foreign_g__user___75C27486] DEFAULT 0,
    [admin_id] INT NOT NULL CONSTRAINT [DF__foreign_g__admin__76B698BF] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__foreign___3213E83F3120CA0A] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[g_c_p_information] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
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
    [user_id] INT,
    [certificate] NVARCHAR(max),
    [certificate_ar] NVARCHAR(max),
    [receipt] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    [gepirPosted] NCHAR(10) CONSTRAINT [DF_g_c_p_information_gepirPosted] DEFAULT '0',
    [updateable] NCHAR(1) CONSTRAINT [DF_g_c_p_information_updateable] DEFAULT '0',
    CONSTRAINT [PK_g_c_p_information] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gateways] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [gateway_name] NVARCHAR(max),
    [gateway_image] NVARCHAR(max),
    [gateway_parameters] NVARCHAR(max),
    [gateway_type] FLOAT(53),
    [user_proof_param] NVARCHAR(max),
    [rate] FLOAT(53),
    [charge] FLOAT(53),
    [status] FLOAT(53),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_gateways] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gcp_histories] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [date] NVARCHAR(255),
    [company_gpc] NVARCHAR(max),
    [gtin_order] VARCHAR(50),
    [reference_id] INT,
    [certificate] NVARCHAR(max),
    [receipt] NVARCHAR(max),
    [user_id] INT,
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    CONSTRAINT [PK_gcp_histories] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gcp_types] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [gcp_code] NVARCHAR(255) NOT NULL,
    [gcp_description] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__gcp_type__3213E83FD86DB395] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[general_settings] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [sitename] NVARCHAR(max),
    [sitename_ar] NVARCHAR(max),
    [title] NVARCHAR(max),
    [title_ar] NVARCHAR(max),
    [commission] INT,
    [email_method] NVARCHAR(max),
    [smtp_config] NVARCHAR(max),
    [site_currency] NVARCHAR(max),
    [currency_icon] NVARCHAR(max),
    [user_reg] INT,
    [blog_comment] INT,
    [login_page] NVARCHAR(max),
    [logo] NVARCHAR(max),
    [default_image] NVARCHAR(max),
    [service_default_image] NVARCHAR(max),
    [icon] NVARCHAR(max),
    [color] NVARCHAR(max),
    [secondary_color] NVARCHAR(max),
    [email_from] NVARCHAR(max),
    [allow_recaptcha] INT,
    [recaptcha_key] NVARCHAR(max),
    [recaptcha_secret] NVARCHAR(max),
    [twak_allow] INT,
    [twak_key] NVARCHAR(max),
    [seo_description] NVARCHAR(max),
    [preloader_status] INT,
    [preloader_image] NVARCHAR(max),
    [analytics_key] NVARCHAR(max),
    [analytics_status] INT,
    [fb_app_key] NVARCHAR(max),
    [api_token] NVARCHAR(max),
    [talk_to_gs1] NVARCHAR(max),
    [font_family] NVARCHAR(max),
    [cr_activity] NVARCHAR(max),
    [issuer_gln] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [video_link] TEXT,
    [pdf_link] TEXT,
    [gcp_certificate_detail1] TEXT,
    [gcp_certificate_detail2] TEXT,
    [gcp_legal_detail] TEXT,
    [gcp_certificate_detail_ar1] NVARCHAR(max),
    [gcp_certificate_detail_ar2] NVARCHAR(max),
    [gcp_legal_detail_ar] NVARCHAR(max),
    [terms_conditions] VARCHAR(50),
    [chat_id] NVARCHAR(50),
    CONSTRAINT [PK_general_settings] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gepir_items] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [barcode] INT NOT NULL,
    [gcpGLNID] INT NOT NULL,
    [dateTimePost] DATETIME NOT NULL,
    [addedBy] INT NOT NULL CONSTRAINT [DF__gepir_ite__added__76177A41] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__gepir_it__3213E83F4C68B859] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gpc_classes] (
    [id] FLOAT(53),
    [class_code] NVARCHAR(max),
    [class_title] NVARCHAR(max),
    [class_definition] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [GpcClassID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__gpc_clas__E140D1DA7E572618] PRIMARY KEY CLUSTERED ([GpcClassID])
);

-- CreateTable
CREATE TABLE [dbo].[group_modules] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [module_name] VARCHAR(50),
    [module_page] VARCHAR(50),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_group_modules] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[group_permissions] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [group_id] INT,
    [module_id] INT,
    [module_name] NVARCHAR(max),
    [module_page] NVARCHAR(max),
    [access] VARCHAR(1),
    [view] INT,
    [add] INT,
    [edit] INT,
    [delete] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_group_permissions] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[groups] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_groups] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gtin_compliants] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [gcpGLNID] NVARCHAR(255) NOT NULL,
    [type] NVARCHAR(255) NOT NULL CONSTRAINT [DF__gtin_compl__type__30441BD6] DEFAULT 'compliant',
    [productnameenglish] NVARCHAR(255),
    [productnamearabic] NVARCHAR(255),
    [BrandName] NVARCHAR(255),
    [BrandNameAr] NVARCHAR(255),
    [ProductType] NVARCHAR(255),
    [Origin] NVARCHAR(255),
    [countrySale] NVARCHAR(255),
    [PackagingType] NVARCHAR(255),
    [ProvGLN] NVARCHAR(255),
    [unit] NVARCHAR(255) NOT NULL,
    [size] NVARCHAR(255) NOT NULL,
    [front_image] NVARCHAR(255),
    [back_image] NVARCHAR(255),
    [childProduct] NVARCHAR(255),
    [quantity] NVARCHAR(255),
    [barcode] NVARCHAR(255),
    [gpc] NVARCHAR(255),
    [gpc_code] NVARCHAR(255),
    [gcp_type] NVARCHAR(255),
    [HSCODES] NVARCHAR(255),
    [HsDescription] NVARCHAR(max),
    [prod_lang] NVARCHAR(255),
    [details_page] NVARCHAR(max),
    [details_page_ar] NVARCHAR(max),
    [status] TINYINT NOT NULL CONSTRAINT [DF__gtin_comp__statu__3138400F] DEFAULT 1,
    [save_as] NVARCHAR(255),
    [gtin_type] NVARCHAR(255),
    [product_url] NVARCHAR(255),
    [product_link_url] NVARCHAR(255),
    [added_by] INT NOT NULL CONSTRAINT [DF__gtin_comp__added__322C6448] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [companyID] NVARCHAR(50),
    CONSTRAINT [PK__gtin_com__3213E83FA58E192E] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gtin_helper_reports] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [report_barcode] NVARCHAR(255) NOT NULL,
    [report_comment] NVARCHAR(255) NOT NULL,
    [report_action] NVARCHAR(255) NOT NULL,
    [report_images] NVARCHAR(max) NOT NULL,
    [report_status] INT NOT NULL CONSTRAINT [DF_gtin_helper_reports_report_status] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [reporter_email] VARCHAR(50),
    CONSTRAINT [PK__gtin_hel__3213E83FEEB618AB] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gtin_non_compliants] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [gcpGLNID] NVARCHAR(255) NOT NULL,
    [type] NVARCHAR(255) NOT NULL CONSTRAINT [DF__gtin_non_c__type__3508D0F3] DEFAULT 'non_compliant',
    [productnameenglish] NVARCHAR(255),
    [productnamearabic] NVARCHAR(255),
    [BrandName] NVARCHAR(255),
    [BrandNameAr] NVARCHAR(255),
    [ProductType] NVARCHAR(255),
    [Origin] NVARCHAR(255),
    [countrySale] NVARCHAR(255),
    [PackagingType] NVARCHAR(255),
    [ProvGLN] NVARCHAR(255),
    [unit] NVARCHAR(255) NOT NULL,
    [size] NVARCHAR(255) NOT NULL,
    [front_image] NVARCHAR(255),
    [back_image] NVARCHAR(255),
    [childProduct] NVARCHAR(255),
    [quantity] NVARCHAR(255),
    [barcode] NVARCHAR(255),
    [gpc] NVARCHAR(255),
    [gpc_code] NVARCHAR(255),
    [gcp_type] NVARCHAR(255),
    [HSCODES] NVARCHAR(255),
    [HsDescription] NVARCHAR(max),
    [prod_lang] NVARCHAR(255),
    [details_page] NVARCHAR(max),
    [details_page_ar] NVARCHAR(max),
    [status] TINYINT NOT NULL CONSTRAINT [DF__gtin_non___statu__35FCF52C] DEFAULT 1,
    [save_as] NVARCHAR(255),
    [gtin_type] NVARCHAR(255),
    [product_url] NVARCHAR(255),
    [product_link_url] NVARCHAR(255),
    [added_by] INT NOT NULL CONSTRAINT [DF__gtin_non___added__36F11965] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [companyID] NVARCHAR(50),
    CONSTRAINT [PK__gtin_non__3213E83FF5E27840] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gtin_products] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
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
    CONSTRAINT [PK_gtin_products] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gtin_subcriptions] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
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
    CONSTRAINT [PK_gtin_subcriptions] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[gtin_subscription_histories] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [react_no] INT,
    [transaction_id] INT,
    [pkg_id] INT,
    [pkg_date] DATETIME,
    [user_id] INT CONSTRAINT [DF_gtin_subscription_histories_user_id] DEFAULT 0,
    [price] FLOAT(53),
    [request_type] NVARCHAR(max),
    [document] NVARCHAR(max),
    [payment_type] NVARCHAR(max),
    [status] VARCHAR(10) CONSTRAINT [DF_gtin_subscription_histories_status] DEFAULT 'pending',
    [createdBy] INT CONSTRAINT [DF_gtin_subscription_histories_createdBy] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    [expiry_date] DATETIME,
    CONSTRAINT [PK_gtin_subscription_histories] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[help_desk_comments] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [helpDeskID] INT,
    [comment] NVARCHAR(max),
    [document] NVARCHAR(max),
    [commentByAdmin] INT,
    [commentByUser] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_help_desk_comments] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[help_desks] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(max),
    [email] NVARCHAR(max),
    [ticket_no] NVARCHAR(max),
    [description] NVARCHAR(max),
    [document] NVARCHAR(max),
    [user_id] INT,
    [assignedTo] INT,
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    CONSTRAINT [PK_help_desks] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[hs_codes] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [CNKEY] NVARCHAR(255) NOT NULL,
    [HSCODES] NVARCHAR(255) NOT NULL,
    [DescriptionEN] NVARCHAR(max) NOT NULL,
    [addBy] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__hs_codes__3213E83F1BC26C90] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[issuing_agencies] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__issuing___3213E83FA1EEA59D] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[languages] (
    [id] FLOAT(53),
    [type] NVARCHAR(max),
    [key] NVARCHAR(max),
    [value] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [LanguageID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__language__B938558B03AB874B] PRIMARY KEY CLUSTERED ([LanguageID])
);

-- CreateTable
CREATE TABLE [dbo].[locations] (
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

-- CreateTable
CREATE TABLE [dbo].[log_activities] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [subject] NVARCHAR(max),
    [url] NVARCHAR(max),
    [method] NVARCHAR(max),
    [ip] NVARCHAR(max),
    [agent] NVARCHAR(max),
    [admin_id] INT,
    [date] NVARCHAR(255),
    [read_status] CHAR(1) CONSTRAINT [DF_log_activities_read_status] DEFAULT '0',
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    [admin] NVARCHAR(50),
    CONSTRAINT [PK_log_activities] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[markeing_emails] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [emails] NVARCHAR(max),
    [otherEmails] NVARCHAR(max),
    [subject] NVARCHAR(max),
    [message] NVARCHAR(max),
    [sendBy] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_markeing_emails] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mega_menu_categories] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [parent_id] INT,
    [megamenu_id] INT,
    [category_name_en] NVARCHAR(max),
    [category_name_ar] NVARCHAR(max),
    [description] NVARCHAR(max),
    [url] NVARCHAR(max),
    [meta_title] NVARCHAR(max),
    [meta_description] NVARCHAR(max),
    [meta_keywords] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_mega_menu_categories] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mega_menus] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name_en] NVARCHAR(max),
    [name_ar] NVARCHAR(max),
    [status] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_mega_menus] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mema_descriptions] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(255) NOT NULL,
    [header] NVARCHAR(max),
    [points] NVARCHAR(max) NOT NULL,
    [footer] NVARCHAR(255) NOT NULL,
    [video_link] NVARCHAR(255) NOT NULL,
    [video_background] NVARCHAR(255) NOT NULL,
    [created_by] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [title_ar] NVARCHAR(255),
    [header_ar] NVARCHAR(255),
    [points_ar] NVARCHAR(max),
    [footer_ar] NVARCHAR(255),
    CONSTRAINT [PK__mema_des__3213E83F163AC458] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mema_galleries] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(255) NOT NULL,
    [images] NVARCHAR(max) NOT NULL,
    [status] NVARCHAR(255) NOT NULL,
    [created_by] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [link] TEXT,
    CONSTRAINT [PK__mema_gal__3213E83F333FDA2E] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mema_hotels] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [status] NVARCHAR(255) NOT NULL,
    [added_by] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__mema_hot__3213E83FA25533FE] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mema_pages] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [mema_page] NVARCHAR(255) NOT NULL,
    [linked_page] NVARCHAR(255) NOT NULL,
    [image] NVARCHAR(255) NOT NULL,
    [status] NVARCHAR(255) NOT NULL,
    [created_by] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [mema_page_ar] NVARCHAR(255),
    CONSTRAINT [PK__mema_pag__3213E83FCEB61ED0] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mema_registrations] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [registration_type] NVARCHAR(max) NOT NULL,
    [fname] NVARCHAR(255) NOT NULL,
    [lname] NVARCHAR(255) NOT NULL,
    [company] NVARCHAR(255) NOT NULL,
    [job_title] NVARCHAR(255) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [mobile] NVARCHAR(255) NOT NULL,
    [visa_invitation] NVARCHAR(255),
    [hotel] NVARCHAR(255),
    [arrival_date] DATETIME,
    [departure_date] DATETIME,
    [status] NVARCHAR(255) NOT NULL CONSTRAINT [DF__mema_regi__statu__1F198FD4] DEFAULT 'pending',
    [approved_by] INT NOT NULL CONSTRAINT [DF__mema_regi__appro__200DB40D] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [nationality] NVARCHAR(50),
    [date_of_birth] DATETIME,
    [place_of_country] NVARCHAR(50),
    [place_of_city] NVARCHAR(50),
    [document_number] NVARCHAR(50),
    [date_of_expiry] DATETIME,
    [gs1_mo] VARCHAR(5),
    [registration_date] DATETIME,
    CONSTRAINT [PK__mema_reg__3213E83FABE71AB3] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mema_sessions] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [dateTime] DATE NOT NULL,
    [time] NVARCHAR(255) NOT NULL,
    [title] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [speakers] NVARCHAR(255) NOT NULL,
    [link] NVARCHAR(255) NOT NULL,
    [is_featured] NVARCHAR(255) NOT NULL,
    [added_by] INT NOT NULL,
    [status] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [meet_link] TEXT,
    CONSTRAINT [PK__mema_ses__3213E83F9CA4875A] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mema_sliders] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [slider] NVARCHAR(255) NOT NULL,
    [status] NVARCHAR(255) NOT NULL,
    [created_by] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__mema_sli__3213E83F01F64AB1] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mema_speakers] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [avatar] NVARCHAR(255) NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    [designation] NVARCHAR(255) NOT NULL,
    [added_by] INT NOT NULL,
    [status] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__mema_spe__3213E83FC051F9BE] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mema_travel_advice] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [thumbnail] NVARCHAR(255) NOT NULL,
    [title] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [gallery] NVARCHAR(max) NOT NULL,
    [status] NVARCHAR(255) NOT NULL,
    [added_by] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [link] NVARCHAR(max),
    CONSTRAINT [PK__mema_tra__3213E83F06F658D6] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mema_visas] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [title] NVARCHAR(255) NOT NULL,
    [image] NVARCHAR(255) NOT NULL,
    [status] NVARCHAR(255) NOT NULL,
    [created_by] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__mema_vis__3213E83FF4D676D4] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[member_documents] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [type] NVARCHAR(255) NOT NULL,
    [document] NVARCHAR(max) NOT NULL,
    [transaction_id] NVARCHAR(255) NOT NULL CONSTRAINT [DF__member_do__trans__01BE3717] DEFAULT '0',
    [date] DATETIME NOT NULL,
    [user_id] INT NOT NULL CONSTRAINT [DF__member_do__user___02B25B50] DEFAULT 0,
    [admin_id] INT NOT NULL CONSTRAINT [DF__member_do__admin__03A67F89] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [doc_type] VARCHAR(20) CONSTRAINT [DF_member_documents_doc_type] DEFAULT 'member_document',
    CONSTRAINT [PK__member_d__3213E83F21EDA6EA] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[member_history_logs] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [subject] NVARCHAR(255) NOT NULL,
    [member_id] INT,
    [date] DATETIME,
    [admin_id] INT NOT NULL CONSTRAINT [DF__member_hi__admin__78F3E6EC] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__member_h__3213E83FE53CC71F] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[member_important_notifications] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [subject] NVARCHAR(max),
    [url] NVARCHAR(max),
    [method] NVARCHAR(max),
    [ip] NVARCHAR(max),
    [agent] NVARCHAR(max),
    [user_id] NVARCHAR(max),
    [date] NVARCHAR(255),
    [read_status] CHAR(1) CONSTRAINT [DF_member_important_notifications_read_status] DEFAULT '0',
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    [user] NVARCHAR(max),
    CONSTRAINT [PK_member_important_notifications] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[member_log_activities] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [subject] NVARCHAR(max),
    [url] NVARCHAR(max),
    [method] NVARCHAR(max),
    [ip] NVARCHAR(max),
    [agent] NVARCHAR(max),
    [user_id] NVARCHAR(max),
    [date] NVARCHAR(255),
    [read_status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    [user] NVARCHAR(max),
    CONSTRAINT [PK_member_log_activities] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[member_migration_temp] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [memberID] INT NOT NULL,
    [MemberNameE] NVARCHAR(255) NOT NULL,
    [MemberNameA] NVARCHAR(255) NOT NULL,
    [Email] NVARCHAR(255) NOT NULL,
    [mobile] NVARCHAR(255) NOT NULL,
    [Product] NVARCHAR(max) NOT NULL,
    [Status] NVARCHAR(255) NOT NULL,
    [attachments] NVARCHAR(max) NOT NULL,
    [migrate_status] INT NOT NULL CONSTRAINT [DF__member_mi__migra__63F8CA06] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [membership_category] NVARCHAR(50),
    [membership_otherCategory] NVARCHAR(50),
    [address] NVARCHAR(max),
    [MainMobile] NVARCHAR(50),
    [CompanyID] NVARCHAR(max),
    CONSTRAINT [PK__member_m__3213E83FFA6653A6] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[member_other_products] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
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
    [user_id] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_member_other_products] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[MemberDocumentOld] (
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

-- CreateTable
CREATE TABLE [dbo].[membership_range_increases] (
    [id] FLOAT(53),
    [member_category_id] FLOAT(53),
    [range_start] FLOAT(53),
    [range_end] FLOAT(53),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [MembershipRangeIncreaseID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__membersh__9E0FEC6F62A68910] PRIMARY KEY CLUSTERED ([MembershipRangeIncreaseID])
);

-- CreateTable
CREATE TABLE [dbo].[membership_ranges] (
    [id] FLOAT(53),
    [member_category_id] FLOAT(53),
    [range_start] FLOAT(53),
    [range_end] FLOAT(53),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [MembershipRangeID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__membersh__41FFC3EC023AEE6F] PRIMARY KEY CLUSTERED ([MembershipRangeID])
);

-- CreateTable
CREATE TABLE [dbo].[membership_type_fees] (
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

-- CreateTable
CREATE TABLE [dbo].[membership_types] (
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

-- CreateTable
CREATE TABLE [dbo].[migrated_users] (
    [loginid] VARCHAR(100),
    [loginpass] VARCHAR(50),
    [status] VARCHAR(1) CONSTRAINT [DF_migrated_users_status] DEFAULT '0',
    [MigratedUserID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__migrated__3BAC2519CAF02728] PRIMARY KEY CLUSTERED ([MigratedUserID])
);

-- CreateTable
CREATE TABLE [dbo].[migration_activities] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [subject] NVARCHAR(255) NOT NULL,
    [url] NVARCHAR(255) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [ip] NVARCHAR(255) NOT NULL,
    [agent] NVARCHAR(255),
    [member_id] INT,
    [date] DATETIME,
    [read_status] INT NOT NULL CONSTRAINT [DF__migration__read___705EA0EB] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__migratio__3213E83FF2F92D3F] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[migration_data_policies] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [terms_conditions_en] NVARCHAR(max),
    [terms_conditions_ar] NVARCHAR(max),
    [addedBy] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__migratio__3213E83F308F849F] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[migrations] (
    [id] INT NOT NULL IDENTITY(1,1),
    [migration] NVARCHAR(max),
    [batch] FLOAT(53),
    CONSTRAINT [PK_migrations] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mri_statuses] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__mri_stat__3213E83F3B6F635C] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[my_downloads] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [date] NVARCHAR(255),
    [document] NVARCHAR(max),
    [user_id] INT,
    [admin_id] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_my_downloads] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[oauth_access_tokens] (
    [id] NVARCHAR(100) NOT NULL,
    [user_id] BIGINT,
    [client_id] BIGINT NOT NULL,
    [name] NVARCHAR(255),
    [scopes] NVARCHAR(max),
    [revoked] BIT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [expires_at] DATETIME,
    CONSTRAINT [oauth_access_tokens_id_primary] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[oauth_auth_codes] (
    [id] NVARCHAR(100) NOT NULL,
    [user_id] BIGINT NOT NULL,
    [client_id] BIGINT NOT NULL,
    [scopes] NVARCHAR(max),
    [revoked] BIT NOT NULL,
    [expires_at] DATETIME,
    CONSTRAINT [oauth_auth_codes_id_primary] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[oauth_clients] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [user_id] BIGINT,
    [name] NVARCHAR(255) NOT NULL,
    [secret] NVARCHAR(100),
    [provider] NVARCHAR(255),
    [redirect] NVARCHAR(max) NOT NULL,
    [personal_access_client] BIT NOT NULL,
    [password_client] BIT NOT NULL,
    [revoked] BIT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__oauth_cl__3213E83FE02DD474] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[oauth_personal_access_clients] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [client_id] BIGINT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__oauth_pe__3213E83F8FE34030] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[oauth_refresh_tokens] (
    [id] NVARCHAR(100) NOT NULL,
    [access_token_id] NVARCHAR(100) NOT NULL,
    [revoked] BIT NOT NULL,
    [expires_at] DATETIME,
    CONSTRAINT [oauth_refresh_tokens_id_primary] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[old_inactive_members] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [date] DATETIME NOT NULL,
    [companyID] NVARCHAR(255) NOT NULL,
    [companyName] NVARCHAR(255) NOT NULL,
    [Email] NVARCHAR(255) NOT NULL,
    [MainMobile] NVARCHAR(255) NOT NULL,
    [discount] FLOAT(53) NOT NULL CONSTRAINT [DF__old_inact__disco__0DEF03D2] DEFAULT 0,
    [amount] FLOAT(53) NOT NULL CONSTRAINT [DF__old_inact__amoun__0EE3280B] DEFAULT 0,
    [attachments] NVARCHAR(max),
    [reject_reason] NVARCHAR(max),
    [status] NVARCHAR(255) NOT NULL CONSTRAINT [DF__old_inact__statu__0FD74C44] DEFAULT 'pending',
    [req_by_admin] TINYINT NOT NULL CONSTRAINT [DF__old_inact__req_b__10CB707D] DEFAULT 0,
    [approve_by_admin] TINYINT NOT NULL CONSTRAINT [DF__old_inact__appro__11BF94B6] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [bankslip] NCHAR(10) CONSTRAINT [DF_old_inactive_members_bankslip] DEFAULT '0',
    [bankslipDoc] NVARCHAR(max),
    CONSTRAINT [PK__old_inac__3213E83F5B1147E8] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[old_member_email_reminders] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [date] DATETIME NOT NULL,
    [IntID] NVARCHAR(255) NOT NULL,
    [subject] NVARCHAR(255) NOT NULL,
    [message] NVARCHAR(max) NOT NULL,
    [attachments] NVARCHAR(max) NOT NULL,
    [sendBy] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__old_memb__3213E83F23F13EE4] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[old_member_reneweds] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [MemberID] NVARCHAR(255),
    [UserID] NVARCHAR(255),
    [MemberNameE] NVARCHAR(255),
    [MemberNameA] NVARCHAR(255),
    [MemberType] NVARCHAR(255),
    [Address1] NVARCHAR(max),
    [Address2] NVARCHAR(max),
    [POBox] NVARCHAR(255),
    [CityID] NVARCHAR(255),
    [Phone1] NVARCHAR(255),
    [Phone2] NVARCHAR(255),
    [Fax] NVARCHAR(255),
    [Staff] NVARCHAR(255),
    [Email] NVARCHAR(255),
    [Website] NVARCHAR(255),
    [IndustryTypeID] NVARCHAR(255),
    [FieldOfWorkID] NVARCHAR(255),
    [OtherFieldOfWork] NVARCHAR(255),
    [Products] NVARCHAR(255),
    [GS1Prefix] NVARCHAR(255),
    [MOCRegNo] NVARCHAR(255),
    [MOCRegDate] NVARCHAR(255),
    [MOCRegCert] NVARCHAR(255),
    [GLNID] NVARCHAR(255),
    [GLN] NVARCHAR(255),
    [Is14] NVARCHAR(255),
    [Status] NVARCHAR(255),
    [Parent] NVARCHAR(255),
    [CreatedBy] NVARCHAR(255),
    [CreatedDate] NVARCHAR(255),
    [UpdatedBy] NVARCHAR(255),
    [UpdatedDate] NVARCHAR(255),
    [MembershipTypeID] NVARCHAR(255),
    [OtherIndustry] NVARCHAR(255),
    [IntID] NVARCHAR(255),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__old_memb__3213E83FFFFAF184] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[old_users] (
    [loginid] VARCHAR(50),
    [loginpass] VARCHAR(50),
    [status] VARCHAR(1) CONSTRAINT [DF_old_users_status] DEFAULT '0',
    [UserId] VARCHAR(10),
    [OldUserID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__old_user__F3D5F2C3EAE92EB8] PRIMARY KEY CLUSTERED ([OldUserID])
);

-- CreateTable
CREATE TABLE [dbo].[other_products] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [product_name] NVARCHAR(max),
    [total_no_of_barcodes] FLOAT(53),
    [product_subscription_fee] FLOAT(53),
    [code] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [med_subscription_fee] FLOAT(53),
    [variant] NVARCHAR(10),
    CONSTRAINT [PK_other_products] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[other_products_subcriptions] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [react_no] INT,
    [transaction_id] INT,
    [product_id] INT,
    [other_date] NVARCHAR(255),
    [price] FLOAT(53),
    [status] VARCHAR(10) CONSTRAINT [DF_other_products_subcriptions_status] DEFAULT 'inactive',
    [user_id] INT CONSTRAINT [DF_other_products_subcriptions_user_id] DEFAULT 0,
    [createdBy] INT CONSTRAINT [DF_other_products_subcriptions_createdBy] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    [expiry_date] DATETIME,
    CONSTRAINT [PK_other_products_subcriptions] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[other_products_subscription_histories] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [react_no] INT,
    [transaction_id] INT,
    [product_id] INT,
    [other_date] DATETIME,
    [user_id] INT CONSTRAINT [DF_other_products_subscription_histories_user_id] DEFAULT 0,
    [price] FLOAT(53),
    [request_type] NVARCHAR(max),
    [document] NVARCHAR(max),
    [payment_type] NVARCHAR(max),
    [status] VARCHAR(255) CONSTRAINT [DF_other_products_subscription_histories_status] DEFAULT 'pending',
    [createdBy] INT CONSTRAINT [DF_other_products_subscription_histories_createdBy] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    [expiry_date] DATETIME,
    [admin_id] INT CONSTRAINT [DF_other_products_subscription_histories_admin_id] DEFAULT 0,
    CONSTRAINT [PK_other_products_subscription_histories] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[our_teams] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [job_title] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(max),
    [image] NVARCHAR(255) NOT NULL,
    [addedBy] TINYINT NOT NULL,
    [status] TINYINT NOT NULL CONSTRAINT [DF__our_teams__statu__25A691D2] DEFAULT 1,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__our_team__3213E83F204B810D] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[pages] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
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
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_pages] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[partners] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [image] NVARCHAR(max),
    [link] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_partners] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[password_resets] (
    [email] NVARCHAR(max),
    [token] NVARCHAR(max),
    [created_at] DATETIME,
    [PasswordResetID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__password__2CA0AE7C0D4E1ECB] PRIMARY KEY CLUSTERED ([PasswordResetID])
);

-- CreateTable
CREATE TABLE [dbo].[prod_desc_languages] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [language_code] NVARCHAR(255) NOT NULL,
    [alpha3] NVARCHAR(255) NOT NULL,
    [iso639_2B] NVARCHAR(255) NOT NULL,
    [language_name] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__prod_des__3213E83FBCC24090] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[product_consents] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [barcode] NVARCHAR(255) NOT NULL,
    [date_time] DATETIME NOT NULL,
    [added_by_admin] INT NOT NULL CONSTRAINT [DF__product_c__added__2C738AF2] DEFAULT 0,
    [added_by_user] INT NOT NULL CONSTRAINT [DF__product_c__added__2D67AF2B] DEFAULT 0,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [productnameenglish] NVARCHAR(max),
    [productnamearabic] NVARCHAR(max),
    CONSTRAINT [PK__product___3213E83FA6B0C886] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[product_images] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [product_id] INT,
    [image] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_product_images] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[product_packagings] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_product_packagings] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[product_types] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_product_types] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[production_identifires] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__producti__3213E83FE6A0F8C4] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[products] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL CONSTRAINT [DF_products_user_id] DEFAULT 0,
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
    [front_image] VARCHAR(50),
    [back_image] VARCHAR(50),
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
    [created_at] DATETIME,
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
    CONSTRAINT [PK__products__3213E83F47013034] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[products_udis] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [gcpGLNID] NVARCHAR(255) NOT NULL,
    [productnameenglish] NVARCHAR(255) NOT NULL,
    [productnamearabic] NVARCHAR(255) NOT NULL,
    [BrandName] NVARCHAR(255) NOT NULL,
    [unit] NVARCHAR(255) NOT NULL,
    [size] NVARCHAR(255) NOT NULL,
    [Origin] NVARCHAR(255),
    [countrySale] NVARCHAR(255) NOT NULL,
    [prod_lang] NVARCHAR(255) NOT NULL,
    [ProductType] NVARCHAR(255) NOT NULL,
    [PackagingType] NVARCHAR(255) NOT NULL,
    [gpc] NVARCHAR(255) NOT NULL,
    [gpc_code] NVARCHAR(255) NOT NULL,
    [HSCODES] NVARCHAR(255) NOT NULL,
    [HsDescription] NVARCHAR(max) NOT NULL,
    [details_page] NVARCHAR(max),
    [details_page_ar] NVARCHAR(max),
    [front_image] NVARCHAR(255),
    [back_image] NVARCHAR(255),
    [barcode] NVARCHAR(255) NOT NULL,
    [lotNo] NVARCHAR(255) NOT NULL,
    [serialNo] NVARCHAR(255) NOT NULL,
    [manufactureDate] DATE,
    [expiryDate] DATE,
    [softwareVersion] NVARCHAR(255),
    [is_software] NVARCHAR(50),
    [save_as] VARCHAR(50) NOT NULL CONSTRAINT [DF__products___is_dr__69279377] DEFAULT '1',
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__products__3213E83F21F6E851] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[reviews] (
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

-- CreateTable
CREATE TABLE [dbo].[schedules] (
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

-- CreateTable
CREATE TABLE [dbo].[section_data] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [key] NVARCHAR(max),
    [data] NVARCHAR(max),
    [category] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_section_data] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[segments] (
    [id] FLOAT(53),
    [segment_code] NVARCHAR(max),
    [segment_title] NVARCHAR(max),
    [segment_definition] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [SegmentID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__segments__C680609BC4E3853D] PRIMARY KEY CLUSTERED ([SegmentID])
);

-- CreateTable
CREATE TABLE [dbo].[services] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [category_id] INT,
    [user_id] INT,
    [name] NVARCHAR(max),
    [service_image] NVARCHAR(max),
    [rate] FLOAT(53),
    [duration] FLOAT(53),
    [details] NVARCHAR(max),
    [faq] NVARCHAR(max),
    [video] NVARCHAR(max),
    [gallery] NVARCHAR(max),
    [location] NVARCHAR(max),
    [reason_of_reject] NVARCHAR(max),
    [status] FLOAT(53),
    [admin_approval] FLOAT(53),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_services] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[sliders] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(max),
    [link] NVARCHAR(max),
    [description] NVARCHAR(max),
    [caption] VARCHAR(150),
    [image] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_sliders] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[sms_api_sets] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [api_key] NVARCHAR(max),
    [sender_id] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_sms_api_sets] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[sms_marketings] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [numbers] NVARCHAR(max),
    [otherNumbers] NVARCHAR(max),
    [title] NVARCHAR(max),
    [message] NVARCHAR(max),
    [sendBy] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_sms_marketings] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[sms_reminders] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [transaction_id] INT,
    [message] NVARCHAR(max),
    [sendBy] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_sms_reminders] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[social_media_links] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [socialID] NVARCHAR(max),
    [social_icon] NVARCHAR(max),
    [social_link] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_social_media_links] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[staff_help_desks] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [assigned_for] NVARCHAR(255),
    [assigned_adminID] INT,
    [assigned_date] DATETIME,
    [start_date] DATETIME,
    [assigned_userID] INT,
    [end_date] DATETIME,
    [note] NVARCHAR(max),
    [assignedBy] INT,
    [status] NVARCHAR(255),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [cart_id] INT CONSTRAINT [DF_staff_help_desks_cart_id] DEFAULT 0,
    CONSTRAINT [PK__staff_he__3213E83F09AD095C] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[states] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max),
    [country_id] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_states] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[subscribes] (
    [id] VARCHAR(50) NOT NULL,
    [email] NVARCHAR(max),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_subscribes] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tblSysNo] (
    [TblSysCtrNo] NCHAR(10) NOT NULL,
    [SysNoID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__tblSysNo__68661321043D2983] PRIMARY KEY CLUSTERED ([SysNoID])
);

-- CreateTable
CREATE TABLE [dbo].[transactions] (
    [id] VARCHAR(255) NOT NULL,
    [user_id] INT,
    [checkout_id] NVARCHAR(max),
    [status] VARCHAR(255),
    [amount] REAL,
    [currency] VARCHAR(255),
    [data] NVARCHAR(max),
    [trackable_data] VARCHAR(4000),
    [brand] VARCHAR(255),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [deleted_at] DATETIME,
    [request_type] NVARCHAR(50),
    CONSTRAINT [PK_transactions] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[travel_galleries] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [travel_id] INT NOT NULL,
    [title] NVARCHAR(255) NOT NULL,
    [link] NVARCHAR(255) NOT NULL,
    [image] NVARCHAR(255) NOT NULL,
    [status] NVARCHAR(255) NOT NULL,
    [added_by] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__travel_g__3213E83FD953AA24] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[udi_device_dispatch_movements] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [dispatchFrom] NVARCHAR(255) NOT NULL,
    [scan_by] NVARCHAR(255) NOT NULL,
    [dispatchTo] NVARCHAR(255) NOT NULL,
    [GLNID] NVARCHAR(255) NOT NULL,
    [GTIN] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__udi_devi__3213E83F94922AAF] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[udi_regulation_data] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [udi_productID] INT,
    [listingNoForAccessory] NVARCHAR(255),
    [accessoryBrand] NVARCHAR(255),
    [modelNo] NVARCHAR(255),
    [specifyModel] NVARCHAR(255),
    [udi_di_labled] NVARCHAR(255),
    [udi_di_issuingAgency] NVARCHAR(255),
    [quantity] NVARCHAR(255),
    [use_udi_di] NVARCHAR(255),
    [device_considered_as] NVARCHAR(255),
    [componentsDis] NVARCHAR(max),
    [hve_equivalentDis] NVARCHAR(255),
    [hve_equivalentDis_data] NVARCHAR(max),
    [hve_previousDis] NVARCHAR(255),
    [hve_previousDis_data] NVARCHAR(max),
    [is_directMarking] NVARCHAR(255),
    [is_directMarking_options] NVARCHAR(255),
    [directMarking_diffThan_primaryUDI] NVARCHAR(255),
    [diffDirectMarking] NVARCHAR(255),
    [indentifiers_in_directMarking] NVARCHAR(255),
    [DI_highestLevel] NVARCHAR(255),
    [packageType] NVARCHAR(255),
    [qty_per_package] NVARCHAR(255),
    [nextLevelPackage] NVARCHAR(255),
    [nextLevelPackage_Data] NVARCHAR(max),
    [catalogNo_equalTo_modelNo] NVARCHAR(255),
    [catalogNo] NVARCHAR(255),
    [clinicallySize] NVARCHAR(max),
    [is_naturalDry_rubber] NVARCHAR(255),
    [mri_status] NVARCHAR(255),
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [lotNo] VARCHAR(50),
    [serialNo] VARCHAR(50),
    [manufactureDate] DATE,
    [expiryDate] DATE,
    [softwareVersion] VARCHAR(50),
    [is_software] VARCHAR(50),
    CONSTRAINT [PK__udi_regu__3213E83F47DE9E30] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[units] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [unit_code] VARCHAR(50),
    [unit_name] NVARCHAR(50),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK_units] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[unspscs] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [commodity] INT NOT NULL,
    [title] NVARCHAR(255) NOT NULL,
    [definition] NVARCHAR(max) NOT NULL,
    [addedBy] TINYINT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__unspscs__3213E83FD855EFCA] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[upcoming_events] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(max),
    [title_ar] NVARCHAR(max),
    [image] NVARCHAR(max),
    [date] NVARCHAR(255),
    [link] NVARCHAR(max),
    [status] INT,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    [video] NVARCHAR(max),
    [display_type] NVARCHAR(max),
    CONSTRAINT [PK_upcoming_events] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[user_guide_pdfs] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(255) NOT NULL,
    [pdf] NVARCHAR(255) NOT NULL,
    [status] INT NOT NULL CONSTRAINT [DF__user_guid__statu__51851410] DEFAULT 1,
    [addedBy] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__user_gui__3213E83F876ADCF1] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[user_guide_videos] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(255) NOT NULL,
    [video] NVARCHAR(255) NOT NULL,
    [status] INT NOT NULL CONSTRAINT [DF__user_guid__statu__546180BB] DEFAULT 1,
    [addedBy] INT NOT NULL,
    [created_at] DATETIME,
    [updated_at] DATETIME,
    CONSTRAINT [PK__user_gui__3213E83FFCD40DEC] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
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
    CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[withdraw_gateways] (
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

-- CreateTable
CREATE TABLE [dbo].[withdraw_logs] (
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

-- CreateIndex
CREATE NONCLUSTERED INDEX [oauth_access_tokens_user_id_index] ON [dbo].[oauth_access_tokens]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [oauth_auth_codes_user_id_index] ON [dbo].[oauth_auth_codes]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [oauth_clients_user_id_index] ON [dbo].[oauth_clients]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [oauth_refresh_tokens_access_token_id_index] ON [dbo].[oauth_refresh_tokens]([access_token_id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

