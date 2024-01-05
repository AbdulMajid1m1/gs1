import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import imageLiveUrl from '../utils/urlConverter/imageLiveUrl';
import QRCode from 'qrcode.react';
import { backendUrl } from './config';
import { useGridApiContext } from "@mui/x-data-grid";
import { Box } from "@mui/material";
const QRCodeCell = props => {
  const url = `https://gs1ksa.org/?gtin=${props.value}`;
  return <QRCode value={url} size={40} />;
};

function ImageEditInputCell(props) {
  const { id, field, fieldUpdated, value, mode } = props;
  const apiRef = useGridApiContext();

  const handleFileChange = (event) => {
    const file = event.target?.files?.[0];

    if (!file) {
      apiRef.current.setEditCellValue({
        id,
        field: fieldUpdated,
        value: false,
      });
      return;
    }

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageValue = reader.result;
        apiRef.current.setEditCellValue({
          id,
          field: fieldUpdated,
          value: true,
        });
        apiRef.current.setEditCellValue({
          id,
          field,
          value: { file, dataURL: imageValue, isUpdate: true },
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRef = (element) => {
    if (element) {
      const input = element.querySelector('input[type="file"]');
      input?.focus();
    }
  };

  if (mode === "edit") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
        <input
          ref={handleRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Box>
    );
  }

  console.log("Value");
  console.log(value);
}
const renderImageEditInputCell = (params) => {
  const { field, fieldUpdated } = params;
  return (
    <ImageEditInputCell {...params} mode="edit" fieldUpdated={fieldUpdated} />
  );
};

const GTINCell = params => {
  const style = {
    backgroundColor: 'rgb(21 128 61)',
    color: 'white',
    borderRadius: '30px',
    padding: '2px 5px',
  };
  return <div style={style}>{params.value}</div>;
};

export const InventorySuppliersDataColumn = [
  {
    field: 'id',
    headerName: 'ID',
    width: 180,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'NAME',
    width: 180,
    editable: true,
  },
  {
    field: 'date',
    headerName: 'DATE',
    width: 180,
    editable: true,
  },

  {
    field: 'complete_name',
    headerName: 'Complete Name',
    width: 180,
    editable: true,
  },
  {
    field: 'lang',
    headerName: 'Language',
    width: 180,
    editable: true,
  },
  {
    field: 'tz',
    headerName: 'Timezone',
    width: 180,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 180,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 180,
    editable: true,
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
    width: 180,
    editable: true,
  },
  {
    field: 'is_company',
    headerName: 'Is Company',
    width: 180,
    editable: true,
  },
  {
    field: 'industry_id',
    headerName: 'Industry ID',
    width: 180,
    editable: true,
  },
  {
    field: 'company_type',
    headerName: 'Company Type',
    width: 180,
    editable: true,
  },
];

export const ListOfCustomersColumn = [
  {
    field: 'id',
    headerName: 'Customer Id',
    width: 120,
    editable: true,
  },
  {
    field: 'user_type',
    headerName: 'User Type',
    width: 180,
    editable: true,
  },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 180,
    editable: true,
  },
  {
    field: 'location_uk',
    headerName: 'Location UK',
    width: 100,
    editable: true,
  },
  {
    field: 'have_cr',
    headerName: 'Have CR',
    width: 100,
    editable: true,
  },
  {
    field: 'cr_documentID',
    headerName: 'CR Document ID',
    width: 180,
    editable: true,
  },
  {
    field: 'document_number',
    headerName: 'Document Number',
    width: 180,
    editable: true,
  },
  {
    field: 'fname',
    headerName: 'First Name',
    width: 180,
    editable: true,
  },
  {
    field: 'lname',
    headerName: 'Last Name',
    width: 180,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 180,
    editable: true,
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
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
    field: 'address',
    headerName: 'Address',
    width: 180,
    editable: true,
  },
  {
    field: 'address1',
    headerName: 'Address 1',
    width: 180,
    editable: true,
  },
  {
    field: 'address2',
    headerName: 'Address 2',
    width: 180,
    editable: true,
  },
  {
    field: 'po_box',
    headerName: 'PO Box',
    width: 180,
    editable: true,
  },
  {
    field: 'mbl_extension',
    headerName: 'Mobile Extension',
    width: 180,
    editable: true,
  },
  {
    field: 'website',
    headerName: 'Website',
    width: 180,
    editable: true,
  },
  {
    field: 'no_of_staff',
    headerName: 'Number of Staff',
    width: 100,
    editable: true,
  },
  {
    field: 'companyID',
    headerName: 'Company ID',
    width: 180,
    editable: true,
  },
  {
    field: 'district',
    headerName: 'District',
    width: 180,
    editable: true,
  },
  {
    field: 'building_no',
    headerName: 'Building Number',
    width: 180,
    editable: true,
  },
  {
    field: 'additional_number',
    headerName: 'Additional Number',
    width: 180,
    editable: true,
  },
  {
    field: 'other_landline',
    headerName: 'Other Landline',
    width: 180,
    editable: true,
  },
  {
    field: 'unit_number',
    headerName: 'Unit Number',
    width: 100,
    editable: true,
  },
  {
    field: 'qr_corde',
    headerName: 'QR Code',
    width: 180,
    editable: true,
  },
  {
    field: 'email_verified_at',
    headerName: 'Email Verified At',
    width: 180,
    editable: true,
  },
  {
    field: 'code',
    headerName: 'Code',
    width: 180,
    editable: true,
  },
  {
    field: 'verification_code',
    headerName: 'Verification Code',
    width: 180,
    editable: true,
  },
  {
    field: 'cr_number',
    headerName: 'CR Number',
    width: 180,
    editable: true,
  },
  {
    field: 'cr_activity',
    headerName: 'CR Activity',
    width: 180,
    editable: true,
  },
  {
    field: 'company_name_eng',
    headerName: 'Company Name (English)',
    width: 180,
    editable: true,
  },
  {
    field: 'company_name_arabic',
    headerName: 'Company Name (Arabic)',
    width: 180,
    editable: true,
  },
  // Add more fields as needed
];

export const ShipmentRequestColumns = [
  {
    field: 'shipment_id',
    headerName: 'Shipment Id',
    width: 120,
  },
  {
    field: 'vendor_id',
    headerName: 'Vendor Id',
    width: 120,
  },
  {
    field: 'customer_id',
    headerName: 'Customer Id',
    width: 120,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
  },
  {
    field: 'customer_id',
    headerName: 'Customer Id',
    width: 120,
  },
  {
    field: 'datetime',
    headerName: 'Date Time',
    width: 180,
    renderCell: params => {
      const dateObject = new Date(params.value); // Assuming the datetime is in a format recognizable by JavaScript's Date constructor
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(dateObject);
    },
  },
];

export const ShipmentDocColumns = [
  {
    field: 'document_id',
    headerName: 'Document Id',
    width: 180,
  },
  // {
  //   field: "shipment_id",
  //   headerName: "Shipment Id",
  //   width: 180,

  // },
  {
    field: 'document_type',
    headerName: 'Document type',
    width: 180,
  },

  {
    field: 'document_url',
    headerName: 'Document',
    width: 180,
    renderCell: params => {
      console.log('params');
      console.log(params);

      return (
        <InsertDriveFileIcon
          style={{
            color: 'primary',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
          }}
        />
      );
    },
  },
];

export const orderLineColumns = [
  {
    field: 'po_header_id',
    headerName: 'PO HEADER ID',
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
    field: 'po_detail_id',
    headerName: 'PO DETAIL ID',
    width: 150,
  },
  {
    field: 'product_name',
    headerName: 'PRODUCT NAME',
    width: 200,
  },
  {
    field: 'quantity',
    headerName: 'QUANTITY',
    width: 120,
  },
  {
    field: 'price',
    headerName: 'PRICE',
    width: 120,
  },
  {
    field: 'price_subtotal',
    headerName: 'PRICE SUBTOTAL',
    width: 160,
  },
  {
    field: 'price_total',
    headerName: 'PRICE TOTAL',
    width: 140,
  },
  {
    field: 'date_order',
    headerName: 'DATE ORDER',
    width: 200,
  },
  {
    field: 'state',
    headerName: 'STATE',
    width: 150,
  },
  {
    field: 'partner_name',
    headerName: 'PARTNER NAME',
    width: 200,
  },
];

export const purchaseOrderColumns = [
  {
    field: 'po_header_id',
    headerName: 'PO HEADER ID',
    width: 100,
    editable: true,
  },
  {
    field: 'purchase_order',
    headerName: 'PURCHASE ORDER',
    width: 150,
    editable: true,
  },
  {
    field: 'member_id',
    headerName: 'MEMEBER ID',
    width: 100,
    editable: true,
  },
  {
    field: 'create_date',
    headerName: 'CREATE DATE',
    width: 120,
    editable: true,
  },
  {
    field: 'supplier_id',
    headerName: 'SUPPLIER ID',
    width: 100,
    editable: true,
  },
];

export const productionColumns = [
  {
    field: 'name',
    headerName: 'Job Order Number',
    width: 180,
    editable: true,
  },

  {
    field: 'product_id[0]',
    headerName: 'Product Id',
    width: 120,
    editable: false,
    valueGetter: params => {
      return params.row.product_id[0];
    },
  },
  {
    field: 'product_id',
    headerName: 'Product Name',
    width: 180,
    editable: false,
    valueGetter: params => {
      return params.row.product_id[1];
    },
  },
  {
    field: 'date_start',
    headerName: 'START DATE',
    width: 150,
    editable: true,
  },
  {
    field: 'date_finished',
    headerName: 'FINISH DATE',
    width: 150,
    editable: true,
  },
  {
    field: 'state',
    headerName: 'STATE',
    width: 120,
    editable: true,
  },
  {
    field: 'product_uom_qty',
    headerName: 'PLANNED QUANTITY',
    width: 180,
    editable: true,
  },
  {
    field: 'product_qty',
    headerName: 'PRODUCED QUANTITY',
    width: 100,
    editable: true,
  },
  {
    field: 'bom_id',
    headerName: 'BOM',
    width: 180,
    editable: true,
  },
  {
    field: 'user_id',
    headerName: 'USER',
    width: 180,
    editable: false,
    valueGetter: params => {
      return params.row.user_id[1];
    },
  },
  {
    field: 'company_id',
    headerName: 'COMPANY',
    width: 180,
    editable: false,
    valueGetter: params => {
      return params.row.company_id[1];
    },
  },
];

export const salesOrderColumn = [
  {
    field: 'id',
    headerName: 'ID',
    width: 180,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'NAME',
    width: 180,
    editable: true,
  },
  {
    field: 'date',
    headerName: 'DATE',
    width: 180,
    editable: true,
  },
  {
    field: 'state',
    headerName: 'STATE',
    width: 180,
    editable: true,
  },
  {
    field: 'campaign_id',
    headerName: 'COMPAIGN ID',
    width: 180,
    editable: true,
  },
];

export const salesInvoiceColumn = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    editable: true,
  },
  {
    field: 'campaign_id',
    headerName: 'Campaign ID',
    width: 150,
    editable: true,
  },
  {
    field: 'source_id',
    headerName: 'Source ID',
    width: 150,
    editable: true,
  },
  {
    field: 'medium_id',
    headerName: 'Medium ID',
    width: 150,
    editable: true,
  },
  {
    field: 'activity_ids',
    headerName: 'Activity IDs',
    width: 150,
    editable: true,
  },
  {
    field: 'activity_state',
    headerName: 'Activity State',
    width: 150,
    editable: true,
  },
  {
    field: 'activity_user_id',
    headerName: 'Activity User ID',
    width: 150,
    editable: true,
  },
  {
    field: 'activity_type_id',
    headerName: 'Activity Type ID',
    width: 150,
    editable: true,
  },
  {
    field: 'activity_type_icon',
    headerName: 'Activity Type Icon',
    width: 150,
    editable: true,
  },
  {
    field: 'activity_date_deadline',
    headerName: 'Activity Date Deadline',
    width: 200,
    editable: true,
  },
  {
    field: 'my_activity_date_deadline',
    headerName: 'My Activity Date Deadline',
    width: 200,
    editable: true,
  },
  {
    field: 'activity_summary',
    headerName: 'Activity Summary',
    width: 200,
    editable: true,
  },
  {
    field: 'activity_exception_decoration',
    headerName: 'Activity Exception Decoration',
    width: 200,
    editable: true,
  },
  {
    field: 'activity_exception_icon',
    headerName: 'Activity Exception Icon',
    width: 200,
    editable: true,
  },
  {
    field: 'message_is_follower',
    headerName: 'Message Is Follower',
    width: 150,
    editable: true,
  },
];

