import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../services/package.service';
import { UtilService } from '../../../shared/services';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService } from 'ng2-toasty';
import { PaymentComponent } from '../payment/payment.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'packages-upgrade',
  templateUrl: './upgrade.html'
})
export class PaymentUpgradeComponent implements OnInit {

  public isLoading = false;
  public packages = [];
  public page: Number = 1;
  public take: Number = 10;
  public total: Number = 0;
  public searchText: any = '';
  public sortOption: any = {
    sortBy: 'ordering',
    sortType: 'desc'
  };

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private packageService: PackageService,
    private toasty: ToastyService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.query();
  }

  query() {
    this.utilService.setLoading(true);
    this.isLoading = true;
    let params = {
      page: this.page,
      take: this.take,
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`,
      q: this.searchText
    };

    this.packageService.search(params).then(resp => {
      this.packages = resp.data.items;
      this.total = resp.data.count;
      this.utilService.setLoading(false);
      this.isLoading = false;
    }).catch(() => {
      this.toasty.error('Something went wrong, please try again!');
      this.utilService.setLoading(false);
      this.isLoading = false;
    });
  }

  keyPress(event: any) {
    if (event.charCode === 13) {
      this.query();
    }
  }

  sortBy(field: string, type: string) {
    this.sortOption.sortBy = field;
    this.sortOption.sortType = type;
    this.query();
  }

  payment(item) {
    if (item.status === 'refunded') {
      return this.toasty.error('This order has been refunded.');
    }
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const modalRef = this.modalService.open(PaymentComponent, ngbModalOptions);
    modalRef.componentInstance.packageID = item._id;
    modalRef.componentInstance.packageName = item.name;
    modalRef.componentInstance.packagePrice = item.price;
    modalRef.componentInstance.packageDuration = item.numDays;
  }
}
