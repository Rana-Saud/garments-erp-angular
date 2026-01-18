import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var JsBarcode: any;

export interface BarcodeLabel {
  poNumber: string;
  custReference: string;
  styleNo: string;
  material: string;
  color: string;
  size: string;
  barcodeValue: string;
}

@Component({
  selector: 'app-barcode-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barcode-label.html',
  styleUrl: './barcode-label.scss',
})
export class BarcodeLabelComponent implements AfterViewInit {
  @Input() labelData: BarcodeLabel | null = null;
  @ViewChild('barcodeCanvas') barcodeCanvas!: ElementRef<HTMLCanvasElement>;
  // @ViewChild('barcodeCanvas2') barcodeCanvas2!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    if (this.labelData && this.barcodeCanvas) {
      this.generateBarcode();
    }
  }

  generateBarcode() {
    if (!this.labelData) return;

    // Generate barcode for left side
    JsBarcode(this.barcodeCanvas.nativeElement, this.labelData.barcodeValue, {
      format: 'CODE128',
      width: 2,
      height: 50,
      displayValue: true,
      fontSize: 12,
      margin: 5,
    });

    // Generate barcode for right side
    // JsBarcode(this.barcodeCanvas2.nativeElement, this.labelData.barcodeValue, {
    //   format: 'CODE128',
    //   width: 2,a
    //   height: 50,
    //   displayValue: true,
    //   fontSize: 12,
    //   margin: 5,
    // });
  }

  print() {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow && this.barcodeCanvas) {
      const canvas = this.barcodeCanvas.nativeElement;
      const imageData = canvas.toDataURL('image/png');
      const styles = this.getStylesForPrint();
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${styles}</style>
        </head>
        <body>
          <div class="label-container">
            <div class="label">
              <div class="label-content">
                <div class="label-item"><label>PO Number:</label> <value>${this.labelData?.poNumber}</value></div>
                <div class="label-item"><label>Cust Reference:</label> <value>${this.labelData?.custReference}</value></div>
                <div class="label-item"><label>Style No:</label> <value>${this.labelData?.styleNo}</value></div>
                <div class="label-item"><label>Material:</label> <value>${this.labelData?.material}</value></div>
                <div class="label-item"><label>Color:</label> <value>${this.labelData?.color}</value></div>
                <div class="label-item"><label>Size:</label> <value>${this.labelData?.size}</value></div>
              </div>
              <div class="barcode-section">
                <img src="${imageData}" alt="barcode" />
              </div>
            </div>
          </div>
          <script>window.print();</script>
        </body>
        </html>
      `;
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    }
  }

  private getStylesForPrint(): string {
    return `
      * {
        margin: 0;
        padding: 0;
      }
      body {
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #f0f0f0;
        padding: 20px;
      }
      .label-container {
        display: flex;
        gap: 20px;
        background: white;
        padding: 20px;
      }
      .label {
        width: 320px;
        height: 420px;
        border: 2px solid #333;
        padding: 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: white;
      }
      .label-content {
        flex: 1;
      }
      .label-item {
        margin-bottom: 8px;
        font-size: 13px;
      }
      .label-item label {
        font-weight: bold;
        display: inline-block;
        width: 100px;
      }
      .label-item value {
        display: inline;
      }
      .barcode-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
      }
      canvas {
        max-width: 100%;
        height: auto;
      }
    `;
  }
}