export const usersColumn = [
  {
    field: 'user_id',
    headerName: 'User ID',
    width: 150,
    editable: true,
  },
  {
    field: 'vendor_id',
    headerName: 'Vendor ID',
    width: 150,
    editable: true,
  },
  {
    field: 'user_name',
    headerName: 'User Name',
    width: 150,
    editable: true,
  },
  {
    field: 'user_email',
    headerName: 'User Email',
    width: 150,
    editable: true,
  },
  {
    field: 'user_password',
    headerName: 'User Password',
    width: 150,
    editable: true,
  },
  {
    field: 'user_role',
    headerName: 'User Role',
    width: 150,
    editable: true,
  },
  {
    field: 'date_created',
    headerName: 'Date Created',
    width: 150,
    editable: true,
  },
  {
    field: 'is_active',
    headerName: 'Is Active',
    width: 150,
    editable: true,
  },
];

export const fixedAssetsDataColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'company_id',
    headerName: 'Company',
    width: 150,
    valueGetter: params => {
      return params.row.company_id[1];
    },
    editable: false,
  },
  {
    field: 'currency_id',
    headerName: 'Currency',
    width: 150,
    // show second item of list
    valueGetter: params => {
      return params.row.currency_id[1];
    },
    editable: false,
  },
  {
    field: 'state',
    headerName: 'State',
    width: 120,
    editable: true,
  },
  {
    field: 'active',
    headerName: 'Active',
    width: 120,
    editable: true,
  },
  {
    field: 'method',
    headerName: 'Method',
    width: 120,
    editable: true,
  },
  {
    field: 'method_number',
    headerName: 'Method Number',
    width: 150,
    editable: true,
  },
  {
    field: 'method_period',
    headerName: 'Method Period',
    width: 150,
    editable: true,
  },
  {
    field: 'prorata_date',
    headerName: 'Prorata Date',
    width: 150,
    editable: true,
  },
  {
    field: 'account_asset_id',
    headerName: 'Asset Account',
    width: 150,
    editable: true,
  },
  {
    field: 'account_depreciation_id',
    headerName: 'Depreciation Account',
    width: 180,
    editable: true,
  },
  {
    field: 'account_depreciation_expense_id',
    headerName: 'Depreciation Expense Account',
    width: 220,
    editable: true,
  },
  {
    field: 'original_value',
    headerName: 'Original Value',
    width: 150,
    editable: true,
  },
  {
    field: 'book_value',
    headerName: 'Book Value',
    width: 150,
    editable: true,
  },
  {
    field: 'value_residual',
    headerName: 'Value Residual',
    width: 150,
    editable: true,
  },
];

export const inventoryColumn = [
  {
    field: 'product_id',
    headerName: 'Product Name',
    width: 180,
    // show first item in list
    valueGetter: params => {
      return params.row.product_id[1];
    },
    editable: false,
  },
  {
    field: 'description',
    headerName: 'Product Description',
    width: 180,
    editable: false,
  },
  {
    field: 'quantity',
    headerName: 'Qty on Hand',
    width: 180,
    editable: true,
  },
  {
    field: 'list_price',
    headerName: 'Sell Price',
    width: 180,
    editable: true,
  },
  {
    field: 'standard_price',
    headerName: 'Cost Price',
    width: 180,
    editable: true,
  },
  {
    field: 'product_categ_id',
    headerName: 'Item Category',
    width: 180,
    valueGetter: params => {
      return params.row.product_categ_id[1];
    },
    editable: false,
  },
  {
    field: 'barcode',
    headerName: 'Barcode',
    width: 180,
    editable: true,
  },
  {
    field: 'location_id',
    headerName: 'Item Location',
    width: 180,
    valueGetter: params => {
      return params.row.location_id[1];
    },
    editable: false,
  },
];

// export const GtinColumn = [
//   // {
//   //   field: 'id',
//   //   headerName: 'ID',
//   //   width: 80,
//   // },
//   // {
//   //   field: 'user_id',
//   //   headerName: 'User ID',
//   //   width: 100,
//   // },
//   {
//     field: 'gcpGLNID',
//     headerName: 'GCP GLN ID',
//     width: 150,
//   },
//   {
//     field: 'import_code',
//     headerName: 'Import Code',
//     width: 120,
//   },
//   {
//     field: 'productnameenglish',
//     headerName: 'Product Name English',
//     width: 200,
//   },
//   {
//     field: 'productnamearabic',
//     headerName: 'Product Name Arabic',
//     width: 200,
//   },
//   {
//     field: 'BrandName',
//     headerName: 'Brand Name',
//     width: 120,
//   },
//   {
//     field: 'ProductType',
//     headerName: 'Product Type',
//     width: 150,
//   },
//   {
//     field: 'Origin',
//     headerName: 'Origin',
//     width: 120,
//   },
//   {
//     field: 'PackagingType',
//     headerName: 'Packaging Type',
//     width: 120,
//   },
//   {
//     field: 'MnfCode',
//     headerName: 'Manufacturer Code',
//     width: 150,
//   },
//   {
//     field: 'MnfGLN',
//     headerName: 'Manufacturer GLN',
//     width: 150,
//   },
//   {
//     field: 'ProvGLN',
//     headerName: 'Province GLN',
//     width: 150,
//   },
//   {
//     field: 'unit',
//     headerName: 'Unit',
//     width: 80,
//   },
//   {
//     field: 'size',
//     headerName: 'Size',
//     width: 80,
//   },
//   {
//     field: 'front_image',
//     headerName: 'Front Image',
//     width: 120,
//   },
//   {
//     field: 'back_image',
//     headerName: 'Back Image',
//     width: 120,
//   },
//   {
//     field: 'image_1',
//     headerName: 'Image 1',
//     width: 120,
//   },
//   {
//     field: 'image_2',
//     headerName: 'Image 2',
//     width: 120,
//   },
//   {
//     field: 'image_3',
//     headerName: 'Image 3',
//     width: 120,
//   },
//   {
//     field: 'childProduct',
//     headerName: 'Child Product',
//     width: 120,
//   },
//   {
//     field: 'quantity',
//     headerName: 'Quantity',
//     width: 80,
//   },
//   {
//     field: 'barcode',
//     headerName: 'Barcode',
//     renderCell: GTINCell,
//     width: 150,
//   },
//   {
//     field: 'gpc',
//     headerName: 'GPC',
//     width: 150,
//   },
//   {
//     field: 'gpc_code',
//     headerName: 'GPC Code',
//     width: 120,
//   },
//   {
//     field: 'countrySale',
//     headerName: 'Country Sale',
//     width: 120,
//   },
//   {
//     field: 'HSCODES',
//     headerName: 'HS Codes',
//     width: 120,
//   },
//   {
//     field: 'HsDescription',
//     headerName: 'HS Description',
//     width: 200,
//   },
//   {
//     field: 'gcp_type',
//     headerName: 'GCP Type',
//     width: 120,
//   },
//   {
//     field: 'prod_lang',
//     headerName: 'Product Language',
//     width: 120,
//   },
//   {
//     field: 'details_page',
//     headerName: 'Details Page',
//     width: 200,
//   },
//   {
//     field: 'details_page_ar',
//     headerName: 'Details Page (Arabic)',
//     width: 200,
//   },
//   {
//     field: 'status',
//     headerName: 'Status',
//     width: 120,
//     renderCell: params => (
//       <div
//         style={{
//           padding: '5px',
//           paddingLeft: '10px',
//           paddingRight: '10px',
//           borderRadius: '20px',
//           border: '2px solid',
//           borderColor: params.row.status === 'Active' ? 'green' : 'red',
//           color: params.row.status === 'Active' ? 'green' : 'red',
//         }}
//       >
//         {params.row.status}
//       </div>
//     ),
//   },
//   {
//     field: 'deleted_at',
//     headerName: 'Deleted At',
//     width: 150,
//   },
//   {
//     field: 'created_at',
//     headerName: 'Created At',
//     width: 150,
//   },
//   {
//     field: 'updated_at',
//     headerName: 'Updated At',
//     width: 150,
//   },
//   {
//     field: 'memberID',
//     headerName: 'Member ID',
//     width: 100,
//   },
//   {
//     field: 'admin_id',
//     headerName: 'Admin ID',
//     width: 100,
//   },
//   {
//     field: 'save_as',
//     headerName: 'Save As',
//     width: 120,
//   },
//   {
//     field: 'gtin_type',
//     headerName: 'GTIN Type',
//     width: 120,
//   },
//   {
//     field: 'product_url',
//     headerName: 'Product URL',
//     width: 180,
//   },
//   {
//     field: 'product_link_url',
//     headerName: 'Product Link URL',
//     width: 200,
//   },
//   {
//     field: 'BrandNameAr',
//     headerName: 'Brand Name (Arabic)',
//     width: 150,
//   },
//   {
//     field: 'digitalInfoType',
//     headerName: 'Digital Info Type',
//     width: 150,
//   },
//   {
//     field: 'readyForGepir',
//     headerName: 'Ready for Gepir',
//     width: 150,
//   },
//   {
//     field: 'gepirPosted',
//     headerName: 'Gepir Posted',
//     width: 150,
//   },
// ];

