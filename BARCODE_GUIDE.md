# Garment ERP - Barcode Label System Guide

## Overview
The barcode label system allows you to generate and print professional garment labels with barcodes for inventory tracking and production management.

## Features
✅ Generate barcodes automatically for each CPO item
✅ Print professional labels with product details
✅ Customize barcode format (CODE128)
✅ Mobile-responsive printing
✅ Batch label printing support

## How to Use

### 1. Print Barcode from CPO List
1. Go to **CPO List** page
2. Find the item you want to print a barcode for
3. Click the **Barcode icon** (📊) button in the Actions column
4. A modal window will open showing the garment label preview

### 2. Label Information Displayed
Each label shows:
- **Customer/PO#**: Purchase order number (left label) and MB number (right label)
- **Cust.Reference**: Customer reference or company name
- **Style/Model No.**: Style number of the garment
- **Material**: Material type (leather, cotton, etc.)
- **Color**: Color of the garment
- **Size**: Size designation (XS, S, M, L, XL, etc.)
- **Barcode**: CODE128 barcode with scannable value

### 3. Print the Label
1. In the modal, click **"Print Label"** button
2. Your browser's print dialog will appear
3. Select your printer (label printer recommended)
4. Choose printing options:
   - Paper size: 4"×6" for standard garment labels
   - Margins: Minimal
   - Scale: 100%
5. Click **Print**

## Label Layout
The system generates **dual labels** (two labels per sheet):
- **Left Label**: Detailed format with labels and values
- **Right Label**: Value-only format for quick reference

This allows efficient printing and labeling of garment batches.

## Barcode Information
- **Format**: CODE128 (standard barcode format)
- **Value**: Uses CPO number for unique identification
- **Scannable**: Compatible with all standard barcode scanners
- **Display**: Includes human-readable numbers below barcode

## Adding Material Information
To enhance labels with material details:

1. Update your CPO model to include `material` field
2. Modify `cpo-list.ts` - update the `printBarcode()` method:
   ```typescript
   material: cpo.material || 'Cotton Blend'
   ```
3. Add material field to CPO form

## Terminal Scanning Setup
Once labels are printed and attached to items:

1. Use any standard barcode scanner connected to your computer
2. When scanning, the barcode value (CPO number) is captured
3. You can implement scanning functionality to:
   - Track item movement through production
   - Update item status
   - Log time stamps
   - Link to quality checks

## Future Enhancements
Planned features:
- QR code support
- Batch label generation
- Scheduled label printing
- Scanner input integration
- Inventory tracking dashboard
- Production workflow automation

## Technical Stack
- **Library**: JSBarcode (CODE128 format generation)
- **Framework**: Angular 20.3
- **Styling**: SCSS with theme variables
- **Print**: Browser native print functionality

## Troubleshooting

### Barcode not displaying
- Clear browser cache
- Ensure JSBarcode CDN is accessible
- Check browser console for errors

### Labels look misaligned when printed
- Check printer margins settings
- Use print preview before printing
- Ensure paper size is correct (4"×6")

### Can't print multiple labels at once
- Use browser print dialog to print multiple copies
- Or manually loop through items and print individually

## API Integration
Currently using mock data. To connect to backend:

1. Replace `loadCpoData()` in `cpo-list.ts` with API call
2. Update barcode value to use actual item ID
3. Add material field to API response
4. Implement batch printing endpoint if needed

## Support
For issues or feature requests, contact development team.
