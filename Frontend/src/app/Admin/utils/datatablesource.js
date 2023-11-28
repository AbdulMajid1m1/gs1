import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
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