export const GtinColumn = [
  // {
  //   field: "product_id",
  //   headerName: "Product ID",
  //   width: 100,
  // },
  {
    field: "productnameenglish",
    headerName: "Product Name English",
    width: 180,
  },
  {
    field: "productnamearabic",
    headerName: "Product Name Arabic",
    width: 180,
  },
  {
    field: "BrandName",
    headerName: "Brand Name English",
    width: 180,
  },
  {
    field: "BrandNameAr",
    headerName: "Brand Name Arabic",
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
    field: "front_image",
    headerName: "Front Image",
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.front_image)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.front_image), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    )
  },
  {
    field: "back_image",
    headerName: "Back Image",
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.back_image)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.back_image), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    )
  },
  {
    field: "image_1",
    headerName: "Optional Image 1",
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.image_1)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.image_1), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    )
  },
  {
    field: "image_2",
    headerName: "Optional Image 2",
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.image_2)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.image_2), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    )
  },
  {
    field: "image_3",
    headerName: "Optional Image 3",
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.image_3)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.image_3), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    )
  },
  // {
  //   field: "product_url",
  //   headerName: "Product URL",
  //   width: 180,
  //   renderCell: (params) => {
  //     let url = params.value;
  //     if (!url.startsWith('http://') && !url.startsWith('https://')) {
  //       url = 'http://' + url;
  //     }
  //     return (
  //       <a href={url} target="_blank" rel="noopener noreferrer">
  //         {params.value}
  //       </a>
  //     );
  //   },
  // },
  {
    field: "product_url",
    headerName: "Product URL",
    width: 180,
    renderCell: (params) => {
      let url = params.value;
      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
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
    field: 'ProductType',
    headerName: 'Product Type',
    width: 180,
  },
  {
    field: 'Origin',
    headerName: 'Origin',
    width: 180,
  },
  {
    field: 'PackagingType',
    headerName: 'Packaging Type',
    width: 180,
  },
  {
    field: 'unit',
    headerName: 'Unit',
    width: 180,
  },
  {
    field: 'size',
    headerName: 'Size',
    width: 180,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 120,
  // },
];



export const GlnColumn = [
  {
    field: 'product_id',
    headerName: 'Product ID',
    width: 180,
  },
  {
    field: 'gcpGLNID',
    headerName: 'GCP GLN ID',
    width: 180,
  },
  {
    field: 'locationNameEn',
    headerName: 'LOCATION NAME EN',
    width: 180,
  },
  {
    field: 'locationNameAr',
    headerName: 'LOCATION NAME AR',
    width: 150,
  },

  {
    field: 'GLNBarcodeNumber',
    headerName: 'GLN Barcode Number',
    width: 180,
  },
  {
    field: 'status',
    headerName: 'STATUS',
    width: 180,
  },
];

export const ViewSsccColumn = [
  {
    field: 'sscc_id',
    headerName: 'SSCC ID',
    width: 180,
  },
  {
    field: 'sscc_type',
    headerName: 'Type',
    width: 180,
  },
  {
    field: 'SSCCBarcodeNumber',
    headerName: 'SSCC Barcode Number',
    width: 280,
  },
];

export const Gs1AllMembers = [
  // {
  //   field: 'gs1_id',
  //   headerName: 'GS1 ID',
  //   width: 180,
  // },
  // {
  //   field: 'company_name',
  //   headerName: 'COMPANY NAME',
  //   width: 180,
  // },
  {
    field: 'company_name_eng',
    headerName: 'COMPANY NAME (ENGLISH)',
    width: 180,
  },
  {
    field: 'memberID',
    headerName: 'MEMBER ID',
    width: 180,
  },
  {
    field: 'mobile',
    headerName: 'MOBILE',
    width: 180,
  },
  {
    field: 'remarks',
    headerName: 'REMARKS',
    width: 180,
  },
  {
    field: 'status',
    headerName: 'STATUS',
    width: 180,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '5px',
          paddingRight: '5px',
          borderRadius: '10px',
          border: '2px solid',
          borderColor: params.row.status === 'active' ? 'green' : 'red',
          color: params.row.status === 'active' ? 'green' : 'red',
        }}
      >
        {params.row.status}
      </div>
    ),
  },
  {
    field: 'password',
    headerName: 'CODE',
    width: 180,
  },
  // {
  //   field: 'password',
  //   headerName: 'PASSWORD',
  //   width: 180,
  // },
  {
    field: 'membership_category',
    headerName: 'MEMBER CATEGORY',
    width: 180,
  },
  {
    field: 'email',
    headerName: 'EMAIL',
    width: 220,
  },
  // {
  //   field: 'user_type',
  //   headerName: 'USER TYPE',
  //   width: 180,
  // },
  // {
  //   field: 'location_uk',
  //   headerName: 'LOCATION (UK)',
  //   width: 180,
  // },
  // {
  //   field: 'have_cr',
  //   headerName: 'HAVE CR',
  //   width: 180,
  // },
  // {
  //   field: 'cr_number',
  //   headerName: 'CR NUMBER',
  //   width: 180,
  // },
  // {
  //   field: 'image',
  //   headerName: 'IMAGE',
  //   width: 180,
  // },
  // // {
  // //   field: "address",
  // //   headerName: "ADDRESS",
  // //   width: 180,
  // //   renderCell: (params) => (
  // //     <div>
  // //       <p>Country: {params.row.address.countryName}</p>
  // //       <p>City: {params.row.address.cityName}</p>
  // //       <p>State: {params.row.address.stateName}</p>
  // //       <p>Zip: {params.row.address.zip}</p>
  // //     </div>
  // //   ),
  // // },
  // {
  //   field: 'website',
  //   headerName: 'WEBSITE',
  //   width: 180,
  // },
  // {
  //   field: 'district',
  //   headerName: 'DISTRICT',
  //   width: 180,
  // },
  // {
  //   field: 'building_no',
  //   headerName: 'BUILDING NUMBER',
  //   width: 180,
  // },
  // {
  //   field: 'unit_number',
  //   headerName: 'UNIT NUMBER',
  //   width: 180,
  // },
  // {
  //   field: 'qr_corde',
  //   headerName: 'QR CODE',
  //   width: 180,
  // },
  // {
  //   field: 'email_verified_at',
  //   headerName: 'EMAIL VERIFIED AT',
  //   width: 180,
  // },
  // {
  //   field: 'verification_code',
  //   headerName: 'VERIFICATION CODE',
  //   width: 180,
  // },
  // {
  //   field: 'cr_activity',
  //   headerName: 'CR ACTIVITY',
  //   width: 180,
  // },

  // {
  //   field: 'company_name_arabic',
  //   headerName: 'COMPANY NAME (ARABIC)',
  //   width: 180,
  // },

  // {
  //   field: 'gpc',
  //   headerName: 'GPC',
  //   width: 180,
  // },
  // {
  //   field: 'total',
  //   headerName: 'TOTAL',
  //   width: 180,
  // },
  // {
  //   field: 'contactPerson',
  //   headerName: 'CONTACT PERSON',
  //   width: 180,
  // },
  // {
  //   field: 'companyLandLine',
  //   headerName: 'COMPANY LANDLINE',
  //   width: 180,
  // },
  // // {
  // //   field: "documents",
  // //   headerName: "DOCUMENTS",
  // //   width: 180,
  // // },
  // {
  //   field: 'documents',
  //   headerName: 'DOCUMENTS',
  //   width: 180,
  //   renderCell: (params) => {
  //     console.log("params");
  //     console.log(params);
  //     const fieldUpdated = params?.row?.[params.field]?.isUpdate;
  //     const docUrl = fieldUpdated
  //       ? params?.row?.[params.field]?.dataURL
  //       : imageLiveUrl(params.row[params.field]);

  //     const onClickIcon = () => {
  //       if (fieldUpdated) {
  //         // removing the "data:application/pdf;base64," part
  //         const base64 = docUrl.split(",")[1];
  //         const binary = atob(base64);
  //         const binaryLen = binary.length;
  //         const buffer = new ArrayBuffer(binaryLen);
  //         const view = new Uint8Array(buffer);
  //         for (let i = 0; i < binaryLen; i++) {
  //           view[i] = binary.charCodeAt(i);
  //         }
  //         // create Blob from ArrayBuffer
  //         const blob = new Blob([view], { type: "application/pdf" });

  //         // create an object URL from the Blob
  //         const objectUrl = URL.createObjectURL(blob);

  //         // open a link to the Object URL
  //         const link = document.createElement("a");
  //         link.href = objectUrl;
  //         link.download = "file.pdf"; // you can set file name here
  //         link.click();
  //       } else {
  //         window.open(docUrl, "_blank");
  //       }
  //     };

  //     return (
  //       <InsertDriveFileIcon
  //         style={{
  //           color: "black",
  //           width: "40px",
  //           height: "40px",
  //           cursor: "pointer",
  //         }}
  //         onClick={onClickIcon}
  //       />
  //     );
  //   },

  //   renderEditCell: (params) =>
  //     renderDocEditInputCell({ ...params, fieldUpdated: "logoUpdated" }),
  //   editable: true,
  //   type: "string",
  // },
  // // {
  // //   field: 'address_image',
  // //   headerName: 'ADDRESS IMAGE',
  // //   width: 180,
  // // },
  // {
  //   field: "address_image",
  //   headerName: "ADDRESS IMAGE",
  //   width: 220,
  // editable: true,
  // renderCell: (params) => (
  //   <img
  //     src={imageLiveUrl(params.row.address_image)}
  //     // src={backendUrl + "/" + params.row.address_image}
  //     alt="address_image"
  //     style={{
  //       width: '90%',
  //       height: '90%',
  //       objectFit: 'contain',
  //       cursor: 'pointer'
  //     }}
  //     onClick={() => {
  //       window.open(imageLiveUrl(params.row.address_image), '_blank', 'width=400,height=300,top=0,left=0');
  //     }}
  //   />
  // )
  // },
  // {
  //   field: 'payment_type',
  //   headerName: 'PAYMENT TYPE',
  //   width: 180,
  // },
  // {
  //   field: 'payment_status',
  //   headerName: 'PAYMENT STATUS',
  //   width: 180,
  // },
  // {
  //   field: 'online_payment',
  //   headerName: 'ONLINE PAYMENT',
  //   width: 180,
  // },
  // {
  //   field: 'remember_token',
  //   headerName: 'REMEMBER TOKEN',
  //   width: 180,
  // },
  // {
  //   field: 'parent_memberID',
  //   headerName: 'PARENT MEMBER ID',
  //   width: 180,
  // },
  // {
  //   field: 'member_type',
  //   headerName: 'MEMBER TYPE',
  //   width: 180,
  // },
  // {
  //   field: 'invoice_file',
  //   headerName: 'INVOICE FILE',
  //   width: 180,
  // },
  // {
  //   field: 'otp_status',
  //   headerName: 'OTP STATUS',
  //   width: 180,
  // },
  // {
  //   field: 'transaction_id',
  //   headerName: 'TRANSACTION ID',
  //   width: 180,
  // },
  // {
  //   field: 'created_at',
  //   headerName: 'CREATED AT',
  //   width: 180,
  //   type: 'dateTime',

  //   valueGetter: (params) => {
  //     // Convert the string date to a Date object
  //     return params.value ? new Date(params.value) : null;
  //   }
  // },
  // {
  //   field: 'updated_at',
  //   headerName: 'UPDATED AT',
  //   width: 180,
  //   type: 'dateTime',

  //   valueGetter: (params) => {
  //     // Convert the string date to a Date object
  //     return params.value ? new Date(params.value) : null;
  //   }
  // },
  // {
  //   field: 'gcpGLNID',
  //   headerName: 'GCP GLN ID',
  //   width: 180,
  // },
  // {
  //   field: 'gln',
  //   headerName: 'GLN',
  //   width: 180,
  // },
  // {
  //   field: 'gcp_type',
  //   headerName: 'GCP TYPE',
  //   width: 180,
  // },
  // {
  //   field: 'deleted_at',
  //   headerName: 'DELETED AT',
  //   width: 180,
  // },
  // {
  //   field: 'gcp_expiry',
  //   headerName: 'GCP EXPIRY',
  //   width: 180,
  // },

  // {
  //   field: 'user_id',
  //   headerName: 'USER ID',
  //   width: 180,
  // },

  // {
  //   field: 'assign_to',
  //   headerName: 'ASSIGN TO',
  //   width: 180,
  // },
  // {
  //   field: 'membership_category',
  //   headerName: 'MEMBERSHIP CATEGORY',
  //   width: 180,
  // },
  // {
  //   field: 'upgradation_disc',
  //   headerName: 'UPGRADATION DISCOUNT',
  //   width: 180,
  // },
  // {
  //   field: 'upgradation_disc_amount',
  //   headerName: 'UPGRADATION DISCOUNT AMOUNT',
  //   width: 180,
  // },
  // {
  //   field: 'renewal_disc',
  //   headerName: 'RENEWAL DISCOUNT',
  //   width: 180,
  // },
  // {
  //   field: 'renewal_disc_amount',
  //   headerName: 'RENEWAL DISCOUNT AMOUNT',
  //   width: 180,
  // },
  // {
  //   field: 'membership_otherCategory',
  //   headerName: 'MEMBERSHIP OTHER CATEGORY',
  //   width: 180,
  // },
  // {
  //   field: 'activityID',
  //   headerName: 'ACTIVITY ID',
  //   width: 180,
  // },
  // {
  //   field: 'registration_type',
  //   headerName: 'REGISTRATION TYPE',
  //   width: 180,
  // },
];

