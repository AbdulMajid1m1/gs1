import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import QRCode from "qrcode.react";
const QRCodeCell = (props) => {
  const url = `https://gs1ksa.org/?gtin=${props.value}`;
  return <QRCode value={url} size={40} />;
};

const GTINCell = (params) => {
  const style = {
    backgroundColor: "rgb(21 128 61)",
    color: "white",
    borderRadius: "30px",
    padding: "2px 5px",
  };
  return <div style={style}>{params.value}</div>;
};


export const InventorySuppliersDataColumn = [
  {
    field: "id",
    headerName: "ID",
    width: 180,
    editable: true,
  },
  {
    field: "name",
    headerName: "NAME",
    width: 180,
    editable: true,
  },
  {
    field: "date",
    headerName: "DATE",
    width: 180,
    editable: true,
  },


  {
    field: "complete_name",
    headerName: "Complete Name",
    width: 180,
    editable: true,
  },
  {
    field: "lang",
    headerName: "Language",
    width: 180,
    editable: true,
  },
  {
    field: "tz",
    headerName: "Timezone",
    width: 180,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 180,
    editable: true,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 180,
    editable: true,
  },
  {
    field: "is_company",
    headerName: "Is Company",
    width: 180,
    editable: true,
  },
  {
    field: "industry_id",
    headerName: "Industry ID",
    width: 180,
    editable: true,
  },
  {
    field: "company_type",
    headerName: "Company Type",
    width: 180,
    editable: true,
  },



];




export const ListOfCustomersColumn = [
  {
    field: "id",
    headerName: "Customer Id",
    width: 120,
    editable: true,
  },
  {
    field: "user_type",
    headerName: "User Type",
    width: 180,
    editable: true,
  },
  {
    field: "slug",
    headerName: "Slug",
    width: 180,
    editable: true,
  },
  {
    field: "location_uk",
    headerName: "Location UK",
    width: 100,
    editable: true,
  },
  {
    field: "have_cr",
    headerName: "Have CR",
    width: 100,
    editable: true,
  },
  {
    field: "cr_documentID",
    headerName: "CR Document ID",
    width: 180,
    editable: true,
  },
  {
    field: "document_number",
    headerName: "Document Number",
    width: 180,
    editable: true,
  },
  {
    field: "fname",
    headerName: "First Name",
    width: 180,
    editable: true,
  },
  {
    field: "lname",
    headerName: "Last Name",
    width: 180,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
    editable: true,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 180,
    editable: true,
  },
  // {
  //   field: "image",
  //   headerName: "Image",
  //   width: 180,
  //   editable: true,
  // },
  {
    field: "address",
    headerName: "Address",
    width: 180,
    editable: true,
  },
  {
    field: "address1",
    headerName: "Address 1",
    width: 180,
    editable: true,
  },
  {
    field: "address2",
    headerName: "Address 2",
    width: 180,
    editable: true,
  },
  {
    field: "po_box",
    headerName: "PO Box",
    width: 180,
    editable: true,
  },
  {
    field: "mbl_extension",
    headerName: "Mobile Extension",
    width: 180,
    editable: true,
  },
  {
    field: "website",
    headerName: "Website",
    width: 180,
    editable: true,
  },
  {
    field: "no_of_staff",
    headerName: "Number of Staff",
    width: 100,
    editable: true,
  },
  {
    field: "companyID",
    headerName: "Company ID",
    width: 180,
    editable: true,
  },
  {
    field: "district",
    headerName: "District",
    width: 180,
    editable: true,
  },
  {
    field: "building_no",
    headerName: "Building Number",
    width: 180,
    editable: true,
  },
  {
    field: "additional_number",
    headerName: "Additional Number",
    width: 180,
    editable: true,
  },
  {
    field: "other_landline",
    headerName: "Other Landline",
    width: 180,
    editable: true,
  },
  {
    field: "unit_number",
    headerName: "Unit Number",
    width: 100,
    editable: true,
  },
  {
    field: "qr_corde",
    headerName: "QR Code",
    width: 180,
    editable: true,
  },
  {
    field: "email_verified_at",
    headerName: "Email Verified At",
    width: 180,
    editable: true,
  },
  {
    field: "code",
    headerName: "Code",
    width: 180,
    editable: true,
  },
  {
    field: "verification_code",
    headerName: "Verification Code",
    width: 180,
    editable: true,
  },
  {
    field: "cr_number",
    headerName: "CR Number",
    width: 180,
    editable: true,
  },
  {
    field: "cr_activity",
    headerName: "CR Activity",
    width: 180,
    editable: true,
  },
  {
    field: "company_name_eng",
    headerName: "Company Name (English)",
    width: 180,
    editable: true,
  },
  {
    field: "company_name_arabic",
    headerName: "Company Name (Arabic)",
    width: 180,
    editable: true,
  },
  // Add more fields as needed
];



