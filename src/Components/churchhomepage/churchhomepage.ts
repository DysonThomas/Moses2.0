import { Component } from '@angular/core';
import { Order } from '../order/order';
import { ChurchDash } from '../church-dash/church-dash';
import { Shared } from '../../services/shared';
import { Productmaster } from '../productmaster/productmaster';
import { Auth } from '../../services/auth';
import { Api } from '../../services/api';
``;
@Component({
  selector: 'app-churchhomepage',
  imports: [Order, ChurchDash, Productmaster],
  templateUrl: './churchhomepage.html',
  styleUrl: './churchhomepage.css',
})
export class Churchhomepage {
  currentAction: string = '';
  currentView: string = 'home';
  showOrderComponent: boolean = false;
  showhomeComponent: boolean = false;
  user_ID: string = '';
  token: string = '';
  church_ID: any = '';

  constructor(private shared: Shared, private authservice: Auth, private api: Api) {}
  ngOnInit() {
    this.shared.navbarAction$.subscribe((action) => {
      this.currentAction = action;
      this.handleNavbarAction(action);
      this.user_ID = this.authservice.getUserId();
      this.token = this.authservice.getToken();

      if (this.user_ID && this.token) {
        this.api.getChurchIdByUserId(this.token, this.user_ID).subscribe((churchId) => {
          console.log('Fetched Church ID:', churchId.church_id);
          this.church_ID = churchId.church_id;
        });
      }
    });
  }
  ngOnChanges() {}
  handleNavbarAction(action: string) {
    // You can perform any logic based on the action
    if (action === 'order') {
      this.currentView = 'order';
    }
    if (action === 'home') {
      this.currentView = 'home';
    }
    if (action === 'MP') {
      this.currentView = 'manageproduct';
    }
  }
}