export const MembersDocumentColumn = [
  {
    field: 'type',
    headerName: 'Type',
    width: 180,
  },
  // {
  //   field: 'documents',
  //   headerName: 'Documents',
  //   width: 180,
  //   renderCell: (params) => {
  //     console.log("params");
  //     console.log(params);
  //     const fieldUpdated = params?.row?.[params.field]?.isUpdate;
  //     const docUrl = fieldUpdated
  //       ? params?.row?.[params.field]?.dataURL
  //       : imageLiveUrl(params.row[params.field]);

  //     const onClickIcon = () => {
  //       if (fieldUpdated) {
  //         // removing the "data:application/pdf;base64," part
  //         const base64 = docUrl.split(",")[1];
  //         const binary = atob(base64);
  //         const binaryLen = binary.length;
  //         const buffer = new ArrayBuffer(binaryLen);
  //         const view = new Uint8Array(buffer);
  //         for (let i = 0; i < binaryLen; i++) {
  //           view[i] = binary.charCodeAt(i);
  //         }
  //         // create Blob from ArrayBuffer
  //         const blob = new Blob([view], { type: "application/pdf" });

  //         // create an object URL from the Blob
  //         const objectUrl = URL.createObjectURL(blob);

  //         // open a link to the Object URL
  //         const link = document.createElement("a");
  //         link.href = objectUrl;
  //         link.download = "file.pdf"; // you can set file name here
  //         link.click();
  //       } else {
  //         window.open(docUrl, "_blank");
  //       }
  //     };

  //     return (
  //       <InsertDriveFileIcon
  //         style={{
  //           color: "black",
  //           width: "40px",
  //           height: "40px",
  //           cursor: "pointer",
  //         }}
  //         onClick={onClickIcon}
  //       />
  //     );
  //   },

  //   renderEditCell: (params) =>
  //     renderDocEditInputCell({ ...params, fieldUpdated: "logoUpdated" }),
  //   editable: true,
  //   type: "string",
  // },
  {
    field: 'document',
    headerName: 'Document',
    width: 180,

    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const docUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      const onClickIcon = () => {
        if (fieldUpdated) {
          // removing the "data:application/pdf;base64," part
          const base64 = docUrl.split(",")[1];
          const binary = atob(base64);
          const binaryLen = binary.length;
          const buffer = new ArrayBuffer(binaryLen);
          const view = new Uint8Array(buffer);
          for (let i = 0; i < binaryLen; i++) {
            view[i] = binary.charCodeAt(i);
          }
          // create Blob from ArrayBuffer
          const blob = new Blob([view], { type: "application/pdf" });

          // create an object URL from the Blob
          const objectUrl = URL.createObjectURL(blob);

          // open a link to the Object URL
          const link = document.createElement("a");
          link.href = objectUrl;
          link.download = "file.pdf"; // you can set file name here
          link.click();
        } else {
          window.open(docUrl, "_blank");
        }
      };

      return (
        <InsertDriveFileIcon
          style={{
            color: "black",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={onClickIcon}
        />
      );
    },



  },
  // {
  //   field: 'user_id',
  //   headerName: 'User ID',
  //   width: 180,
  // },
  {
    field: 'transaction_id',
    headerName: 'Transaction ID',
    width: 180,
  },
  {
    field: 'uploaded_by',
    headerName: 'Uploaded By',
    width: 180,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'doc_type',
    headerName: 'Doc Type',
    width: 180,
  },
  // {
  //   field: 'status',
  //   headerName: 'Status',
  //   width: 120,
  //   renderCell: params => (
  //     <div
  //       style={{
  //         padding: '5px',
  //         paddingLeft: '5px',
  //         paddingRight: '5px',
  //         borderRadius: '10px',
  //         border: '2px solid',
  //         borderColor: params.row.status === 'active' ? 'green' : 'red',
  //         color: params.row.status === 'active' ? 'green' : 'red',
  //       }}
  //     >
  //       {params.row.status}
  //     </div>
  //   ),
  // },



];

export const MembersBrandsColumn = [
  // {
  //   field: "id",
  //   headerName: "ID",
  //   width: 180,
  // },
  {
    field: 'name',
    headerName: 'Name',
    width: 180,
  },
  {
    field: 'brand_certificate',
    headerName: 'Document',
    width: 180,

    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const docUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      const onClickIcon = () => {
        if (fieldUpdated) {
          // removing the "data:application/pdf;base64," part
          const base64 = docUrl.split(",")[1];
          const binary = atob(base64);
          const binaryLen = binary.length;
          const buffer = new ArrayBuffer(binaryLen);
          const view = new Uint8Array(buffer);
          for (let i = 0; i < binaryLen; i++) {
            view[i] = binary.charCodeAt(i);
          }
          // create Blob from ArrayBuffer
          const blob = new Blob([view], { type: "application/pdf" });

          // create an object URL from the Blob
          const objectUrl = URL.createObjectURL(blob);

          // open a link to the Object URL
          const link = document.createElement("a");
          link.href = objectUrl;
          link.download = "file.pdf"; // you can set file name here
          link.click();
        } else {
          window.open(docUrl, "_blank");
        }
      };

      return (
        <InsertDriveFileIcon
          style={{
            color: "black",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={onClickIcon}
        />
      );
    },



  },
  {
    field: 'name_ar',
    headerName: 'Name Arabic',
    width: 180,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 180,
  // },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '3px',
          paddingLeft: '5px',
          paddingRight: '5px',
          borderRadius: '10px',
          border: '2px solid',
          borderColor: params.row.status === 'active' ? 'green' : 'red',
          color: params.row.status === 'active' ? 'green' : 'red',
        }}
      >
        {params.row.status}
      </div>
    ),
  },
  // {
  //   field: 'user_id',
  //   headerName: 'User ID',
  //   width: 180,
  // },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const AdminBrandsColumn = [
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   width: 180,
  // },
  {
    field: 'name',
    headerName: 'Name',
    width: 180,
  },
  {
    field: 'name_ar',
    headerName: 'Name Arabic',
    width: 180,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 180,
  // },
  {
    field: 'brand_certificate',
    headerName: 'Documents',
    width: 180,
    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const docUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      const onClickIcon = () => {
        if (fieldUpdated) {
          // removing the "data:application/pdf;base64," part
          const base64 = docUrl.split(",")[1];
          const binary = atob(base64);
          const binaryLen = binary.length;
          const buffer = new ArrayBuffer(binaryLen);
          const view = new Uint8Array(buffer);
          for (let i = 0; i < binaryLen; i++) {
            view[i] = binary.charCodeAt(i);
          }
          // create Blob from ArrayBuffer
          const blob = new Blob([view], { type: "application/pdf" });

          // create an object URL from the Blob
          const objectUrl = URL.createObjectURL(blob);

          // open a link to the Object URL
          const link = document.createElement("a");
          link.href = objectUrl;
          link.download = "file.pdf"; // you can set file name here
          link.click();
        } else {
          window.open(docUrl, "_blank");
        }
      };

      return (
        <InsertDriveFileIcon
          style={{
            color: "black",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={onClickIcon}
        />
      );
    },

    renderEditCell: (params) =>
      renderDocEditInputCell({ ...params, fieldUpdated: "logoUpdated" }),
    editable: true,
    type: "string",
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '5px',
          paddingRight: '5px',
          borderRadius: '10px',
          border: '2px solid',
          borderColor: params.row.status === 'active' ? 'green' : 'red',
          color: params.row.status === 'active' ? 'green' : 'red',
        }}
      >
        {params.row.status}
      </div>
    ),
  },
  // {
  //   field: 'user_id',
  //   headerName: 'User ID',
  //   width: 180,
  // },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const paymentSlipColumn = [
  // {
  //   field: 'admin_id',
  //   headerName: 'Admin ID',
  //   width: 180,
  // },
  // {
  //   field: "documents",
  //   headerName: "Documents",
  //   width: 180,
  // },
  {
    field: 'transaction_id',
    headerName: 'Transaction ID',
    width: 180,
  },
  {
    field: 'document',
    headerName: 'Documents',
    width: 180,
    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const docUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      const onClickIcon = () => {
        if (fieldUpdated) {
          // removing the "data:application/pdf;base64," part
          const base64 = docUrl.split(",")[1];
          const binary = atob(base64);
          const binaryLen = binary.length;
          const buffer = new ArrayBuffer(binaryLen);
          const view = new Uint8Array(buffer);
          for (let i = 0; i < binaryLen; i++) {
            view[i] = binary.charCodeAt(i);
          }
          // create Blob from ArrayBuffer
          const blob = new Blob([view], { type: "application/pdf" });

          // create an object URL from the Blob
          const objectUrl = URL.createObjectURL(blob);

          // open a link to the Object URL
          const link = document.createElement("a");
          link.href = objectUrl;
          link.download = "file.pdf"; // you can set file name here
          link.click();
        } else {
          window.open(docUrl, "_blank");
        }
      };

      return (
        <InsertDriveFileIcon
          style={{
            color: "black",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={onClickIcon}
        />
      );
    },

    renderEditCell: (params) =>
      renderDocEditInputCell({ ...params, fieldUpdated: "logoUpdated" }),
    editable: true,
    type: "string",
  },
  // {
  //   field: 'transaction_id',
  //   headerName: 'Transaction ID',
  //   width: 180,
  // },
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   width: 180,
  // },
  {
    field: 'reject_reason',
    headerName: 'Reject Reason',
    width: 180,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    // make it date time type
    type: 'dateTime',

    width: 180,
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'deleted_at',
    headerName: 'Deleted At',
    width: 180,
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 180,
  },

  // {
  //   field: 'user_id',
  //   headerName: 'User ID',
  //   width: 180,
  // },



];

