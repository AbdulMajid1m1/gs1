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

export const ListOfCustomersColumn = (t, i18n) => [
  {
    field: 'id',
    headerName:  t('Customer Id'),
    width: 120,
    editable: true,
  },
  {
    field: 'user_type',
    headerName: t('User Type'),
    width: 180,
    editable: true,
  },
  {
    field: 'slug',
    headerName: t('Slug'),
    width: 180,
    editable: true,
  },
  {
    field: 'location_uk',
    headerName: t('Location UK'),
    width: 100,
    editable: true,
  },
  {
    field: 'have_cr',
    headerName:  t('Have CR'),
    width: 100,
    editable: true,
  },
  {
    field: 'cr_documentID',
    headerName:  t('CR Document ID'),
    width: 180,
    editable: true,
  },
  {
    field: 'document_number',
    headerName: t('Document Number'),
    width: 180,
    editable: true,
  },
  {
    field: 'fname',
    headerName:  t('First Name'),
    width: 180,
    editable: true,
  },
  {
    field: 'lname',
    headerName:  t('Last Name'),
    width: 180,
    editable: true,
  },
  {
    field: 'email',
    headerName:  t('Email'),
    width: 180,
    editable: true,
  },
  {
    field: 'mobile',
    headerName: t('Mobile'),
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
    headerName: t('Address'),
    width: 180,
    editable: true,
  },
  {
    field: 'address1',
    headerName: t('Address 1'),
    width: 180,
    editable: true,
  },
  {
    field: 'address2',
    headerName:  t('Address 2'),
    width: 180,
    editable: true,
  },
  {
    field: 'po_box',
    headerName: t('PO Box'),
    width: 180,
    editable: true,
  },
  {
    field: 'mbl_extension',
    headerName:  t('Mobile Extension'),
    width: 180,
    editable: true,
  },
  {
    field: 'website',
    headerName:  t('Website'),
    width: 180,
    editable: true,
  },
  {
    field: 'no_of_staff',
    headerName:  t('Number of Staff'),
    width: 100,
    editable: true,
  },
  {
    field: 'companyID',
    headerName: t('Company ID'),
    width: 180,
    editable: true,
  },
  {
    field: 'district',
    headerName:  t('District'),
    width: 180,
    editable: true,
  },
  {
    field: 'building_no',
    headerName:  t('Building Number'),
    width: 180,
    editable: true,
  },
  {
    field: 'additional_number',
    headerName: t('Additional Number'),
    width: 180,
    editable: true,
  },
  {
    field: 'other_landline',
    headerName:  t('Other Landline'),
    width: 180,
    editable: true,
  },
  {
    field: 'unit_number',
    headerName:  t('Unit Number'),
    width: 100,
    editable: true,
  },
  {
    field: 'qr_corde',
    headerName: t('QR Code'),
    width: 180,
    editable: true,
  },
  {
    field: 'email_verified_at',
    headerName:  t('Email Verified At'),
    width: 180,
    editable: true,
  },
  {
    field: 'code',
    headerName: t('CODE'),
    width: 180,
    editable: true,
  },
  {
    field: 'verification_code',
    headerName:  t('Verification Code'),
    width: 180,
    editable: true,
  },
  {
    field: 'cr_number',
    headerName: t('cr number'),
    width: 180,
    editable: true,
  },
  {
    field: 'cr_activity',
    headerName: t('Cr Activity'),
    width: 180,
    editable: true,
  },
  {
    field: 'company_name_eng',
    headerName: t('Company Name English'),
    width: 180,
    editable: true,
  },
  {
    field: 'company_name_arabic',
    headerName: t('Company Name Arabic'),
    width: 180,
    editable: true,
  },
  // Add more fields as needed
];