export const ShipmentRequestColumns = [
  {
    field: "shipment_id",
    headerName: "Shipment Id",
    width: 120,
  },
  {
    field: "vendor_id",
    headerName: "Vendor Id",
    width: 120,

  },
  {
    field: "customer_id",
    headerName: "Customer Id",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
  {
    field: "customer_id",
    headerName: "Customer Id",
    width: 120,
  },
  {
    field: "datetime",
    headerName: "Date Time",
    width: 180,
    renderCell: (params) => {
      const dateObject = new Date(params.value);  // Assuming the datetime is in a format recognizable by JavaScript's Date constructor
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(dateObject);
    }
  }

];



export const ShipmentDocColumns = [
  {
    field: "document_id",
    headerName: "Document Id",
    width: 180,
  },
  // {
  //   field: "shipment_id",
  //   headerName: "Shipment Id",
  //   width: 180,

  // },
  {
    field: "document_type",
    headerName: "Document type",
    width: 180,
  },


  {
    field: "document_url",
    headerName: "Document",
    width: 180,
    renderCell: (params) => {
      console.log("params");
      console.log(params);

      return (
        <InsertDriveFileIcon
          style={{
            color: "primary",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
        />
      );
    },


  },
]






export const orderLineColumns = [
  {
    field: "po_header_id",
    headerName: "PO HEADER ID",
    width: 150,
  },
  // {
  //   field: "member_id",
  //   headerName: "MEMBER ID",
  //   width: 120,
  // },
  // {
  //   field: "create_date",
  //   headerName: "CREATE DATE",
  //   width: 200,
  // },
  // {
  //   field: "supplier_id",
  //   headerName: "SUPPLIER ID",
  //   width: 150,
  // },
  {
    field: "po_detail_id",
    headerName: "PO DETAIL ID",
    width: 150,
  },
  {
    field: "product_name",
    headerName: "PRODUCT NAME",
    width: 200,
  },
  {
    field: "quantity",
    headerName: "QUANTITY",
    width: 120,
  },
  {
    field: "price",
    headerName: "PRICE",
    width: 120,
  },
  {
    field: "price_subtotal",
    headerName: "PRICE SUBTOTAL",
    width: 160,
  },
  {
    field: "price_total",
    headerName: "PRICE TOTAL",
    width: 140,
  },
  {
    field: "date_order",
    headerName: "DATE ORDER",
    width: 200,
  },
  {
    field: "state",
    headerName: "STATE",
    width: 150,
  },
  {
    field: "partner_name",
    headerName: "PARTNER NAME",
    width: 200,
  },
];




export const purchaseOrderColumns = [
  {
    field: "po_header_id",
    headerName: "PO HEADER ID",
    width: 100,
    editable: true,
  },
  {
    field: "purchase_order",
    headerName: "PURCHASE ORDER",
    width: 150,
    editable: true,
  },
  {
    field: "member_id",
    headerName: "MEMEBER ID",
    width: 100,
    editable: true,
  },
  {
    field: "create_date",
    headerName: "CREATE DATE",
    width: 120,
    editable: true,
  },
  {
    field: "supplier_id",
    headerName: "SUPPLIER ID",
    width: 100,
    editable: true,
  },

];



export const productionColumns = [
  {
    field: "name",
    headerName: "Job Order Number",
    width: 180,
    editable: true,
  },

  {
    field: "product_id[0]",
    headerName: "Product Id",
    width: 120,
    editable: false,
    valueGetter: (params) => {
      return params.row.product_id[0];
    }
  },
  {
    field: "product_id",
    headerName: "Product Name",
    width: 180,
    editable: false,
    valueGetter: (params) => {
      return params.row.product_id[1];
    }
  },
  {
    field: "date_start",
    headerName: "START DATE",
    width: 150,
    editable: true,
  },
  {
    field: "date_finished",
    headerName: "FINISH DATE",
    width: 150,
    editable: true,
  },
  {
    field: "state",
    headerName: "STATE",
    width: 120,
    editable: true,
  },
  {
    field: "product_uom_qty",
    headerName: "PLANNED QUANTITY",
    width: 180,
    editable: true,
  },
  {
    field: "product_qty",
    headerName: "PRODUCED QUANTITY",
    width: 100,
    editable: true,
  },
  {
    field: "bom_id",
    headerName: "BOM",
    width: 180,
    editable: true,
  },
  {
    field: "user_id",
    headerName: "USER",
    width: 180,
    editable: false,
    valueGetter: (params) => {
      return params.row.user_id[1];
    }
  },
  {
    field: "company_id",
    headerName: "COMPANY",
    width: 180,
    editable: false,
    valueGetter: (params) => {
      return params.row.company_id[1];
    }
  }
];


export const salesOrderColumn = [
  {
    field: "id",
    headerName: "ID",
    width: 180,
    editable: true,
  },
  {
    field: "name",
    headerName: "NAME",
    width: 180,
    editable: true,
  },
  {
    field: "date",
    headerName: "DATE",
    width: 180,
    editable: true,
  },
  {
    field: "state",
    headerName: "STATE",
    width: 180,
    editable: true,
  },
  {
    field: "campaign_id",
    headerName: "COMPAIGN ID",
    width: 180,
    editable: true,
  },



];


export const salesInvoiceColumn = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    editable: true,
  },
  {
    field: "campaign_id",
    headerName: "Campaign ID",
    width: 150,
    editable: true,
  },
  {
    field: "source_id",
    headerName: "Source ID",
    width: 150,
    editable: true,
  },
  {
    field: "medium_id",
    headerName: "Medium ID",
    width: 150,
    editable: true,
  },
  {
    field: "activity_ids",
    headerName: "Activity IDs",
    width: 150,
    editable: true,
  },
  {
    field: "activity_state",
    headerName: "Activity State",
    width: 150,
    editable: true,
  },
  {
    field: "activity_user_id",
    headerName: "Activity User ID",
    width: 150,
    editable: true,
  },
  {
    field: "activity_type_id",
    headerName: "Activity Type ID",
    width: 150,
    editable: true,
  },
  {
    field: "activity_type_icon",
    headerName: "Activity Type Icon",
    width: 150,
    editable: true,
  },
  {
    field: "activity_date_deadline",
    headerName: "Activity Date Deadline",
    width: 200,
    editable: true,
  },
  {
    field: "my_activity_date_deadline",
    headerName: "My Activity Date Deadline",
    width: 200,
    editable: true,
  },
  {
    field: "activity_summary",
    headerName: "Activity Summary",
    width: 200,
    editable: true,
  },
  {
    field: "activity_exception_decoration",
    headerName: "Activity Exception Decoration",
    width: 200,
    editable: true,
  },
  {
    field: "activity_exception_icon",
    headerName: "Activity Exception Icon",
    width: 200,
    editable: true,
  },
  {
    field: "message_is_follower",
    headerName: "Message Is Follower",
    width: 150,
    editable: true,
  },



]




export const usersColumn = [
  {
    field: "user_id",
    headerName: "User ID",
    width: 150,
    editable: true,
  },
  {
    field: "vendor_id",
    headerName: "Vendor ID",
    width: 150,
    editable: true,
  },
  {
    field: "user_name",
    headerName: "User Name",
    width: 150,
    editable: true,
  },
  {
    field: "user_email",
    headerName: "User Email",
    width: 150,
    editable: true,
  },
  {
    field: "user_password",
    headerName: "User Password",
    width: 150,
    editable: true,
  },
  {
    field: "user_role",
    headerName: "User Role",
    width: 150,
    editable: true,
  },
  {
    field: "date_created",
    headerName: "Date Created",
    width: 150,
    editable: true,
  },
  {
    field: "is_active",
    headerName: "Is Active",
    width: 150,
    editable: true,
  },




];



export const fixedAssetsDataColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    editable: true,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "company_id",
    headerName: "Company",
    width: 150,
    valueGetter: (params) => {
      return params.row.company_id[1];
    },
    editable: false,
  },
  {
    field: "currency_id",
    headerName: "Currency",
    width: 150,
    // show second item of list
    valueGetter: (params) => {
      return params.row.currency_id[1];
    },
    editable: false,
  },
  {
    field: "state",
    headerName: "State",
    width: 120,
    editable: true,
  },
  {
    field: "active",
    headerName: "Active",
    width: 120,
    editable: true,
  },
  {
    field: "method",
    headerName: "Method",
    width: 120,
    editable: true,
  },
  {
    field: "method_number",
    headerName: "Method Number",
    width: 150,
    editable: true,
  },
  {
    field: "method_period",
    headerName: "Method Period",
    width: 150,
    editable: true,
  },
  {
    field: "prorata_date",
    headerName: "Prorata Date",
    width: 150,
    editable: true,
  },
  {
    field: "account_asset_id",
    headerName: "Asset Account",
    width: 150,
    editable: true,
  },
  {
    field: "account_depreciation_id",
    headerName: "Depreciation Account",
    width: 180,
    editable: true,
  },
  {
    field: "account_depreciation_expense_id",
    headerName: "Depreciation Expense Account",
    width: 220,
    editable: true,
  },
  {
    field: "original_value",
    headerName: "Original Value",
    width: 150,
    editable: true,
  },
  {
    field: "book_value",
    headerName: "Book Value",
    width: 150,
    editable: true,
  },
  {
    field: "value_residual",
    headerName: "Value Residual",
    width: 150,
    editable: true,
  },
];