export const masterDataColumn = [

  {
    field: 'unit_code',
    headerName: 'Unit Code',
    width: 180,
  },
  {
    field: 'unit_name',
    headerName: 'Unit Name',
    width: 260,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const document = [

  {
    field: 'name',
    headerName: 'name',
    width: 180,
  },
  {
    field: 'status',
    headerName: 'status',
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },

  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];
export const product_packaging = [

  {
    field: 'name',
    headerName: 'name',
    width: 180,
  },
  {
    field: 'status',
    headerName: 'status',
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },

  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];
export const Other_Products = [

  {
    field: 'product_name',
    headerName: 'product_name',
    width: 260,
  },
  {
    field: 'total_no_of_barcodes',
    headerName: 'total_no_of_barcodes',
    width: 180,
  },
  {
    field: 'product_subscription_fee',
    headerName: 'product_subscription_fee',
    width: 180,
  },

  {
    field: 'status',
    headerName: 'status',
    width: 130,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'code',
    headerName: 'code',
    width: 180,
  },
  {
    field: 'med_subscription_fee',
    headerName: 'med_subscription_fee',
    width: 180,
  },
  {
    field: 'variant',
    headerName: 'variant At',
    width: 180,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];
export const Gcp_types = [

  {
    field: 'gcp_code',
    headerName: 'gcp_code',
    width: 180,
  },
  {
    field: 'gcp_description',
    headerName: 'gcp_description',
    width: 180,
  },

  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];
export const counrty_sales = [

  {
    field: 'Alpha2',
    headerName: 'Alpha2',
    width: 130,
  },
  {
    field: 'Alpha3',
    headerName: 'Alpha3',
    width: 130,
  },
  {
    field: 'country_code_numeric3',
    headerName: 'country_code_numeric3',
    width: 180,
  },
  {
    field: 'country_name',
    headerName: 'country_name',
    width: 260,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];
export const city = [

  {
    field: 'name',
    headerName: 'name',
    width: 280,
  },
  {
    field: 'state_name',
    headerName: 'state',
    width: 280,
  },

  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];
export const state = [

  {
    field: 'name',
    headerName: 'name',
    width: 280,
  },
  {
    field: 'country_id',
    headerName: 'country',
    width: 180,
  },

  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];
export const crnumber__ = [

  {
    field: 'cr',
    headerName: 'cr',
    width: 180,
  },
  {
    field: 'activity',
    headerName: 'activity',
    width: 180,
  },
  {
    field: 'status',
    headerName: 'status',
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'isRegistered',
    headerName: 'isRegistered',
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Yes' : 'No';
    },
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];
export const document_type = [

  {
    field: 'file_name',
    headerName: 'Document name',
    width: 280,
  },
  {
    field: 'status',
    headerName: 'status',
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];
export const country__ = [

  {
    field: 'name_en',
    headerName: 'name_en',
    width: 180,
  },
  {
    field: 'name_ar',
    headerName: 'name_ar',
    width: 180,
  },
  {
    field: 'country_shortName',
    headerName: 'country shortName',
    width: 180,
  },
  {
    field: 'country_code',
    headerName: 'country_code',
    width: 180,
  },

  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];
export const Hs_code = [

  {
    field: 'CNKEY',
    headerName: 'CNKEY',
    width: 180,
  },
  {
    field: 'HSCODES',
    headerName: 'HSCODES',
    width: 140,
  },
  {
    field: 'DescriptionEN',
    headerName: 'DescriptionEN',
    width: 750,
  },
  {
    field: 'addBy',
    headerName: 'addBy',
    width: 130,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];
export const unspcs_ = [

  {
    field: 'commodity',
    headerName: 'commodity',
    width: 180,
  },
  {
    field: 'title',
    headerName: 'title',
    width: 180,
  },
  {
    field: 'definition',
    headerName: 'definition',
    width: 180,
  },
  {
    field: 'addedBy',
    headerName: 'addedBy',
    width: 180,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];




export const financeColumn = [
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   width: 180,
  // },
  {
    field: 'type',
    headerName: 'Type',
    width: 180,
  },
  {
    field: 'document',
    headerName: 'Document',
    width: 180,

    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const docUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      const onClickIcon = () => {
        if (fieldUpdated) {
          // removing the "data:application/pdf;base64," part
          const base64 = docUrl.split(",")[1];
          const binary = atob(base64);
          const binaryLen = binary.length;
          const buffer = new ArrayBuffer(binaryLen);
          const view = new Uint8Array(buffer);
          for (let i = 0; i < binaryLen; i++) {
            view[i] = binary.charCodeAt(i);
          }
          // create Blob from ArrayBuffer
          const blob = new Blob([view], { type: "application/pdf" });

          // create an object URL from the Blob
          const objectUrl = URL.createObjectURL(blob);

          // open a link to the Object URL
          const link = document.createElement("a");
          link.href = objectUrl;
          link.download = "file.pdf"; // you can set file name here
          link.click();
        } else {
          window.open(docUrl, "_blank");
        }
      };

      return (
        <InsertDriveFileIcon
          style={{
            color: "black",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={onClickIcon}
        />
      );
    },
  },
  {
    field: 'transaction_id',
    headerName: 'Transaction ID',
    width: 180,
  },
  // {
  //   field: 'user_id',
  //   headerName: 'User ID',
  //   width: 180,
  // },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',

    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'doc_type',
    headerName: 'Doc Type',
    width: 180,
  },
  // {
  //   field: 'status',
  //   headerName: 'Status',
  //   width: 180, 
  // },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === 'Active' ? 'green' : 'red',
          color: params.row.status === 'Active' ? 'green' : 'red',
        }}
      >
        {params.row.status}
      </div>
    ),
  },



];



export const financePopUpMemberBankSlipColumn = [
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   width: 180,
  // },
  {
    field: 'type',
    headerName: 'Type',
    width: 180,
  },
  {
    field: 'document',
    headerName: 'Document',
    width: 180,

    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const docUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      const onClickIcon = () => {
        if (fieldUpdated) {
          // removing the "data:application/pdf;base64," part
          const base64 = docUrl.split(",")[1];
          const binary = atob(base64);
          const binaryLen = binary.length;
          const buffer = new ArrayBuffer(binaryLen);
          const view = new Uint8Array(buffer);
          for (let i = 0; i < binaryLen; i++) {
            view[i] = binary.charCodeAt(i);
          }
          // create Blob from ArrayBuffer
          const blob = new Blob([view], { type: "application/pdf" });

          // create an object URL from the Blob
          const objectUrl = URL.createObjectURL(blob);

          // open a link to the Object URL
          const link = document.createElement("a");
          link.href = objectUrl;
          link.download = "file.pdf"; // you can set file name here
          link.click();
        } else {
          window.open(docUrl, "_blank");
        }
      };

      return (
        <InsertDriveFileIcon
          style={{
            color: "black",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={onClickIcon}
        />
      );
    },
  },
  {
    field: 'transaction_id',
    headerName: 'Transaction ID',
    width: 180,
  },
  // {
  //   field: 'user_id',
  //   headerName: 'User ID',
  //   width: 180,
  // },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',

    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'doc_type',
    headerName: 'Doc Type',
    width: 180,
  },



];



export const bankSlipColumn = [
  {
    field: 'type',
    headerName: 'Type',
    width: 180,
  },
  {
    field: 'document',
    headerName: 'Document',
    width: 180,

    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const docUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      const onClickIcon = () => {
        if (fieldUpdated) {
          // removing the "data:application/pdf;base64," part
          const base64 = docUrl.split(",")[1];
          const binary = atob(base64);
          const binaryLen = binary.length;
          const buffer = new ArrayBuffer(binaryLen);
          const view = new Uint8Array(buffer);
          for (let i = 0; i < binaryLen; i++) {
            view[i] = binary.charCodeAt(i);
          }
          // create Blob from ArrayBuffer
          const blob = new Blob([view], { type: "application/pdf" });

          // create an object URL from the Blob
          const objectUrl = URL.createObjectURL(blob);

          // open a link to the Object URL
          const link = document.createElement("a");
          link.href = objectUrl;
          link.download = "file.pdf"; // you can set file name here
          link.click();
        } else {
          window.open(docUrl, "_blank");
        }
      };

      return (
        <InsertDriveFileIcon
          style={{
            color: "black",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={onClickIcon}
        />
      );
    },
  },
  {
    field: 'transaction_id',
    headerName: 'Transaction ID',
    width: 180,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',

    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'doc_type',
    headerName: 'Doc Type',
    width: 180,
  },



];




export const helpDeskColumn = [
  {
    field: 'id',
    headerName: 'ID',
    width: 180,
  },
  {
    field: 'ticket_id',
    headerName: 'Ticket ID',
    width: 180,
  },
  {
    field: 'subject',
    headerName: 'Subject',
    width: 180,
  },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 180,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
  },




]





export const subscribedGtinColumn = [
  {
    field: 'Product',
    headerName: 'Product',
    width: 180,
  },
  {
    field: 'Description',
    headerName: 'Description',
    width: 180,
  },
  {
    field: 'Registered_Date',
    headerName: 'Registered Date',
    width: 180,
  },
  {
    field: 'Expiry_date',
    headerName: 'Expiry date',
    width: 180,
  },



]




export const submenusDataColumn = [
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   width: 180,
  // },
  {
    field: 'user_type',
    headerName: 'Member Type',
    width: 180,
  },
  // {
  //   field: 'slug',
  //   headerName: 'Slug',
  //   width: 180,
  // },
  // {
  //   field: 'location_uk',
  //   headerName: 'Location UK',
  //   width: 180,
  // },
  // {
  //   field: 'have_cr',
  //   headerName: 'Have CR',
  //   width: 180,
  // },
  // {
  //   field: 'cr_documentID',
  //   headerName: 'CR Document ID',
  //   width: 180,
  // },
  // {
  //   field: 'document_number',
  //   headerName: 'Document Number',
  //   width: 180,
  // },
  {
    field: 'fname',
    headerName: 'First Name',
    width: 180,
  },
  {
    field: 'lname',
    headerName: 'Last Name',
    width: 180,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 220,
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
    width: 180,
  },
  // {
  //   field: 'image',
  //   headerName: 'Image',
  //   width: 180,
  // },
  // {
  //   field: 'po_box',
  //   headerName: 'PO Box',
  //   width: 180,
  // },
  // {
  //   field: 'mbl_extension',
  //   headerName: 'Mobile Extension',
  //   width: 180,
  // },
  // {
  //   field: 'website',
  //   headerName: 'Website',
  //   width: 180,
  // },
  // {
  //   field: 'no_of_staff',
  //   headerName: 'Number of Staff',
  //   width: 180,
  // },
  // {
  //   field: 'companyID',
  //   headerName: 'Company ID',
  //   width: 180,
  // },
  // {
  //   field: 'district',
  //   headerName: 'District',
  //   width: 180,
  // },
  // {
  //   field: 'building_no',
  //   headerName: 'Building Number',
  //   width: 180,
  // },
  // {
  //   field: 'additional_number',
  //   headerName: 'Additional Number',
  //   width: 180,
  // },
  // {
  //   field: 'other_landline',
  //   headerName: 'Other Landline',
  //   width: 180,
  // },
  // {
  //   field: 'unit_number',
  //   headerName: 'Unit Number',
  //   width: 180,
  // },
  // {
  //   field: 'qr_corde',
  //   headerName: 'QR Code',
  //   width: 180,
  // },
  // {
  //   field: 'email_verified_at',
  //   headerName: 'Email Verified At',
  //   width: 180,
  // },
  // {
  //   field: 'password',
  //   headerName: 'Password',
  //   width: 180,
  // },
  // {
  //   field: 'verification_code',
  //   headerName: 'Verification Code',
  //   width: 180,
  // },
  // {
  //   field: 'cr_number',
  //   headerName: 'CR Number',
  //   width: 180,
  // },
  // {
  //   field: 'cr_activity',
  //   headerName: 'CR Activity',
  //   width: 180,
  // },
  // {
  //   field: 'company_name_eng',
  //   headerName: 'Company Name (English)',
  //   width: 180,
  // },
  // {
  //   field: 'company_name_arabic',
  //   headerName: 'Company Name (Arabic)',
  //   width: 180,
  // },
  // {
  //   field: 'bussiness_activity',
  //   headerName: 'Business Activity',
  //   width: 180,
  // },
  // {
  //   field: 'member_category',
  //   headerName: 'Member Category',
  //   width: 180,
  // },
  // {
  //   field: 'other_products',
  //   headerName: 'Other Products',
  //   width: 180,
  // },
  // {
  //   field: 'gpc',
  //   headerName: 'GPC',
  //   width: 180,
  // },
  // {
  //   field: 'product_addons',
  //   headerName: 'Product Add-ons',
  //   width: 180,
  // },
  // {
  //   field: 'total',
  //   headerName: 'Total',
  //   width: 180,
  // },
  // {
  //   field: 'contactPerson',
  //   headerName: 'Contact Person',
  //   width: 180,
  // },
  // {
  //   field: 'companyLandLine',
  //   headerName: 'Company Landline',
  //   width: 180,
  // },
  // {
  //   field: 'documents',
  //   headerName: 'Documents',
  //   width: 180,
  // },
  // {
  //   field: 'address_image',
  //   headerName: 'Address Image',
  //   width: 180,
  // },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
  },
  // {
  //   field: 'is_login',
  //   headerName: 'Is Login',
  //   width: 180,
  // },
  // {
  //   field: 'payment_type',
  //   headerName: 'Payment Type',
  //   width: 180,
  // },
  // {
  //   field: 'payment_status',
  //   headerName: 'Payment Status',
  //   width: 180,
  // },
  // {
  //   field: 'online_payment',
  //   headerName: 'Online Payment',
  //   width: 180,
  // },
  // {
  //   field: 'remember_token',
  //   headerName: 'Remember Token',
  //   width: 180,
  // },
  // {
  //   field: 'parent_memberID',
  //   headerName: 'Parent Member ID',
  //   width: 180,
  // },
  // {
  //   field: 'industryTypes',
  //   headerName: 'Industry Types',
  //   width: 180,
  // },
  // {
  //   field: 'invoice_file',
  //   headerName: 'Invoice File',
  //   width: 180,
  // },
  // {
  //   field: 'otp_status',
  //   headerName: 'OTP Status',
  //   width: 180,
  // },
  // {
  //   field: 'transaction_id',
  //   headerName: 'Transaction ID',
  //   width: 180,
  // },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;

    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;

    }
  },
  // {
  //   field: 'gcpGLNID',
  //   headerName: 'GCP GLN ID',
  //   width: 180,
  // },
  // {
  //   field: 'gln',
  //   headerName: 'GLN',
  //   width: 180,
  // },
  // {
  //   field: 'gcp_type',
  //   headerName: 'GCP Type',
  //   width: 180,
  // },
  // {
  //   field: 'deleted_at',
  //   headerName: 'Deleted At',
  //   width: 180,
  // },
  // {
  //   field: 'gcp_expiry',
  //   headerName: 'GCP Expiry',
  //   width: 180,
  // },
  // {
  //   field: 'memberID',
  //   headerName: 'Member ID',
  //   width: 180,
  // },
  // {
  //   field: 'user_id',
  //   headerName: 'User ID',
  //   width: 180,
  // },
  // {
  //   field: 'remarks',
  //   headerName: 'Remarks',
  //   width: 180,
  // },
  // {
  //   field: 'assign_to',
  //   headerName: 'Assign To',
  //   width: 180,
  // },
  // {
  //   field: 'membership_category',
  //   headerName: 'Membership Category',
  //   width: 180,
  // },
  // {
  //   field: 'membership_category_id',
  //   headerName: 'Membership Category ID',
  //   width: 180,
  // },
  // {
  //   field: 'upgradation_disc',
  //   headerName: 'Upgradation Discount',
  //   width: 180,
  // },
  // {
  //   field: 'upgradation_disc_amount',
  //   headerName: 'Upgradation Discount Amount',
  //   width: 180,
  // },
  // {
  //   field: 'renewal_disc',
  //   headerName: 'Renewal Discount',
  //   width: 180,
  // },
  // {
  //   field: 'renewal_disc_amount',
  //   headerName: 'Renewal Discount Amount',
  //   width: 180,
  // },
  // {
  //   field: 'membership_otherCategory',
  //   headerName: 'Membership Other Category',
  //   width: 180,
  // },
  // {
  //   field: 'activityID',
  //   headerName: 'Activity ID',
  //   width: 180,
  // },
  // {
  //   field: 'registration_type',
  //   headerName: 'Registration Type',
  //   width: 180,
  // },
  // {
  //   field: 'city',
  //   headerName: 'City',
  //   width: 180,
  // },
  // {
  //   field: 'country',
  //   headerName: 'Country',
  //   width: 180,
  // },
  // {
  //   field: 'state',
  //   headerName: 'State',
  //   width: 180,
  // },
  // {
  //   field: 'zip_code',
  //   headerName: 'Zip Code',
  //   width: 180,
  // },
  // {
  //   field: 'old_member_recheck',
  //   headerName: 'Old Member Recheck',
  //   width: 180,
  // },




];