export const ShipmentRequestColumns = (t, i18n) => [
  {
    field: 'shipment_id',
    headerName: t('Shipment Id'),
    width: 120,
  },
  {
    field: 'vendor_id',
    headerName:  t('Vendor Id'),
    width: 120,
  },
  {
    field: 'customer_id',
    headerName: t('Customer Id'),
    width: 120,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 120,
  },
  {
    field: 'customer_id',
    headerName: t('Customer Id'),
    width: 120,
  },
  {
    field: 'datetime',
    headerName: t('Date Time'),
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

export const GtinColumn = (t, i18n) => [
  // {
  //   field: "product_id",
  //   headerName: "Product ID",
  //   width: 100,
  // },
  {
    field: "productnameenglish",
    headerName: t('Product Name English'),
    width: 180,
  },
  {
    field: "productnamearabic",
    headerName: t('Product Name Arabic'),
    width: 180,
  },
  {
    field: "BrandName",
    headerName: t('Brand Name English'),
    width: 180,
  },
  {
    field: "BrandNameAr",
    headerName: t('Brand Name Arabic'),
    width: 180,
  },
  {
    field: "qrcode",
    headerName: t('QRCode'),
    renderCell: (params) => <QRCodeCell value={params.row.barcode} />,
    // width: 50, // Adjust this width as needed
  },
  {
    field: "barcode",
    headerName: t('Barcode'),
    renderCell: GTINCell,
    width: 150,
  },
  {
    field: "front_image",
    headerName: t('Back Photo'),
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
    headerName: t('Back Photo'),
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
    headerName: t('Optional Image 1'), 
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
    headerName: t('Optional Image 2'),
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
    headerName: t('Optional Image 3'),
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
    headerName:  t('Product URL'),
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
    headerName:  t('Product Type'),
    width: 180,
  },
  {
    field: 'Origin',
    headerName:  t('Origin'), 
    width: 180,
  },
  {
    field: 'PackagingType',
    headerName: t('Packaging Type'),
    width: 180,
  },
  {
    field: 'unit',
    headerName: t('Unit'),
    width: 180,
  },
  {
    field: 'size',
    headerName: t('Size'),
    width: 180,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 120,
  // },
];

export const GlnColumn = (t, i18n) => {
   const columns =  [
  {
    field: 'product_id',
    headerName: t('Product ID'),
    width: 180,
  },
  {
    field: 'gcpGLNID',
    headerName: t('GCP GLN ID'),
    width: 180,
  },
  {
    field: 'locationNameEn',
    headerName: t('LOCATION NAME EN'),
    width: 180,
  },
  {
    field: 'locationNameAr',
    headerName: t('LOCATION NAME AR'),
    width: 150,
  },

  {
    field: 'GLNBarcodeNumber',
    headerName: t('GLN Barcode Number'),
    width: 180,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 180,
  },
];

if (i18n && i18n.language === 'ar') {
  columns.reverse();
}
return columns;
};

export const ViewSsccColumn = (t, i18n) => {
  const columns = [
    {
      field: 'sscc_id',
      headerName: t('SSCC ID'),
      width: 180,
    },
    {
      field: 'sscc_type',
      headerName: t('Type'),
      width: 180,
    },
    {
      field: 'SSCCBarcodeNumber',
      headerName: t('SSCC Barcode Number'),
      width: 280,
    },
  ];

  if (i18n && i18n.language === 'ar') {
    columns.reverse();
  }
  return columns;
};

export const Gs1AllMembers = (t, i18n) => [
  {
    field: 'member_type',
    headerName: t('Member Type'),
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '4px 8px',
          borderRadius: '10px',
          border: '2px solid',
          background: params.row.member_type === 'old' ? 'green' : 'crimson',
          color: "white",
        }}
      >
        {params.row.member_type === 'old' ? 'Old' : 'New'}
      </div >
    ),
  },
  {
    field: 'pending_invoices',
    headerName: t('PENDING TO DO'),
    width: 180,
    renderCell: params => (
      <div
        style={{
          padding: '4px 8px',
          borderRadius: '10px',
          border: '2px solid',
          borderColor: params.row.status === 'none' ? 'green' : 'crimson',
          color: params.row.status === 'none' ? 'green' : 'crimson',
          display: params.row.pending_invoices === 'none' ? 'none' : 'block',
        }}
      >
        {params.row.pending_invoices === 'none' ? '' : params.row.pending_invoices === 'for_review' ? 'For Review' : 'Pending for Approval'}
      </div >
    ),
  },
  {
    field: 'assign_to_admin_username', // or any unique name you prefer
    headerName: t('Assigned To'),
    width: 180,
    renderCell: params => (
      <div
        style={{
          padding: '4px 8px',
          borderRadius: '10px',
          border: params.row.assign_to_admin ? '2px solid' : 'none',
          // background: '#D1FFBD', // customize as needed
          color: 'green',
        }}
      >
        {params.row.assign_to_admin ? params.row.assign_to_admin.username : ''}
      </div>
    ),
  },
  {
    field: 'company_name_eng',
    headerName: t('Company Name English'),
    width: 180,
  },
  {
    field: 'companyID',
    headerName:  t('Company ID'),
    width: 140,
  },
  // {
  //   field: 'memberID',
  //   headerName: t('Member ID'),
  //   width: 180,
  // },
  {
    field: 'mobile',
    headerName: t('Mobile'),
    width: 180,
  },
  {
    field: 'remarks',
    headerName: t('REMARKS'),
    width: 180,
  },
  {
    field: 'status',
    headerName: t('Status'),
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
    headerName: t('CODE'),
    width: 180,
  },
  // {
  //   field: 'password',
  //   headerName: 'PASSWORD',
  //   width: 180,
  // },
  {
    field: 'membership_category',
    headerName: t('MEMBER CATEGORY'),
    width: 180,
  },
  {
    field: 'email',
    headerName: t('Email'),
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

export const MembersDocumentColumn = (t, i18n) => [
  {
    field: 'type',
    headerName: t('Type'),
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
    headerName: t('Document'),
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
    headerName: t('Transaction ID'),
    width: 180,
  },
  {
    field: 'uploaded_by',
    headerName: t('Uploaded By'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'doc_type',
    headerName: t('Doc Type'),
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

export const MembersBrandsColumn = (t, i18n) => [
  // {
  //   field: "id",
  //   headerName: "ID",
  //   width: 180,
  // },
  {
    field: 'name',
    headerName: t('Name'),
    width: 180,
  },
  {
    field: 'brand_certificate',
    headerName: t('Document'),
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
    headerName: t('Name Arabic'),
    width: 180,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 180,
  // },
  {
    field: 'status',
    headerName: t('Status'),
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
    headerName: t('Created At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const AdminBrandsColumn = (t, i18n) => [
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   width: 180,
  // },
  {
    field: 'name',
    headerName: t('Name'),
    width: 180,
  },
  {
    field: 'name_ar',
    headerName: t('Name[Arabic]'),
    width: 180,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 180,
  // },
  {
    field: 'brand_certificate',
    headerName: t('Documents'),
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
    headerName: t('Status'),
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
    headerName: t('Created At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const paymentSlipColumn = (t, i18n) => [
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
    headerName: t('Transaction ID'),
    width: 180,
  },
  {
    field: 'document',
    headerName: t('Documents'),
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
    headerName: t('Reject Reason'),
    width: 180,
  },
  // {
  //   field: 'status',
  //   headerName: 'Status',
  //   width: 180,
  // },
  {
    field: 'status',
    headerName: t('Status'),
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
  {
    field: 'created_at',
    headerName: t('Created At'),
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
    headerName: t('Updated At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'deleted_at',
    headerName: t('Deleted At'),
    width: 180,
  },
  {
    field: 'details',
    headerName: t('Details'),
    width: 180,
  },

  // {
  //   field: 'user_id',
  //   headerName: 'User ID',
  //   width: 180,
  // },



];

export const masterDataColumn = (t, i18n) => [

  {
    field: 'unit_code',
    headerName: t('Unit Code'),
    width: 180,
  },
  {
    field: 'unit_name',
    headerName: t('Unit Name'),
    width: 260,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? t('Active') : t('Inactive');
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const LanguageDataColumn = (t, i18n) => [

  {
    field: 'nameEnglish',
    headerName: t('Name[English]'),
    width: 300,
  },
  {
    field: 'namearabic',
    headerName: t('Name[Arabic]'),
    width: 300,
  },
 
];

export const megamenuDataColumn = (t, i18n) => [

  {
    field: 'name_en',
    headerName: t('Name[English]'),
    width: 180,
  },
  {
    field: 'name_ar',
    headerName: t('Name[Arabic]'),
    width: 260,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const CategoriesDataColumn = (t, i18n) => [

  {
    field: 'category_name_en',
    headerName: t('Category Name[English]'),
    width: 260,
  },
  {
    field: 'category_name_ar',
    headerName: t('Category Name[Arabic]'),
    width: 260,
  },
  {
    field: 'megamenu_id',
    headerName: t('Mega Menu'),
    width: 200,
  },
  {
    field: 'description',
    headerName: t('Description'),
    width: 260,
  },
  {
    field: 'url',
    headerName: t('Url'),
    width: 260,
  },
  {
    field: 'meta_title',
    headerName: t('Meta Title'),
    width: 200,
  },
  {
    field: 'meta_description',
    headerName: t('Meta Description'),
    width: 260,
  },
  {
    field: 'meta_keywords',
    headerName: t('Meta keywords'),
    width: 200,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const silderDataColumn = (t) => [

  {
    field: 'title',
    headerName: t('Title'),
    width: 260,
  },
  {
    field: 'description',
    headerName: t('Description'),
    width: 500,
    renderCell: (params) => (
      <div
        style={{
          overflowX: 'auto',
          maxWidth: '500px',
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: 'caption',
    headerName: t('Caption'),
    width: 200,
  }, {
    field: 'link',
    headerName: t('Link'),
    width: 200,
  },
  {
    field: 'image',
    headerName: t('Image'),
    width: 200,
    renderCell: (params) => (
      < img
        src={imageLiveUrl(params.row.image)}
        alt="Image"
        style={{
          width: '77%',
          height: '77%',
          objectFit: 'fill',
        }}
      />
    ),
  },
  {
    field: 'status',
    headerName: t('status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const FeaturedServicesDataColumn = (t) => [

  {
    field: 'image',
    headerName: t('Image'),
    width: 200,
    renderCell: (params) => (
      < img
        src={imageLiveUrl(params.row.image)}
        alt="Image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.image), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    ),
  },
  {
    field: 'link',
    headerName: t('Link'),
    width: 200,
  },
  {
    field: 'status',
    headerName: t('status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 200,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 200,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const FeaturedEventsDataColumn = (t) => [
  {
    field: 'title',
    headerName: t('Title'),
    width: 300,
    renderCell: (params) => (
      <div
        style={{
          overflowX: 'auto',
          maxWidth: '300px',
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: 'title_ar',
    headerName: t('Title ar'),
    width: 300,
    renderCell: (params) => (
      <div
        style={{
          overflowX: 'auto',
          maxWidth: '300px',
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: 'date',
    headerName: t('Date'),
    width: 200,
  },
  {
    field: 'image',
    headerName: t('Image'),
    width: 200,
    renderCell: (params) => (
      < img
        src={imageLiveUrl(params.row.image)}
        alt="Image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.image), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    ),
  },
  {
    field: 'link',
    headerName: t('Link'),
    width: 200,
  },
  {
    field: 'status',
    headerName: t('status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 200,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 200,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const FeaturedArticlesDataColumn = (t) => [
  {
    field: 'title',
    headerName: t('Title[English]'),
    width: 300,
    renderCell: (params) => (
      <div
        style={{
          overflowX: 'auto',
          maxWidth: '300px',
        }}
      >
        {params.value}
      </div>
    ),
  },

  {
    field: 'title_ar',
    headerName: t('Title [Arabic]'),
    width: 300,
    renderCell: (params) => (
      <div
        style={{
          overflowX: 'auto',
          maxWidth: '300px',
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: 'date',
    headerName: t('Date'),
    width: 200,
  },
  {
    field: 'image',
    headerName: t('Image'),
    width: 200,
    renderCell: (params) => (
      < img
        src={imageLiveUrl(params.row.image)}
        alt="Image"
        style={{
          width: '95%',
          height: '95%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.image), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    ),
  },
  {
    field: 'link',
    headerName: t('Link'),
    width: 200,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 200,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 200,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const ManagePagesDataColumn = (t, i18n) => [

  {
    field: 'name',
    headerName: t('Page Name[English]'),
    width: 250,
  },
  {
    field: 'name_ar',
    headerName: t('Page Name[Arabic]'),
    width: 260,
  },
  {
    field: 'slug',
    headerName: t('Slug'),
    width: 200,
  },
  {
    field: 'page_order',
    headerName: t('Page Order'),
    width: 200,
  },
  {
    field: 'sections',
    headerName: t('Sections'),
    width: 200,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const GS1PartnersDataColumn = (t, i18n) => [

  {
    field: 'image',
    headerName: t('Image'),
    width: 200,
    renderCell: (params) => (
      < img
        src={imageLiveUrl(params.row.image)}
        alt="Image"
        style={{
          width: '77%',
          height: '77%',
          objectFit: 'fill',
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.image), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    ),
  },

  {
    field: 'link',
    headerName: t('Link'),
    width: 250,
    renderCell: (params) => (
      <a
        href={params.value}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#6777ef', textDecoration: 'underline', cursor: 'pointer' }}
      >
        {params.value}
      </a>
    ),
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 200,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 200,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const BlogCategoriesDataColumn = (t, i18n) => [

  {
    field: 'name',
    headerName: t('Name'),
    width: 250,
  },
  {
    field: 'slug',
    headerName: t('Slug'),
    width: 250,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 250,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 250,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const FaqCategoriesDataColumn = (t, i18n) => [

  {
    field: 'name',
    headerName: t('Name'),
    width: 250,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 250,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 250,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const ManageTeamDataColumn = (t, i18n) => [

  {
    field: 'name',
    headerName: t('Name'),
    width: 260,
  },
  {
    field: 'job_title',
    headerName: t('Job Title'),
    width: 300,
    renderCell: (params) => (
      <div
        style={{
          overflowX: 'auto',
          maxWidth: '300px',
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: 'description',
    headerName: t('Description'),
    width: 350,
    renderCell: (params) => (
      <div
        style={{
          overflowX: 'auto',
          maxWidth: '350px',
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: 'image',
    headerName: t('Image'),
    width: 200,
    renderCell: (params) => (
      < img
        src={imageLiveUrl(params.row.image)}
        alt="Image"
        style={{
          width: '95%',
          height: '95%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.image), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    ),
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const BoardMembersDataColumn = (t, i18n) => [

  {
    field: 'name',
    headerName: t('Name'),
    width: 260,
  },
  {
    field: 'job_title',
    headerName: t('Job Title'),
    width: 260,
    renderCell: (params) => (
      <div
        style={{
          overflowX: 'auto',
          maxWidth: '300px',
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: 'description',
    headerName: t('Description'),
    width: 350,
    renderCell: (params) => (
      <div
        style={{
          overflowX: 'auto',
          maxWidth: '350px',
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: 'image',
    headerName: t('Image'),
    width: 200,
    renderCell: (params) => (
      < img
        src={imageLiveUrl(params.row.image)}
        alt="Image"
        style={{
          width: '95%',
          height: '95%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.image), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    ),
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const UserGuidepdfDataColumn = (t, i18n) => [

  {
    field: 'title',
    headerName: t('Title'),
    width: 300,
  },
  {
    field: 'Download',
    headerName: t('Download'),
    width: 250,
    renderCell: (params) => (
      <button
        style={{
          width: '100%',
          height: '70%',
          padding: '8px',
          background: '#6777ef',
          border: '1px solid #6777ef',
          color: 'white',
          borderRadius: '10px'
        }}
        onClick={() => handlepdfDownload(params.row.pdf)}
      >
        {/* {params.value} */}
        Download
      </button>
    ),
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

const handlepdfDownload = (pdfurl) => {
  const fileUrl = pdfurl;
  saveAs(fileUrl, `${pdfurl}.pdf`);
};

export const UserGuideVideoDataColumn = (t, i18n) => [

  {
    field: 'title',
    headerName: t('Title'),
    width: 300,
  },
  {
    field: 'Download',
    headerName: t('Download'),
    width: 250,
    renderCell: (params) => (
      <button
        style={{
          width: '100%',
          height: '70%',
          padding: '8px',
          background: '#6777ef',
          border: '1px solid #6777ef',
          color: 'white',
          borderRadius: '10px'
        }}
        onClick={() => handleVideoDownload(params.row.video)}
      >
        {/* {params.value} */}
        Download
      </button>
    ),
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      return params.value ? new Date(params.value) : null;
    }
  },
];

const handleVideoDownload = (videoUrl) => {
  const fileUrl = videoUrl;
  saveAs(fileUrl, `${videoUrl}.mp4`);
};

export const document = (t) => [

  {
    field: 'name',
    headerName: t('name'),
    width: 180,
  },
  {
    field: 'status',
    headerName: t('status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? t('Active') : t('Inactive');
    },
  },

  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const product_packaging = (t) => [

  {
    field: 'name',
    headerName: t('name'),
    width: 180,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === 1 ? 'green' : 'red',
          color: params.row.status === 1 ? 'green' : 'red',
        }}
      >
        {params.row.status === 1 ? 'Active' : 'Inactive'}
      </div>
    ),
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const footerMenuDataColumn = (t) => [

  {
    field: 'category_name_en',
    headerName: t('Category Name[English]'),
    width: 180,
  },
  {
    field: 'category_name_ar',
    headerName: t('Category Name[Arabic]'),
    width: 260,
  },
  {
    field: 'url',
    headerName: t('Url'),
    width: 260,
  },
  {
    field: 'parent_id',
    headerName: t('Category'),
    width: 150,
  },
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
          borderColor: params.row.status === 1 ? 'green' : 'red',
          color: params.row.status === 1 ? 'green' : 'red',
        }}
      >
        {params.row.status === 1 ? 'Active' : 'Inactive'}
      </div>
    ),
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const Other_Products = (t) => [

  {
    field: 'product_name',
    headerName: t('product Name English'),
    width: 260,
  },{
    field: 'name_ar',
    headerName: t('product Name Arabic'),
    width: 260,
  },
  {
    field: 'total_no_of_barcodes',
    headerName: t('total_no_of_barcodes'),
    width: 180,
  },
  {
    field: 'product_subscription_fee',
    headerName: t('product_subscription_fee'),
    width: 180,
  },
  {
    field: 'status',
    headerName:t('Status'),
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === 1 ? 'green' : 'red',
          color: params.row.status === 1 ? 'green' : 'red',
        }}
      >
        {params.row.status === 1 ? 'Active' : 'Inactive'}
      </div>
    ),
  },
  {
    field: 'code',
    headerName: t('code'),
    width: 180,
  },
  {
    field: 'med_subscription_fee',
    headerName: t('med_subscription_fee'),
    width: 180,
  },
  {
    field: 'variant',
    headerName: t('variant'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const Gcp_types = (t) => [

  {
    field: 'gcp_code',
    headerName: t('gcp_code'),
    width: 180,
  },
  {
    field: 'gcp_description',
    headerName: t('gcp_description'),
    width: 180,
  },

  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const counrty_sales = (t) => [

  {
    field: 'Alpha2',
    headerName: t('Alpha2'),
    width: 130,
  },
  {
    field: 'Alpha3',
    headerName: t('Alpha3'),
    width: 130,
  },
  {
    field: 'country_code_numeric3',
    headerName: t('country_code_numeric3'),
    width: 180,
  },
  {
    field: 'country_name',
    headerName: t('country_name'),
    width: 260,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const city = (t, i18n) => [

  {
    field: 'name',
    headerName: t('Name English'),
    width: 250,
  },
   {
    field: 'name_ar',
    headerName: t('Name Arabic'),
    width: 250,
  },
  {
    field: 'state_name',
    headerName: t('State'),
    width: 250,
  },

  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const state = (t, i18n) => [

  {
    field: 'name',
    headerName: t('Name English'),
    width: 200,
  },
   {
    field: 'name_ar',
    headerName: t('Name Arabic'),
    width: 200,
  },
  {
    field: 'country_id',
    headerName: t('Country'),
    width: 180,
  },

  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const crnumber__ = (t, i18n) => [

  {
    field: 'cr',
    headerName: 'cr',
    width: 180,
  },
  {
    field: 'activity',
    headerName: t('Activity'),
    width: 180,
  },
  {
    field: 'status',
    headerName: t('status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'isRegistered',
    headerName: t('isRegistered'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Yes' : 'No';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const document_type = (t, i18n) => [

  {
    field: 'file_name',
    headerName: t('Document name'),
    width: 280,
  },
  {
    field: 'status',
    headerName: t('status'),
    width: 180,
    valueGetter: (params) => {
      return params.value === 1 ? 'Active' : 'Inactive';
    },
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const country__ = (t, i18n) => [

  {
    field: 'name_en',
    headerName: t('Name[English]'),
    width: 180,
  },
  {
    field: 'name_ar',
    headerName: t('Name[Arabic]'),
    width: 180,
  },
  {
    field: 'country_shortName',
    headerName: t('Country short name'),
    width: 180,
  },
  {
    field: 'country_code',
    headerName: t('Country Code'),
    width: 180,
  },

  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const Hs_code = (t, i18n) => [

  {
    field: 'CNKEY',
    headerName: t('CNKEY'),
    width: 180,
  },
  {
    field: 'HSCODES',
    headerName: t('HSCODES'),
    width: 140,
  },
  {
    field: 'DescriptionEN',
    headerName: t('Description'),
    width: 750,
  },
  {
    field: 'addBy',
    headerName: t('AddBy'),
    width: 130,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const unspcs_ = (t, i18n) => [

  {
    field: 'commodity',
    headerName: t('commodity'),
    width: 180,
  },
  {
    field: 'title',
    headerName: t('Title'),
    width: 180,
  },
  {
    field: 'definition',
    headerName: t('definition'),
    width: 180,
  },
  {
    field: 'addedBy',
    headerName: t('AddedBy'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const financeColumn = (t, i18n) => [
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   width: 180,
  // },
  {
    field: 'type',
    headerName: t('Type'),
    width: 120,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === 'approved' ? 'green' : 'red',
          color: params.row.status === 'approved' ? 'green' : 'red',
        }}
      >
        {params.row.status}
      </div>
    ),
  },
  {
    field: 'document',
    headerName: t('Document'),
    width: 150,

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
    headerName: t('Transaction ID'),
    width: 180,
  },
  // {
  //   field: 'user_id',
  //   headerName: 'User ID',
  //   width: 180,
  // },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',

    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'doc_type',
    headerName: t('Doc Type'),
    width: 180,
  },
  // {
  //   field: 'status',
  //   headerName: 'Status',
  //   width: 180, 
  // },
  // {
  //   field: 'status',
  //   headerName: 'Status',
  //   width: 120,
  //   renderCell: params => (
  //     <div
  //       style={{
  //         padding: '5px',
  //         paddingLeft: '10px',
  //         paddingRight: '10px',
  //         borderRadius: '20px',
  //         border: '2px solid',
  //         borderColor: params.row.status === 'Active' ? 'green' : 'red',
  //         color: params.row.status === 'Active' ? 'green' : 'red',
  //       }}
  //     >
  //       {params.row.status}
  //     </div>
  //   ),
  // },



];

export const financePopUpMemberBankSlipColumn = (t, i18n) => [
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   width: 180,
  // },
  {
    field: 'type',
    headerName: t('Type'),
    width: 180,
  },
  {
    field: 'document',
    headerName: t('Document'),
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
    headerName: t('Transaction ID'),
    width: 180,
  },
  // {
  //   field: 'user_id',
  //   headerName: 'User ID',
  //   width: 180,
  // },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',

    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'doc_type', 
    headerName: t('Doc Type'),
    width: 180,
  },



];

export const bankSlipColumn = (t, i18n) => [
  {
    field: 'type',
    headerName: t('Type'),
    width: 180,
  },
  {
    field: 'document',
    headerName: t('Document'),
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
    headerName: t('Transaction ID'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',

    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'doc_type',
    headerName: t('Doc Type'),
    width: 180,
  },



];

export const helpDeskColumn = (t, i18n) => [
  {
    field: 'id',
    headerName: 'ID',
    width: 180,
  },
  {
    field: 'ticket_id',
    headerName: t('Ticket ID'),
    width: 180,
  },
  {
    field: 'subject',
    headerName: t('Subject'),
    width: 180,
  },
  {
    field: 'priority',
    headerName: t('Priority'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
  },




]

export const subscribedGtinColumn = (t, i18n) => [
  {
    field: 'Product',
    headerName: t('Product'),
    width: 180,
  },
  {
    field: 'Description',
    headerName: t('Description'),
    width: 180,
  },
  {
    field: 'Registered_Date',
    headerName: t('Registered Date'),
    width: 180,
  },
  {
    field: 'Expiry_date',
    headerName: t('Expiry date'),
    width: 180,
  },



]

export const submenusDataColumn = (t, i18n) => [
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   width: 180,
  // },
  {
    field: 'user_type',
    headerName: t('Member Type'),
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
    headerName: t('First Name'),
    width: 180,
  },
  {
    field: 'lname',
    headerName: t('Last Name'),
    width: 180,
  },
  {
    field: 'email',
    headerName: t('Email'),
    width: 220,
  },
  {
    field: 'mobile',
    headerName: t('Mobile'),
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
    headerName: t('Status'),
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
    headerName: t('Created At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;

    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
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

export const memberHistoryColumnData = (t) => [
  // {
  //   field: 'transaction_id',
  //   headerName: 'Transaction ID',
  //   width: 180,
  // },
  {
    field: 'subject',
    headerName: t('Subject'),
    width: 280,
  },

  {
    field: 'user.email',
    headerName: t('User Email'),
    width: 220,
    valueGetter: (params) => {
      // Access the 'email' property within the 'user' object
      const userEmail = params.row.user ? params.row.user.email : '';
      return userEmail;
    },
  },

  {
    field: 'admin_id',
    headerName: t('Admin Email'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',

    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
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

export const registeredmemberColumn = (t) => [

  {
    field: 'combined_description',
    headerName: t('product name'),
    width: 270,

  },

  {
    field: 'subscription_limit',
    headerName: t('Remaining limit'),
    width: 120,
  },
  {
    field: 'price',
    headerName: t('Registration fee'),
    width: 120,


  },
  {
    field: 'Yearly_fee',
    headerName: t('Yearly fee'),
    width: 120,

  },
  // {
  //   field: 'price',
  //   headerName: 'Price',
  //   width: 120,
  // },
  {
    field: 'status',
    headerName: t('Status'),
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === 'active' ? 'green' : 'red',
          color: params.row.status === 'active' ? 'green' : 'red',
        }}
      >
        {params.row.status === 'active' ? 'Active' : 'Inactive'}
      </div>
    ),
  },
  {
    field: 'expiry_date',
    headerName: t('Expiry Date'),
    width: 180,
    type: 'date',

    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;

    }
  },
  // {
  //   field: 'quotation',
  //   headerName: 'Quotation',
  //   width: 180,
  // },




]

export const productsColumn = (t) => [
  {
    field: 'transaction_id',
    headerName: t('Transaction ID'), 
    width: 180,
  },
  {
    field: 'created_at',
    headerName:  t('Operation Date'),
    width: 180,
    valueGetter: (params) => {
      const operationDate = new Date(params.row.created_at);
      return operationDate.toISOString().split('T')[0];
    },
  },
  {
    field: 'admin_id',
    headerName:  t('Created By'),
    width: 180,
    valueGetter: (params) => {
      return params.row.admin_id ? `User ID ${params.row.admin_id}` : 'Unknown';
    },
  },
  {
    field: 'productnameenglish',
    headerName:  t('Product Name (English)'),
    width: 200,
  },
  {
    field: 'productnamearabic',
    headerName:  t('Product Name (Arabic)'),
    width: 200,
  },
  {
    field: 'BrandName',
    headerName:  t('Brand Name'),
    width: 150,
  },
  {
    field: 'ProductType',
    headerName:  t('Product Type'),
    width: 180,
  },
  {
    field: 'Origin',
    headerName:  t('Origin'),
    width: 150,
  },
  {
    field: 'PackagingType',
    headerName: t('Packaging Type'),
    width: 150,
  },
  {
    field: 'unit',
    headerName: t('Unit'),
    width: 100,
  },
  {
    field: 'size',
    headerName: t('Size'),
    width: 100,
  },
  {
    field: 'front_image',
    headerName:  t('Front Image'),
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
    headerName: t('Back Image'),
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
    headerName: t('Quantity'),
    width: 100,
  },
  {
    field: 'barcode',
    headerName: t('Barcode'),
    width: 150,
  },
  {
    field: 'gpc',
    headerName: 'GPC',
    width: 180,
  },
  {
    field: 'countrySale',
    headerName: t('Country Of Sales'),
    width: 150,
  },
  {
    field: 'HSCODES',
    headerName: t('Hs Code'),
    width: 150,
  },
  {
    field: 'details_page',
    headerName:  t('Details (English)'),
    width: 200,
  },
  {
    field: 'details_page_ar',
    headerName: t('Details (Arabic)'),
    width: 200,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 100,
    valueGetter: (params) => (params.row.status === 1 ? 'Active' : 'Inactive'),
  },
  {
    field: 'gtin_type',
    headerName: t('GTIN Type'),
    width: 150,
  },
  {
    field: 'product_url',
    headerName:  t('Product URL'),
    width: 200,
    renderCell: (params) => (
      <a href={params.row.product_url} target="_blank" rel="noopener noreferrer">
        {params.row.product_url}
      </a>
    ),
  },
  {
    field: 'product_link_url',
    headerName: t('Product Link URL'),
    width: 200,
    renderCell: (params) => (
      <a href={params.row.product_link_url} target="_blank" rel="noopener noreferrer">
        {params.row.product_link_url}
      </a>
    ),
  },
  {
    field: 'BrandNameAr',
    headerName: t('Brand Name (Arabic)'),
    width: 150,
  },
  {
    field: 'readyForGepir', 
    headerName: t('Ready for Gepir'),
    width: 150,
  },
  {
    field: 'gepirPosted',
    headerName: t('Gepir Posted'),
    width: 150,
  },
];

// Digital Link Data Column
export const SafetyInformationColumn = (t, i18n) => [
  {
    field: "SafetyDetailedInformation",
    headerName: t('Safety Detailed Information'),
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName:  t('Link Type'),
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName:  t('Lang'),
    width: 180,
    editable: true,
  },
  {
    field: "TargetURL",
    headerName:  t('Target URL'),
    width: 150,
    editable: true,
  },

  {
    field: "GTIN",
    headerName: "GTIN" ,
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },

  {
    field: "logo",
    headerName:  t('Logo'),
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
    headerName: t('Company Name'),
    width: 150,
    editable: true,
  },
  {
    field: "process",
    headerName:  t('Process'),
    width: 150,
    editable: true,
  },
];

export const RecipeColumn = (t, i18n) => [
  {
    field: "logo",
    headerName:t('Logo'),
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
    headerName:t('Title'),
    width: 180,
    editable: true,
  },
  {
    field: "description",
    headerName:  t('Description'),
    width: 180,
    editable: true,
  },
  {
    field: "ingredients",
    headerName: t('Ingredients'),
    width: 150,
    editable: true,
  },

  {
    field: "LinkType",
    headerName: t('Link Type'),
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

export const PromotionalOffersColumns = (t, i18n) => [
  {
    field: "PromotionalOffers",
    headerName: t('Promotional Offers'),
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: t('Link Type'),
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName:  t('Lang'),
    width: 180,
    editable: true,
  },
  {
    field: "TargetURL",
    headerName:  t('Target URL'),
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
    headerName: t('Expiry Date'),
    width: 180,
    editable: true,
  },
  {
    field: "price",
    headerName: t('Price'),
    width: 180,
    editable: true,
    type: "Float",
  },
  {
    field: "banner",
    headerName:  t('Banner'),
    width: 180,
    editable: true,
  },
];

export const ProductLocationofOriginColumn  = (t, i18n) => [
  {
    field: "ProductLocationOrigin",
    headerName:  t('Product Location Origin'),
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: t('Link Type'),
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: t('Lang'),
    width: 180,
    editable: true,
  },
  {
    field: "TargetURL",
    headerName: t('Target URL'),
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
    headerName: t('Expiry Date'),
    width: 180,
    editable: true,
  },
];

export const ProductRecallColumn =  (t, i18n) => [
  {
    field: "ProductRecall",
    headerName: t('Product Recall'),
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: t('Link Type'),
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: t('Lang'),
    width: 180,
    editable: true,
  },
  {
    field: "TargetURL",
    headerName: t('Target URL'),
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
    headerName: t('Expiry Date'),
    width: 180,
    editable: true,
  },
];

export const PackagingCompositionColumn = (t, i18n) => [
  {
    field: "logo",
    headerName: t('Logo'),
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
    headerName: t('Title'),
    width: 180,
    editable: true,
  },
  {
    field: "consumerProductVariant",
    headerName: t('Consumer Product Variant'),
    width: 180,
    editable: true,
  },
  {
    field: "packaging",
    headerName:  t('Packaging'),
    width: 150,
    editable: true,
  },

  {
    field: "material",
    headerName:  t('Material'),
    width: 180,
    editable: true,
  },
  {
    field: "recyclability",
    headerName: t('Recyclability'),
    width: 180,
    editable: true,
  },
  {
    field: "productOwner",
    headerName: t('Product Owner'),
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName:  t('Link Type'),
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
    headerName: t('Brand Owner'),
    width: 180,
    editable: true,
  },
];

export const ElectronicLeafletsColumn = (t, i18n) => [
  {
    field: "ProductLeafletInformation",
    headerName: t('Product Leaflets Information'),
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: t('Lang'),
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: t('Link Type'),
    width: 180,
    editable: true,
  },

  {
    field: "TargetURL",
    headerName: t('Target URL'),
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
    headerName: t('Pdf Doc'),
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

export const ProductContentColumn = (t, i18n) => [
  {
    field: "ProductAllergenInformation",
    headerName: t('Product Allergen Information'),
    width: 180,
    editable: true,
  },
  {
    field: "ProductNutrientsInformation",
    headerName: t('Product Nutrients Information'),
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
    headerName: t('Link Type'),
    width: 150,
    editable: true,
  },

  {
    field: "Batch",
    headerName:  t('Batch'),
    width: 180,
    editable: true,
  },
  {
    field: "Expiry",
    headerName: t('Expiry'),
    width: 180,
    editable: true,
  },

  {
    field: "Serial",
    headerName: t('Serial'),
    width: 120,
    editable: true,
  },

  {
    field: "ManufacturingDate",
    headerName: t('Manufacturing Date'),
    width: 180,
    editable: true,
    type: "date",
    valueGetter: (params) => {
      return new Date(params.row.ManufacturingDate);
    },
  },
  {
    field: "bestBeforeDate",
    headerName:  t('best Before Date'),
    width: 180,
    editable: true,
  },
  {
    field: "GLNIDFrom",
    headerName:  t('GLNID From'),
    width: 180,
    editable: true,
  },
  {
    field: "unitPrice",
    headerName: t('unit Price'),
    width: 180,
    editable: true,
    type: "float",
  },
  {
    field: "ingredients",
    headerName: t('Ingredients'),
    width: 180,
    editable: true,
  },
  {
    field: "allergen_info",
    headerName:  t('Allergen info'),
    width: 180,
    editable: true,
  },
  {
    field: "calories",
    headerName:  t('calories'),
    width: 180,
    editable: true,
  },
  {
    field: "sugar",
    headerName:  t('sugar'),
    width: 180,
    editable: true,
  },
  {
    field: "salt",
    headerName:  t('salt'),
    width: 180,
    editable: true,
  },
  {
    field: "fat",
    headerName:  t('fat'),
    width: 180,
    editable: true,
  },
];

export const newlyRegisteredMembersColumn = (t, i18n) => [
  {
    field: 'profile',
    headerName: t('Profile'),
    width: 60,

  },
  {
    field: 'company_name_eng',
    headerName: t('Company Name English'),
    width: 180,
  },
  {
    field: 'company_name_arabic',
    headerName: t('Company Name Arabic'),
    width: 180,
  },
  {
    field: 'contactPerson',
    headerName: t('Contact Person'),
    width: 180,
  },
  {
    field: 'cr_activity',
    headerName: t('Cr Activity'),
    width: 180,
  },
  {
    field: 'email',
    headerName: t('Email'),
    width: 220,
  },
  {
    field: 'gcpGLNID',
    headerName: t('GCP GLN ID'),
    width: 180,
  },
  {
    field: 'gln',
    headerName: 'GLN',
    width: 180,
  },
  {
    field: 'transaction_id',
    headerName: t('Transaction ID'),
    width: 180,
  },
  {
    field: 'membership_category',
    headerName: t('Membership Category'),
    width: 180,
  },
  {
    field: 'country',
    headerName: t('Country'),
    width: 180,
  },
  {
    field: 'state',
    headerName: t('State'),
    width: 180,
  },
  {
    field: 'city',
    headerName: t('City'),
    width: 180,
  },
  {
    field: 'gcp_expiry',
    headerName: t('GCP Expiry'),
    width: 180,
    // type: 'dateTime',

    // valueGetter: (params) => {
    //   return params.value ? new Date(params.value) : null;
    // }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,

    // type: 'dateTime',
    // valueGetter: (params) => {
    //   // Convert the string date to a Date object
    //   return params.value ? new Date(params.value) : null;
    // }
  },



]

export const pendingApprovalColumn = (t, i18n) => [
  // {
  //   field: 'activityID',
  //   headerName: t('Activity ID'),
  //   width: 180,
  // },
  {
    field: 'profile',
    headerName:  t('Profile'),
    width: 60,

  },
  {
    field: 'company_name_eng',
    headerName: t('Company Name English'),
    width: 180,
  },
  {
    field: 'company_name_arabic',
    headerName: t('Company Name Arabic'),
    width: 180,
  },
  {
    field: 'contactPerson',
    headerName: t('Contact Person'),
    width: 180,
  },
  {
    field: 'cr_activity',
    headerName: t('Cr Activity'),
    width: 180,
  },
  {
    field: 'email',
    headerName: t('Email'),
    width: 220,
  },
  {
    field: 'gcpGLNID',
    headerName: t('GCP GLN ID'),
    width: 180,
  },
  {
    field: 'gln',
    headerName: 'GLN',
    width: 180,
  },
  {
    field: 'transaction_id',
    headerName: t('Transaction ID'),
    width: 180,
  },
  {
    field: 'membership_category',
    headerName: t('Membership Category'),
    width: 180,
  },
  {
    field: 'country',
    headerName: t('Country'),
    width: 180,
  },
  {
    field: 'qr_corde',
    headerName: t('QR Code'),
    width: 180,
  },
  {
    field: 'mobile',
    headerName: t('Mobile'),
    width: 180,
  },
  {
    field: 'slug',
    headerName: t('Slug'),
    width: 180,
  },
  {
    field: 'gcp_expiry',
    headerName: t('GCP Expiry'),
    width: 180,
    // type: 'dateTime',

    // valueGetter: (params) => {
    //   return params.value ? new Date(params.value) : null;
    // }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,

    // type: 'dateTime',
    // valueGetter: (params) => {
    //   // Convert the string date to a Date object
    //   return params.value ? new Date(params.value) : null;
    // }
  },



]

export const registerdMemberColumn = (t, i18n) => [
  {
    field: 'profile',
    headerName: t('Profile'),
    width: 60,

  },

  {
    field: 'company_name_eng',
    headerName: t('Company Name English'),
    width: 180,
  },
  {
    field: 'company_name_arabic',
    headerName: t('Company Name Arabic'),
    width: 180,
  },
  {
    field: 'activityID',
    headerName: t('Activity ID'),
    width: 180,
  },
  {
    field: 'additional_number',
    headerName: t('Additional Number'),
    width: 180,
  },
  {
    field: 'contactPerson',
    headerName: t('Contact Person'),
    width: 180,
  },
  {
    field: 'cr_activity',
    headerName: t('Cr Activity'),
    width: 180,
  },
  {
    field: 'email',
    headerName: t('Email'),
    width: 220,
  },
  {
    field: 'gcpGLNID',
    headerName: t('GCP GLN ID'),
    width: 180,
  },
  {
    field: 'gln',
    headerName: 'GLN',
    width: 180,
  },
  {
    field: 'transaction_id',
    headerName: t('Transaction ID'),
    width: 180,
  },
  {
    field: 'membership_category',
    headerName: t('Membership Category'),
    width: 180,
  },
  {
    field: 'other_landline',
    headerName: t('Other Landline'),
    width: 180,
  },
  {
    field: 'user_type',
    headerName: t('User Type'),
    width: 180,
  },
  {
    field: 'qr_corde',
    headerName: t('QR Code'),
    width: 180,
  },
  {
    field: 'mobile',
    headerName: t('Mobile'),
    width: 180,
  },
  {
    field: 'slug',
    headerName: t('Slug'),
    width: 180,
  },
  {
    field: 'gcp_expiry',
    headerName: t('GCP Expiry'),
    width: 180,
    // type: 'dateTime',

    // valueGetter: (params) => {
    //   return params.value ? new Date(params.value) : null;
    // }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,

    // type: 'dateTime',
    // valueGetter: (params) => {
    //   // Convert the string date to a Date object
    //   return params.value ? new Date(params.value) : null;
    // }
  },



]

export const memberForRenevalColumn = (t, i18n) => [
  // {
  //   field: 'activityID',
  //   headerName: t('Activity ID'),
  //   width: 180,
  // },
  {
    field: 'profile',
    headerName:  t('Profile'),
    width: 60,

  },
  {
    field: 'companyID',
    headerName: t('Company ID'),
    width: 180,
  },
  {
    field: 'company_name_eng',
    headerName: t('Company Name English'),
    width: 180,
  },
  {
    field: 'company_name_arabic',
    headerName: t('Company Name Arabic'),
    width: 180,
  },
  {
    field: 'cr_documentID',
    headerName: t('CR Document ID'),
    width: 180,
  },
  {
    field: 'document_number',
    headerName: t('Document Number'),
    width: 180,
  },
  {
    field: 'contactPerson',
    headerName: t('Contact Person'),
    width: 180,
  },
  {
    field: 'cr_activity',
    headerName: t('Cr Activity'),
    width: 180,
  },
  {
    field: 'email',
    headerName: t('Email'),
    width: 220,
  },
  {
    field: 'location_uk',
    headerName:  t('Location UK'),
    width: 180,
  },
  {
    field: 'member_category',
    headerName: t('Membership Category'),
    width: 180,
  },
  {
    field: 'membership_otherCategory',
    headerName:  t('Membership Other Category'),
    width: 180,
  },
  {
    field: 'gcpGLNID',
    headerName: t('GCP GLN ID'),
    width: 180,
  },
  {
    field: 'gln',
    headerName: 'GLN',
    width: 180,
  },
  {
    field: 'transaction_id',
    headerName: t('Transaction ID'),
    width: 180,
  },
  {
    field: 'membership_category',
    headerName: t('Membership Category'),
    width: 180,
  },
  {
    field: 'country',
    headerName: t('Country'),
    width: 180,
  },
  {
    field: 'qr_corde',
    headerName: t('QR Code'),
    width: 180,
  },
  {
    field: 'mobile',
    headerName: t('Mobile'),
    width: 180,
  },
  {
    field: 'slug',
    headerName: t('Slug'),
    width: 180,
  },
  {
    field: 'gcp_expiry',
    headerName: t('GCP Expiry'),
    width: 180,
    // type: 'dateTime',

    // valueGetter: (params) => {
    //   return params.value ? new Date(params.value) : null;
    // }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,

    // type: 'dateTime',
    // valueGetter: (params) => {
    //   // Convert the string date to a Date object
    //   return params.value ? new Date(params.value) : null;
    // }
  },
]

export const adminPaymentSlipsColumn = (t, i18n) => [
  {
    field: 'name',
    headerName: t('Name'),
    width: 180,
  },
  {
    field: 'email',
    headerName: t('Email'),
    width: 180,
  },
  {
    field: 'phone',
    headerName: t('Phone'),
    width: 180,
  },
  // {
  //   field: 'status',
  //   headerName: 'Status',
  //   width: 180,
  // },
  {
    field: 'status',
    headerName: t('Status'),
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
  {
    field: 'role',
    headerName: t('Role'),
    width: 180,
  },
  {
    field: 'date',
    headerName: t('Date'),
    width: 180,
  },




]

export const cardsRejectedColumn = (t, i18n) => [
  {
    field: 'company_name_eng',
    headerName: t('Company Name English'),
    width: 180,
  },
  {
    field: 'company_name_arabic',
    headerName: t('Company Name Arabic'),
    width: 180,
  },
  {
    field: 'other_products',
    headerName:  t('Other Products') ,
    width: 180,
  },
  {
    field: 'contactPerson',
    headerName: t('Contact Person'),
    width: 180,
  },
  // {
  //   field: 'status',
  //   headerName: 'Status',
  //   width: 180,
  // },
  {
    field: 'status',
    headerName: t('Status'),
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
  {
    field: 'transaction_id',
    headerName: t('Transaction ID'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'reject_reason',
    headerName: t('Reject Reason'),
    width: 180,
  },
  {
    field: 'remarks',
    headerName: t('Remarks'),
    width: 180,
  },
  {
    field: 'membership_category',
    headerName: t('Membership Category'),
    width: 180,
  },
  {
    field: 'city',
    headerName: t('City'),
    width: 180,
  },
  {
    field: 'country',
    headerName: t('Country'),
    width: 180,
  },
  {
    field: 'state',
    headerName: t('State'),
    width: 180,
  },
  {
    field: 'zip_code',
    headerName: t('Zip Code'),
    width: 180,
  },
  {
    field: 'pending_invoices',
    headerName: t('Pending Invoices'),
    width: 180,
  },




]

export const usersRejectedColumn = [
  {
    field: 'transaction_id',
    headerName: 'Transaction ID',
    width: 180,
  },
  {
    field: 'documents',
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



]

export const oldInActiveMemberColumn = (t, i18n) => [
  {
    field: 'MembershipID',
    headerName: t('Member Ship ID'),
    width: 180,
  },
  {
    field: 'MembershipYear',
    headerName: t('Membership Year'),
    width: 180,
  },
  {
    field: 'ApprovedBy',
    headerName:  t('Approved By'),
    width: 180,
  },
  {
    field: 'Amount',
    headerName: t('Amount'),
    width: 180,
  },
  {
    field: 'Description',
    headerName: t('Description'),
    width: 180,
  },
  {
    field: 'ModeOfPayment',
    headerName:  t('Mode Of Payment'),
    width: 180,
  },
  {
    field: 'PaymentDate',
    headerName:  t('Payment Date'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'Status',
    headerName: t('Status'),
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.Status === 'Active' ? 'green' : 'red',
          color: params.row.Status === 'Active' ? 'green' : 'red',
        }}
      >
        {params.row.Status}
      </div>
    ),
  },
  {
    field: 'UpdatedDate',
    headerName: t('Updated Date'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  // {
  //   field: 'MemberID',
  //   headerName: 'Member ID',
  //   width: 180,
  // },
  // {
  //   field: 'MembershipTypeID',
  //   headerName: 'Membership Type ID',
  //   width: 180,
  // },
  // {
  //   field: 'TransactionID',
  //   headerName: 'Transaction ID',
  //   width: 180,
  // },
  // {
  //   field: 'CreatedBy',
  //   headerName: 'Created By',
  //   width: 180,
  // },
  // {
  //   field: 'CreatedDate',
  //   headerName: 'Created Date',
  //   width: 180,
  //   type: 'dateTime',
  //   valueGetter: (params) =>
  //   {
  //     // Convert the string date to a Date object
  //     return params.value ? new Date(params.value) : null;
  //   }
  // },
  // {
  //   field: 'UpdatedBy',
  //   headerName: 'Updated By',
  //   width: 180,
  // },
  // {
  //   field: 'InitiatedType',
  //   headerName: 'Initiated Type',
  //   width: 180,
  // },
  // {
  //   field: 'InitiatedBy',
  //   headerName: 'Initiated By',
  //   width: 180,
  // },
  // {
  //   field: 'Reason',
  //   headerName: 'Reason',
  //   width: 180,
  // },



];

export const productsCategoryColumn = (t, i18n) => [
  {
    field: 'member_category_description',
    headerName:  t('Member Category Description'), 
    width: 220,
  },
  {
    field: 'member_category_description_ar',
    headerName:  t('Member Category Description Arabic'),
    width: 220,
  },
  {
    field: 'total_no_of_barcodes',
    headerName:  t('Total No Of Barcodes'),
    width: 180,
  },
  {
    field: 'member_registration_fee',
    headerName:  t('Member Registration Fee'),
    width: 180,
  },
  {
    field: 'gtin_yearly_subscription_fee',
    headerName:  t('GTIN Yearly Subscription Fee'),
    width: 180,
  },
  {
    field: 'type',
    headerName: t('Type'), 
    width: 120,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === 1 ? 'green' : 'red',
          color: params.row.status === 1 ? 'green' : 'red',
        }}
      >
        {params.row.status === 1 ? 'Active' : 'Inactive'}
      </div>
    ),
  },
  {
    field: 'gcp_start_range',
    headerName: t('GCP Start Range'),
    width: 180,
  },
  {
    field: 'gcp_type',
    headerName:  t('GCP Type'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) =>
    {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }    
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) =>
    {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  
  
  
];

export const KpiReportColumn = (t, i18n) => [
  {
    field: 'transaction_id',
    headerName: t('Transaction ID'),
    width: 120,
  },
  {
    field: 'price',
    headerName:  t('Price'),
    width: 120,
  },
  {
    field: 'request_type',
    headerName:  t('Request Type'),
    width: 120,
  },
  // {
  //   field: 'status',
  //   headerName: 'Status',
  //   width: 120,
  // },
  {
    field: 'status',
    headerName:  t('Status'),
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor:
            params.row.status === 'active'
              ? 'green'
              : params.row.status === 'approved'
              ? 'skyblue'
              : 'red',
          color:
            params.row.status === 'active'
              ? 'green'
              : params.row.status === 'approved'
              ? 'black'
              : 'red',
        }}
      >
        {params.row.status}
      </div>
    ),
  },
  {
    field: 'username',
    headerName: t('Created By'),
    width: 180,
  },
  {
    field: 'email',
    headerName: t('Admin Email'),
    width: 180,
  },
  {
    field: 'companyID',
    headerName:  t('Company ID'),
    width: 180,
  },
  {
    field: 'company_name_eng',
    headerName: t('Company Name English'),
    width: 180,
  },
  {
    field: 'productName',
    headerName: t('Product Name'),
    width: 220,
  },
  {
    field: 'payment_type',
    headerName: t('Payment Type'),
    width: 120,
  },
  {
    field: 'created_at',
    headerName: t('Date Created'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) =>
    {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }    
  },
  // {
  //   field: 'updated_at',
  //   headerName: 'Updated At',
  //   width: 180,
  //   type: 'dateTime',
  //   valueGetter: (params) =>
  //   {
  //     // Convert the string date to a Date object
  //     return params.value ? new Date(params.value) : null;
  //   }
  // },
  // {
  //   field: 'expiry_date',
  //   headerName: 'Expiry Date',
  //   width: 180,
  //   type: 'dateTime',
  //   valueGetter: (params) =>
  //   {
  //     // Convert the string date to a Date object
  //     return params.value ? new Date(params.value) : null;
  //   }
  // },

  
  
  
];

export const AdminActivityReportColumn = (t, i18n) => [
  {
    field: 'subject',
    headerName: t('Subject'),
    width: 380,
  },
  {
    field: 'username',
    headerName:  t('Admin Name'),
    width: 180,
  },
  {
    field: 'email',
    headerName:  t('Email'),
    width: 180,
  },
  {
    field: 'admin_id',
    headerName: t('Admin ID'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) =>
    {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }    
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) =>
    {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },

  
  
];

export const additionalGtinColumn = (t, i18n) => [
  {
    field: 'total_no_of_barcodes',
    headerName: t('Total No Of Barcodes'),
    width: 180,
  },
  {
    field: 'price',
    headerName: t('Price'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName:  t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const additionalGlnColumn = (t, i18n) => [
  {
    field: 'total_no_of_gln',
    headerName: t('Total No Of GLN'),
    width: 180,
  },
  {
    field: 'price',
    headerName: t('Price'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
];

export const memberActivityReportColumn = (t, i18n) => [
  {
    field: 'subject',
    headerName: t('Subject'),
    width: 380,
  },
  {
    field: 'company_name_eng',
    headerName: t('Company Name English'),
    width: 180,
  },
  {
    field: 'company_name_arabic',
    headerName: t('Company Name Arabic'),
    width: 180,
  },
  {
    field: 'other_products',
    headerName: t('Other Products'), 
    width: 180,
  },
  {
    field: 'memberID',
    headerName: t('Member ID'),
    width: 180,
  },
  {
    field: 'email',
    headerName: t('Email'),
    width: 180,
  },
  {
    field: 'mobile',
    headerName: t('Mobile'),
    width: 180,
  },
  {
    field: 'companyID',
    headerName:  t('Company ID'),
    width: 180,
  },
  {
    field: 'contactPerson',
    headerName: t('Contact Person'),
    width: 180,
  },
  {
    field: 'status',
    headerName: t('Status'),
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
    field: 'transaction_id',
    headerName:  t('Transaction ID'),
    width: 180,
  },
  {
    field: 'membership_category',
    headerName: t('Membership Category'),
    width: 180,
  },
  {
    field: 'city',
    headerName: t('City'),
    width: 180,
  },
  {
    field: 'state',
    headerName: t('State'),
    width: 180,
  },
  {
    field: 'country',
    headerName: t('Country'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) =>
    {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }    
  },
  {
    field: 'updated_at',
    headerName:  t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) =>
    {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },

  
  
];




export const expiredMemberColumn = (t, i18n) => [
  // {
  //   field: 'activityID',
  //   headerName: t('Activity ID'),
  //   width: 180,
  // },
  {
    field: 'companyID',
    headerName: t('Company ID'),
    width: 180,
  },
  {
    field: 'company_name_eng',
    headerName: t('Company Name English'),
    width: 180,
  },
  {
    field: 'company_name_arabic',
    headerName: t('Company Name Arabic'),
    width: 180,
  },
  // {
  //   field: 'cr_documentID',
  //   headerName: t('CR Document ID'),
  //   width: 180,
  // },
  // {
  //   field: 'document_number',
  //   headerName: t('Document Number'),
  //   width: 180,
  // },
  {
    field: 'contactPerson',
    headerName: t('Contact Person'),
    width: 180,
  },
  {
    field: 'cr_activity',
    headerName: t('Cr Activity'),
    width: 180,
  },
  {
    field: 'email',
    headerName: t('Email'),
    width: 220,
  },
  {
    field: 'location_uk',
    headerName:  t('Location UK'),
    width: 180,
  },
  {
    field: 'member_category',
    headerName: t('Membership Category'),
    width: 180,
  },
  {
    field: 'membership_otherCategory',
    headerName:  t('Membership Other Category'),
    width: 180,
  },
  {
    field: 'gcpGLNID',
    headerName: t('GCP GLN ID'),
    width: 180,
  },
  {
    field: 'gln',
    headerName: 'GLN',
    width: 180,
  },
  {
    field: 'transaction_id',
    headerName: t('Transaction ID'),
    width: 180,
  },
  {
    field: 'membership_category',
    headerName: t('Membership Category'),
    width: 180,
  },
  {
    field: 'country',
    headerName: t('Country'),
    width: 180,
  },
  {
    field: 'qr_corde',
    headerName: t('QR Code'),
    width: 180,
  },
  {
    field: 'mobile',
    headerName: t('Mobile'),
    width: 180,
  },
  {
    field: 'slug',
    headerName: t('Slug'),
    width: 180,
  },
  {
    field: 'gcp_expiry',
    headerName: t('GCP Expiry'),
    width: 180,
    // type: 'dateTime',

    // valueGetter: (params) => {
    //   return params.value ? new Date(params.value) : null;
    // }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,

    // type: 'dateTime',
    // valueGetter: (params) => {
    //   // Convert the string date to a Date object
    //   return params.value ? new Date(params.value) : null;
    // }
  },
]




export const AdminRolesColumn = (t, i18n) => [
  {
    field: 'name',
    headerName:  t('Roles'),
    width: 280,
  },



]




export const AdminUsersColumn = (t, i18n) => [
  {
    field: 'username',
    headerName: t('Name'),
    width: 180,
  },
  {
    field: 'mobile',
    headerName: t('Phone'),
    width: 180,
  },
  {
    field: 'email',
    headerName:  t('Email'),
    width: 180,
  },
  {
    field: 'status',
    headerName:  t('Status'),
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === 1 ? 'green' : 'red',
          color: params.row.status === 1 ? 'green' : 'red',
        }}
      >
        {params.row.status === 1 ? 'Active' : 'Inactive'}
      </div>
    ),
  },



]



export const productsCategoriesColumn = (t, i18n) => [
  {
    field: 'name',
    headerName: t('Name English'),
    width: 180,
  },
   {
    field: 'name_ar',
    headerName: t('Name Arabic'),
    width: 180,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === 1 ? 'green' : 'red',
          color: params.row.status === 1 ? 'green' : 'red',
        }}
      >
        {params.row.status === 1 ? 'Active' : 'Inactive'}
      </div>
    ),
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) =>
    {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }    
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) =>
    {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  
  
  
];



export const staffAssignedTaskColumn = (t, i18n) => [
  {
    field: 'member_type',
    headerName: t('Member Type'),
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '4px 8px',
          borderRadius: '10px',
          border: '2px solid',
          background: params.row.member_type === 'old' ? 'green' : 'crimson',
          color: "white",
        }}
      >
        {params.row.member_type === 'old' ? 'Old' : 'New'}
      </div >
    ),
  },
  {
    field: 'pending_invoices',
    headerName: t('PENDING TO DO'),
    width: 180,
    renderCell: params => (
      <div
        style={{
          padding: '4px 8px',
          borderRadius: '10px',
          border: '2px solid',
          borderColor: params.row.status === 'none' ? 'green' : 'crimson',
          color: params.row.status === 'none' ? 'green' : 'crimson',
          display: params.row.pending_invoices === 'none' ? 'none' : 'block',
        }}
      >
        {params.row.pending_invoices === 'none' ? '' : params.row.pending_invoices === 'for_review' ? 'For Review' : 'Pending for Approval'}
      </div >
    ),
  },
  {
    field: 'assign_to_admin_username', // or any unique name you prefer
    headerName: t('Assigned To'),
    width: 180,
    renderCell: params => (
      <div
        style={{
          padding: '4px 8px',
          borderRadius: '10px',
          border: params.row.assign_to_admin ? '2px solid' : 'none',
          // background: '#D1FFBD', // customize as needed
          color: 'green',
        }}
      >
        {params.row.assign_to_admin ? params.row.assign_to_admin.username : ''}
      </div>
    ),
  },
  {
    field: 'company_name_eng',
    headerName: t('Company Name English'),
    width: 180,
  },
  {
    field: 'companyID',
    headerName:  t('Company ID'),
    width: 140,
  },
  // {
  //   field: 'memberID',
  //   headerName: t('Member ID'),
  //   width: 180,
  // },
  {
    field: 'mobile',
    headerName: t('Mobile'),
    width: 180,
  },
  {
    field: 'remarks',
    headerName: t('REMARKS'),
    width: 180,
  },
  {
    field: 'status',
    headerName: t('Status'),
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
    headerName: t('CODE'),
    width: 180,
  },
  // {
  //   field: 'password',
  //   headerName: 'PASSWORD',
  //   width: 180,
  // },
  {
    field: 'membership_category',
    headerName: t('MEMBER CATEGORY'),
    width: 180,
  },
  {
    field: 'email',
    headerName: t('Email'),
    width: 220,
  },


]



export const licenceRegistryColumn = (t, i18n) => [
  {
    field: 'gcpGLNID',
    headerName: t('Company Prefix'),
    width: 180,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          backgroundColor: 'red',
          borderColor: 'white',
          color: 'white',
        }}
      >
        {params.row.gcpGLNID}
      </div>
    ),
  },
  {
    field: 'gcp_type',
    headerName: t('GCP Type'),
    width: 180,
  },
  {
    field: 'company_name_eng',
    headerName:  t('Company Name'),
    width: 180,
  },
  {
    field: 'gln',
    headerName:  t('Licensee GLN'),
    width: 180,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          backgroundColor: 'red',
          borderColor: 'white',
          color: 'white',
        }}
      >
        {params.row.gln}
      </div>
    ),
  },
  {
    field: 'additional_number', 
    headerName: t('Key (PK)'),
    width: 180,
  },
  {
    field: 'status',
    headerName:  t('Status'),
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === 'active' ? 'green' : 'red',
          color: params.row.status === 'active' ? 'green' : 'red',
        }}
      >
        {params.row.status}
      </div>
    ),
  },
  
  
  
  
];




export const foreignGtinColumn = (t, i18n) => [
  {
    field: "BrandName",
    headerName:  t('Brand Name'),
    width: 180,
  },
  {
    field: "barcode",
    headerName:   t('Barcode'),
    renderCell: GTINCell,
    width: 150,
  },
  {
    field: "countrySale",
    headerName: t('Country Sale'),
    width: 180,
  },
  {
    field: "gpc",
    headerName: 'GPC',
    width: 180,
  },
  {
    field: "gpc_code",
    headerName:  t('GPC Code'),
    width: 180,
  },
  {
    field: "moName",
    headerName: t('MO Name'),
    width: 180,
  },
  {
    field: "productnameenglish",
    headerName: t('Product Name English'),
    width: 180,
  },
  {
    field: "size",
    headerName:   t('Size'),
    width: 180,
  },
  {
    field: "unit",
    headerName:  t('Unit'),
    width: 180,
  },
  {
    field: "created_at",
    headerName:   t('Created At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: "updated_at",
    headerName:  t('Updated At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  }, 



];