export const inventoryColumn = [
  {
    field: "product_id",
    headerName: "Product Name",
    width: 180,
    // show first item in list
    valueGetter: (params) => {
      return params.row.product_id[1];
    },
    editable: false,
  },
  {
    field: "description",
    headerName: "Product Description",
    width: 180,
    editable: false,
  },
  {
    field: "quantity",
    headerName: "Qty on Hand",
    width: 180,
    editable: true,
  },
  {
    field: "list_price",
    headerName: "Sell Price",
    width: 180,
    editable: true,
  },
  {
    field: "standard_price",
    headerName: "Cost Price",
    width: 180,
    editable: true,
  },
  {
    field: "product_categ_id",
    headerName: "Item Category",
    width: 180,
    valueGetter: (params) => {
      return params.row.product_categ_id[1];
    },
    editable: false,

  },
  {
    field: "barcode",
    headerName: "Barcode",
    width: 180,
    editable: true,
  },
  {
    field: "location_id",
    headerName: "Item Location",
    width: 180,
    valueGetter: (params) => {
      return params.row.location_id[1];
    },
    editable: false,
  },
];



export const GtinColumn = [
  {
    field: "product_id",
    headerName: "Product ID",
    width: 100,
  },
  {
    field: "productnameenglish",
    headerName: "Product Name English",
    width: 180,
  },
  {
    field: "BrandName",
    headerName: "Brand Name",
    width: 180,
  },

  {
    field: "qrcode",
    headerName: "QRCode",
    renderCell: (params) => <QRCodeCell value={params.row.barcode} />,
    // width: 50, // Adjust this width as needed
  },
  {
    field: "barcode",
    headerName: "Barcode",
    renderCell: GTINCell,
    width: 150,
  },

  {
    field: "product_url",
    headerName: "Product URL",
    width: 180,
    renderCell: (params) => {
      let url = params.value;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
      }
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      );
    },
  },
  {
    field: "product_link_url",
    headerName: "Product Link URL",
    width: 200,
    renderCell: (params) => {
      let url = params.value;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
      }
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      );
    },
  },


  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
];