export const memberHistoryColumnData = [
  // {
  //   field: 'transaction_id',
  //   headerName: 'Transaction ID',
  //   width: 180,
  // },
  {
    field: 'subject',
    headerName: 'Subject',
    width: 280,
  },

  {
    field: 'user.email',
    headerName: 'User Email',
    width: 180,
    valueGetter: (params) => {
      // Access the 'email' property within the 'user' object
      const userEmail = params.row.user ? params.row.user.email : '';
      return userEmail;
    },
  },

  {
    field: 'admin_id',
    headerName: 'Admin Email',
    width: 180,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',

    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },

  // {
  //   field: 'created_by_admin',
  //   // if value is 1 show yes else no
  //   headerName: 'Created By Admin',
  //   width: 180,
  //   valueGetter: (params) => {
  //     return params.value === 1 ? 'Yes' : 'No';
  //   },
  // }



]



export const registeredmemberColumn = [
  {
    field: 'id',
    headerName: 'Product ID',
    width: 180,
  },
  {
    field: 'combined_description',
    headerName: 'Product Name',
    width: 280,
    valueGetter: (params) => {
      return params.row.member_category_description || params.row.product_name || '';
    },
  },
  {
    field: 'Registration_fee',
    headerName: 'Registration fee',
    width: 180,
    valueGetter: (params) => {
      return params.row.member_registration_fee || params.row.other_products_subscription_total_price || '';
    },
  },
  {
    field: 'Yearly_fee',
    headerName: 'Yearly fee',
    width: 180,
    valueGetter: (params) => {
      return params.row.gtin_yearly_subscription_fee || params.row.product_subscription_fee || '';
    },
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 180,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  // {
  //   field: 'product_type',
  //   headerName: 'Product type',
  //   width: 180,
  // },
  // {
  //   field: 'quotation',
  //   headerName: 'Quotation',
  //   width: 180,
  // },




]



export const productsColumn = [
  {
    field: 'transaction_id',
    headerName: 'Transaction ID',
    width: 180,
  },
  {
    field: 'created_at',
    headerName: 'Operation Date',
    width: 180,
    valueGetter: (params) => {
      const operationDate = new Date(params.row.created_at);
      return operationDate.toISOString().split('T')[0];
    },
  },
  {
    field: 'admin_id',
    headerName: 'Created By',
    width: 180,
    valueGetter: (params) => {
      return params.row.admin_id ? `User ID ${params.row.admin_id}` : 'Unknown';
    },
  },
  {
    field: 'productnameenglish',
    headerName: 'Product Name (English)',
    width: 200,
  },
  {
    field: 'productnamearabic',
    headerName: 'Product Name (Arabic)',
    width: 200,
  },
  {
    field: 'BrandName',
    headerName: 'Brand Name',
    width: 150,
  },
  {
    field: 'ProductType',
    headerName: 'Product Type',
    width: 180,
  },
  {
    field: 'Origin',
    headerName: 'Origin',
    width: 150,
  },
  {
    field: 'PackagingType',
    headerName: 'Packaging Type',
    width: 150,
  },
  {
    field: 'unit',
    headerName: 'Unit',
    width: 100,
  },
  {
    field: 'size',
    headerName: 'Size',
    width: 100,
  },
  {
    field: 'front_image',
    headerName: 'Front Image',
    width: 150,
    renderCell: (params) => (
      <img
        src={params.row.front_image}
        alt="Front Image"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
  },
  {
    field: 'back_image',
    headerName: 'Back Image',
    width: 150,
    renderCell: (params) => (
      <img
        src={params.row.back_image}
        alt="Back Image"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 100,
  },
  {
    field: 'barcode',
    headerName: 'Barcode',
    width: 150,
  },
  {
    field: 'gpc',
    headerName: 'GPC',
    width: 180,
  },
  {
    field: 'countrySale',
    headerName: 'Country Sale',
    width: 150,
  },
  {
    field: 'HSCODES',
    headerName: 'HS Codes',
    width: 150,
  },
  {
    field: 'details_page',
    headerName: 'Details (English)',
    width: 200,
  },
  {
    field: 'details_page_ar',
    headerName: 'Details (Arabic)',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    valueGetter: (params) => (params.row.status === 1 ? 'Active' : 'Inactive'),
  },
  {
    field: 'gtin_type',
    headerName: 'GTIN Type',
    width: 150,
  },
  {
    field: 'product_url',
    headerName: 'Product URL',
    width: 200,
    renderCell: (params) => (
      <a href={params.row.product_url} target="_blank" rel="noopener noreferrer">
        {params.row.product_url}
      </a>
    ),
  },
  {
    field: 'product_link_url',
    headerName: 'Product Link URL',
    width: 200,
    renderCell: (params) => (
      <a href={params.row.product_link_url} target="_blank" rel="noopener noreferrer">
        {params.row.product_link_url}
      </a>
    ),
  },
  {
    field: 'BrandNameAr',
    headerName: 'Brand Name (Arabic)',
    width: 150,
  },
  {
    field: 'readyForGepir',
    headerName: 'Ready for Gepir',
    width: 150,
  },
  {
    field: 'gepirPosted',
    headerName: 'Gepir Posted',
    width: 150,
  },
];




// Digital Link Data Column
export const SafetyInformationColumn = [
  {
    field: "SafetyDetailedInformation",
    headerName: "Safety Detailed Information",
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: "Link Type",
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: "Lang",
    width: 180,
    editable: true,
  },
  {
    field: "TargetURL",
    headerName: "Target URL",
    width: 150,
    editable: true,
  },

  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },

  {
    field: "logo",
    headerName: "Logo",
    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const imageUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      return (
        <img
          src={imageUrl}
          alt="Image"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />
      );
    },
    renderEditCell: (params) =>
      renderImageEditInputCell({ ...params, fieldUpdated: "logoUpdated" }),
    editable: true,
    width: 180,
    type: "string",
  },
  {
    field: "companyName",
    headerName: "Company Name",
    width: 150,
    editable: true,
  },
  {
    field: "process",
    headerName: "Process",
    width: 150,
    editable: true,
  },
];

export const RecipeColumn = [
  {
    field: "logo",
    headerName: "Logo",
    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const imageUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      return (
        <img
          src={imageUrl}
          alt="Image"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />
      );
    },
    renderEditCell: (params) =>
      renderImageEditInputCell({ ...params, fieldUpdated: "logoUpdated" }),
    editable: true,
    width: 180,
    type: "string",
  },
  {
    field: "title",
    headerName: "Title",
    width: 180,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 180,
    editable: true,
  },
  {
    field: "ingredients",
    headerName: "Ingredients",
    width: 150,
    editable: true,
  },

  {
    field: "LinkType",
    headerName: "Link Type",
    width: 180,
    editable: true,
  },
  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },
];

