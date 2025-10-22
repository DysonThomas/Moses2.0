import { Component, Input } from '@angular/core';
import { Api } from '../../services/api';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Spinner } from '../spinner/spinner';

@Component({
  selector: 'app-listview',
  imports: [FormsModule, Spinner],
  templateUrl: './listview.html',
  styleUrl: './listview.css',
})
export class Listview {
  products: any[] = [];
  loading: boolean = false;
  fromDate: string = '';
  toDate: string = '';
  orders: any[] = [];
  selectedType: number = 10001;
  showAllButton: boolean = false;
  regularItemsIds: any[] = [];
  @Input() church_ID!: string;
  constructor(public api: Api, public auth: Auth) {}
  ngOnInit() {
    this.api.getProducts().subscribe((res: any) => {
      this.products = res;
      const regularItems = this.products.filter((prod) => prod.isRegular);
      this.regularItemsIds = regularItems.map((item) => item.product_id);
    });
  }
  onChange(event: any) {
    this.orders = [];
    ``;
    console.log(event.target.value);
    this.selectedType = event.target.value;
    console.log('Selected Type:', this.selectedType);
    if (this.selectedType == 0) {
      this.showAllButton = true;
      console.log('Show All Button:', this.showAllButton);
    } else {
      this.showAllButton = false;
      console.log('Show All Button:', this.showAllButton);
    }
    ``;
  }
  showAllProducts() {
    if (this.fromDate === '' || this.toDate === '') {
      alert('Please select both From Date and To Date.');
      return;
    } else {
      this.api
        .getallOrder(this.auth.getToken(), this.church_ID, this.fromDate, this.toDate)
        .subscribe((res: any) => {
          this.orders = res;
          console.log('Fetched Orders:', this.orders);
        });
    }
  }
  showSpecific() {
    if (this.fromDate === '' || this.toDate === '') {
      alert('Please select both From Date and To Date.');
      return;
    } else {
      if (this.selectedType == 10001) {
        this.api
          .getspecificorder(
            this.auth.getToken(),
            this.church_ID,
            this.fromDate,
            this.toDate,
            this.regularItemsIds
          )
          .subscribe((res: any) => {
            this.orders = res;
            console.log(this.orders);
          });
      } else {
        this.api
          .getspecificorder(
            this.auth.getToken(),
            this.church_ID,
            this.fromDate,
            this.toDate,
            this.selectedType
          )
          .subscribe((res: any) => {
            this.orders = res;
            console.log(this.orders);
          });
      }
    }
  }
  exportToPDF() {
    this.loading = true;
    const data = document.getElementById('cards-container');
    if (!data) return;

    html2canvas(data, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 25;
      const title = 'Faithful Offerings for the Holy Qurbana';
      const subtitle = 'Powered by Moses'; // You can set your own text

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      pdf.text(title, 105, 15, { align: 'center' });

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.text(subtitle, 105, 22, { align: 'center' });

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      const pageCount = pdf.getNumberOfPages();
      const timestamp = new Date().toLocaleString();

      pdf.setFontSize(10);
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.text(`Generated on: ${timestamp}`, 10, 290);
        pdf.text(`Page ${i} of ${pageCount}`, 200 - 10, 290, { align: 'right' });
      }

      const fileTimestamp = new Date()
        .toISOString()
        .replace(/T/, '_')
        .replace(/:/g, '-')
        .replace(/\..+/, '');
      const fileName = `orders_${fileTimestamp}.pdf`;

      pdf.save(fileName);
    });
    this.loading = false;
  }
}
