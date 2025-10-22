import { Component, Input } from '@angular/core';
import { Api } from '../../services/api';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { couldStartTrivia } from 'typescript';

@Component({
  selector: 'app-listview',
  imports: [FormsModule],
  templateUrl: './listview.html',
  styleUrl: './listview.css',
})
export class Listview {
  products: any[] = [];
  selectedType: number = 10001;
  showAllButton: boolean = true;
  @Input() church_ID!: string;
  constructor(public api: Api, public auth: Auth) {}
  ngOnInit() {
    this.api.getAllProducts().subscribe((res: any) => {
      this.products = res;
      console.log('Fetched Products:', this.products);
    });
  }
  onChange(event: any) {
    console.log(event.target.value);
    this.selectedType = event.target.value;
    console.log('Selected Type:', this.selectedType);
    if (this.selectedType == 10001) {
      this.showAllButton = true;
    }
    if (this.selectedType != 10001) {
      this.showAllButton = false;
    }
  }
}