export const PromotionalOffersColumns = [
  {
    field: "PromotionalOffers",
    headerName: "Promotional Offers",
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: "Link Type",
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: "Lang",
    width: 180,
    editable: true,
  },
  {
    field: "TargetURL",
    headerName: "Target URL",
    width: 150,
    editable: true,
  },

  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },
  {
    field: "ExpiryDate",
    headerName: "ExpiryDate",
    width: 180,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    width: 180,
    editable: true,
    type: "Float",
  },
  {
    field: "banner",
    headerName: "Banner",
    width: 180,
    editable: true,
  },
];

export const ProductLocationofOriginColumn = [
  {
    field: "ProductLocationOrigin",
    headerName: "Product Location Origin",
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: "Link Type",
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: "Lang",
    width: 180,
    editable: true,
  },
  {
    field: "TargetURL",
    headerName: "Target URL",
    width: 150,
    editable: true,
  },

  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },
  {
    field: "ExpiryDate",
    headerName: "ExpiryDate",
    width: 180,
    editable: true,
  },
];

export const ProductRecallColumn = [
  {
    field: "ProductRecall",
    headerName: "Product Recall",
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: "Link Type",
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: "Lang",
    width: 180,
    editable: true,
  },
  {
    field: "TargetURL",
    headerName: "Target URL",
    width: 150,
    editable: true,
  },

  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },
  {
    field: "ExpiryDate",
    headerName: "ExpiryDate",
    width: 180,
    editable: true,
  },
];

export const PackagingCompositionColumn = [
  {
    field: "logo",
    headerName: "Logo",
    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const imageUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      return (
        <img
          src={imageUrl}
          alt="Image"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />
      );
    },
    renderEditCell: (params) =>
      renderImageEditInputCell({ ...params, fieldUpdated: "logoUpdated" }),
    editable: true,
    width: 180,
    type: "string",
  },
  {
    field: "title",
    headerName: "Title",
    width: 180,
    editable: true,
  },
  {
    field: "consumerProductVariant",
    headerName: "Consumer Product Variant",
    width: 180,
    editable: true,
  },
  {
    field: "packaging",
    headerName: "Packaging",
    width: 150,
    editable: true,
  },

  {
    field: "material",
    headerName: "Material",
    width: 180,
    editable: true,
  },
  {
    field: "recyclability",
    headerName: "Recyclability",
    width: 180,
    editable: true,
  },
  {
    field: "productOwner",
    headerName: "ProductOwner",
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: "LinkType",
    width: 180,
    editable: true,
  },
  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },
  {
    field: "brand_owner",
    headerName: "brand_owner",
    width: 180,
    editable: true,
  },
];