export const GlnColumn = [
  {
    field: "gln_id",
    headerName: "GLN ID",
    width: 180,
  },
  {
    field: "gcpGLNID",
    headerName: "GCP GLN ID",
    width: 180,
  },
  {
    field: "locationNameEn",
    headerName: "LOCATION NAME EN",
    width: 180,
  },
  {
    field: "locationNameAr",
    headerName: "LOCATION NAME AR",
    width: 150,
  },

  {
    field: "GLNBarcodeNumber",
    headerName: "GLN Barcode Number",
    width: 180,
  },
  {
    field: "status",
    headerName: "STATUS",
    width: 180,
  },
];




export const ViewSsccColumn = [
  {
    field: "sscc_id",
    headerName: "SSCC ID",
    width: 180,
  },
  {
    field: "Type",
    headerName: "Type",
    width: 180,
  },
  {
    field: "SSCCBarcodeNumber",
    headerName: "SSCC Barcode Number",
    width: 280,
  },
];




export const Gs1AllMembers = [
  {
    field: "gs1_id",
    headerName: "GS1 ID",
    width: 180,
  },
  {
    field: "company_name",
    headerName: "COMPANY NAME",
    width: 180,
  },
  {
    field: "status",
    headerName: "STATUS",
    width: 180,
    renderCell: (params) => (
      <div
        style={{
          padding: '5px',
          borderRadius: '4px',
          color: '#fff',
          backgroundColor: params.row.status === 'Activated' ? 'green' : 'red',
        }}
      >
        {params.row.status}
      </div>
    ),
  },




];