export const ElectronicLeafletsColumn = [
  {
    field: "ProductLeafletInformation",
    headerName: "Product Leaflets Information",
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: "Lang",
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: "Link Type",
    width: 180,
    editable: true,
  },

  {
    field: "TargetURL",
    headerName: "Target URL",
    width: 150,
    editable: true,
  },

  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },

  {
    field: "PdfDoc",
    headerName: "Pdf Doc",
    width: 180,
    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const docUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      const onClickIcon = () => {
        if (fieldUpdated) {
          // removing the "data:application/pdf;base64," part
          const base64 = docUrl.split(",")[1];
          const binary = atob(base64);
          const binaryLen = binary.length;
          const buffer = new ArrayBuffer(binaryLen);
          const view = new Uint8Array(buffer);
          for (let i = 0; i < binaryLen; i++) {
            view[i] = binary.charCodeAt(i);
          }
          // create Blob from ArrayBuffer
          const blob = new Blob([view], { type: "application/pdf" });

          // create an object URL from the Blob
          const objectUrl = URL.createObjectURL(blob);

          // open a link to the Object URL
          const link = document.createElement("a");
          link.href = objectUrl;
          link.download = "file.pdf"; // you can set file name here
          link.click();
        } else {
          window.open(docUrl, "_blank");
        }
      };

      return (
        <InsertDriveFileIcon
          style={{
            color: "black",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={onClickIcon}
        />
      );
    },

    renderEditCell: (params) =>
      renderDocEditInputCell({ ...params, fieldUpdated: "logoUpdated" }),
    editable: true,
    type: "string",
  },
];


export const ProductContentColumn = [
  {
    field: "ProductAllergenInformation",
    headerName: "ProductAllergenInformation",
    width: 180,
    editable: true,
  },
  {
    field: "ProductNutrientsInformation",
    headerName: "Product Nutrients Information",
    width: 180,
    editable: true,
  },
  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },
  {
    field: "LinkType",
    headerName: "LinkType",
    width: 150,
    editable: true,
  },

  {
    field: "Batch",
    headerName: "Batch",
    width: 180,
    editable: true,
  },
  {
    field: "Expiry",
    headerName: "Expiry",
    width: 180,
    editable: true,
  },

  {
    field: "Serial",
    headerName: "Serial",
    width: 120,
    editable: true,
  },

  {
    field: "ManufacturingDate",
    headerName: "Manufacturing Date",
    width: 180,
    editable: true,
    type: "date",
    valueGetter: (params) => {
      return new Date(params.row.ManufacturingDate);
    },
  },
  {
    field: "bestBeforeDate",
    headerName: "best Before Date",
    width: 180,
    editable: true,
  },
  {
    field: "GLNIDFrom",
    headerName: "GLNID From",
    width: 180,
    editable: true,
  },
  {
    field: "unitPrice",
    headerName: "unit Price",
    width: 180,
    editable: true,
    type: "float",
  },
  {
    field: "ingredients",
    headerName: "ingredients",
    width: 180,
    editable: true,
  },
  {
    field: "allergen_info",
    headerName: "Allergen info",
    width: 180,
    editable: true,
  },
  {
    field: "calories",
    headerName: "calories",
    width: 180,
    editable: true,
  },
  {
    field: "sugar",
    headerName: "sugar",
    width: 180,
    editable: true,
  },
  {
    field: "salt",
    headerName: "salt",
    width: 180,
    editable: true,
  },
  {
    field: "fat",
    headerName: "fat",
    width: 180,
    editable: true,
  },
];



export const newlyRegisteredMembersColumn = [
  {
    field: 'company_name_eng',
    headerName: 'Company Name English',
    width: 180,
  },
  {
    field: 'company_name_arabic',
    headerName: 'Company Name Arabic',
    width: 180,
  },
  {
    field: 'contactPerson',
    headerName: 'Contact Person',
    width: 180,
  },
  {
    field: 'cr_activity',
    headerName: 'CR Activity',
    width: 180,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 220,
  },
  {
    field: 'gcpGLNID',
    headerName: 'GCP GLN ID',
    width: 180,
  },
  {
    field: 'gln',
    headerName: 'GLN',
    width: 180,
  },
  {
    field: 'transaction_id',
    headerName: 'Transaction ID',
    width: 180,
  },
  {
    field: 'membership_category',
    headerName: 'Membership Category',
    width: 180,
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 180,
  },
  {
    field: 'state',
    headerName: 'State',
    width: 180,
  },
  {
    field: 'city',
    headerName: 'City',
    width: 180,
  },
  {
    field: 'gcp_expiry',
    headerName: 'GCP Expiry',
    width: 180,
    // type: 'dateTime',

    // valueGetter: (params) => {
    //   return params.value ? new Date(params.value) : null;
    // }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,

    // type: 'dateTime',
    // valueGetter: (params) => {
    //   // Convert the string date to a Date object
    //   return params.value ? new Date(params.value) : null;
    // }
  },



]



export const pendingApprovalColumn = [
  {
    field: 'activityID',
    headerName: 'Activity ID',
    width: 180,
  },
  {
    field: 'company_name_eng',
    headerName: 'Company Name English',
    width: 180,
  },
  {
    field: 'company_name_arabic',
    headerName: 'Company Name Arabic',
    width: 180,
  },
  {
    field: 'contactPerson',
    headerName: 'Contact Person',
    width: 180,
  },
  {
    field: 'cr_activity',
    headerName: 'CR Activity',
    width: 180,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 220,
  },
  {
    field: 'gcpGLNID',
    headerName: 'GCP GLN ID',
    width: 180,
  },
  {
    field: 'gln',
    headerName: 'GLN',
    width: 180,
  },
  {
    field: 'transaction_id',
    headerName: 'Transaction ID',
    width: 180,
  },
  {
    field: 'membership_category',
    headerName: 'Membership Category',
    width: 180,
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 180,
  },
  {
    field: 'qr_corde',
    headerName: 'QR Code',
    width: 180,
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
    width: 180,
  },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 180,
  },
  {
    field: 'gcp_expiry',
    headerName: 'GCP Expiry',
    width: 180,
    // type: 'dateTime',

    // valueGetter: (params) => {
    //   return params.value ? new Date(params.value) : null;
    // }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,

    // type: 'dateTime',
    // valueGetter: (params) => {
    //   // Convert the string date to a Date object
    //   return params.value ? new Date(params.value) : null;
    // }
  },



]


export const registerdMemberColumn = [
  {
    field: 'activityID',
    headerName: 'Activity ID',
    width: 180,
  },
  {
    field: 'additional_number',
    headerName: 'Additional Number',
    width: 180,
  },
  {
    field: 'company_name_eng',
    headerName: 'Company Name English',
    width: 180,
  },
  {
    field: 'company_name_arabic',
    headerName: 'Company Name Arabic',
    width: 180,
  },
  {
    field: 'contactPerson',
    headerName: 'Contact Person',
    width: 180,
  },
  {
    field: 'cr_activity',
    headerName: 'CR Activity',
    width: 180,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 220,
  },
  {
    field: 'gcpGLNID',
    headerName: 'GCP GLN ID',
    width: 180,
  },
  {
    field: 'gln',
    headerName: 'GLN',
    width: 180,
  },
  {
    field: 'transaction_id',
    headerName: 'Transaction ID',
    width: 180,
  },
  {
    field: 'membership_category',
    headerName: 'Membership Category',
    width: 180,
  },
  {
    field: 'other_landline',
    headerName: 'Other Landline',
    width: 180,
  },
  {
    field: 'user_type',
    headerName: 'User Type',
    width: 180,
  },
  {
    field: 'qr_corde',
    headerName: 'QR Code',
    width: 180,
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
    width: 180,
  },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 180,
  },
  {
    field: 'gcp_expiry',
    headerName: 'GCP Expiry',
    width: 180,
    // type: 'dateTime',

    // valueGetter: (params) => {
    //   return params.value ? new Date(params.value) : null;
    // }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,

    // type: 'dateTime',
    // valueGetter: (params) => {
    //   // Convert the string date to a Date object
    //   return params.value ? new Date(params.value) : null;
    // }
  },



]


export const memberForRenevalColumn = [
  {
    field: 'activityID',
    headerName: 'Activity ID',
    width: 180,
  },
  {
    field: 'companyID',
    headerName: 'Company ID',
    width: 180,
  },
  {
    field: 'company_name_eng',
    headerName: 'Company Name English',
    width: 180,
  },
  {
    field: 'company_name_arabic',
    headerName: 'Company Name Arabic',
    width: 180,
  },
  {
    field: 'cr_documentID',
    headerName: 'CR Document ID',
    width: 180,
  },
  {
    field: 'document_number',
    headerName: 'Document Number',
    width: 180,
  },
  {
    field: 'contactPerson',
    headerName: 'Contact Person',
    width: 180,
  },
  {
    field: 'cr_activity',
    headerName: 'CR Activity',
    width: 180,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 220,
  },
  {
    field: 'location_uk',
    headerName: 'Location UK',
    width: 180,
  },
  {
    field: 'member_category',
    headerName: 'Member Category',
    width: 180,
  },
  {
    field: 'membership_otherCategory',
    headerName: 'Membership Other Category',
    width: 180,
  },
  {
    field: 'gcpGLNID',
    headerName: 'GCP GLN ID',
    width: 180,
  },
  {
    field: 'gln',
    headerName: 'GLN',
    width: 180,
  },
  {
    field: 'transaction_id',
    headerName: 'Transaction ID',
    width: 180,
  },
  {
    field: 'membership_category',
    headerName: 'Membership Category',
    width: 180,
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 180,
  },
  {
    field: 'qr_corde',
    headerName: 'QR Code',
    width: 180,
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
    width: 180,
  },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 180,
  },
  {
    field: 'gcp_expiry',
    headerName: 'GCP Expiry',
    width: 180,
    // type: 'dateTime',

    // valueGetter: (params) => {
    //   return params.value ? new Date(params.value) : null;
    // }
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,

    // type: 'dateTime',
    // valueGetter: (params) => {
    //   // Convert the string date to a Date object
    //   return params.value ? new Date(params.value) : null;
    // }
  },
]