import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../../shared/services';
import { UtilService } from '../../../shared/services';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublishModalComponent } from '../publishModal/publish-modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'products',
  templateUrl: './listing.html'
})
export class ProductsComponent implements OnInit {

  public isLoading = false;
  public items = [];
  public page: any = 1;
  public take: any = 10;
  public total: any = 0;
  public searchText: any = '';
  public sortOption = {
    sortBy: 'createdAt',
    sortType: 'desc'
  };
  public accessToken: any = '';
  public importOptions: any = {};
  public showImport: any = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private toasty: ToastyService,
    private utilService: UtilService,
    private modalService: NgbModal

  ) {
    this.accessToken = this.authService.getAccessToken();
  }

  ngOnInit() {
    this.importOptions = {
      url: window.appConfig.apiBaseUrl + '/products/import/csv',
      fileFieldName: 'file',
      onFinish: (resp) => {
        if (resp.message === 'OK') {
          this.toasty.success('Your product list is being processed. Please come back in a while!');
          setTimeout(function () { window.location.reload(); }, 2000);
        } else {
          this.toasty.error(resp.message);
        }
      }
    };
    this.query();
  }

  query() {
    this.utilService.setLoading(true);
    this.isLoading = true;
    this.productService.search({
      page: this.page,
      take: this.take,
      q: this.searchText,
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`
    })
      .then(resp => {
        console.log(resp.data)
        this.items = resp.data.items;
        this.total = resp.data.count;
        this.searchText = '';
        this.utilService.setLoading(false);
        this.isLoading = false;
      })
      .catch(() => {
        this.toasty.error('Something went wrong, please try again!');
        this.utilService.setLoading(false);
        this.isLoading = false;
      });
  }

  publish(item, publish, index) {
    
    let data = {};
    
    if (publish) {
      const modalRef = this.modalService.open(PublishModalComponent, {
        backdrop: 'static',
        keyboard: false
      });

      modalRef.result.then(result => {
        data = {
          productId: item,
          publish: false,
          reasonForNotPublish: result
        }
        this.productService.publish(data).then((res) => {
        this.items[index].publish = false;

          this.toasty.success('Product is Publish')
        }).catch(err => {
          this.toasty.error('Something went wrong')
        })
      })

    } else {
      data = {
        publish: true,
        productId: item
      }

      this.productService.publish(data).then((res) => {
        this.items[index].publish = true;
        this.toasty.success('Product is Publish')
      }).catch(err => {
        this.toasty.error('Something went wrong')
      })
    }


    
  }

  remove(itemId: any, index: number) {
    if (window.confirm('Are you sure want to delete this item?')) {
      this.productService.remove(itemId)
        .then(() => {
          this.toasty.success('Item has been deleted!');
          this.items.splice(index, 1);
        })
        .catch((err) => this.toasty.error(err.data.message || 'Something went wrong, please try again!'));
    }
  }

  sortBy(field: string, type: string) {
    this.sortOption.sortBy = field;
    this.sortOption.sortType = type;
    this.query();
  }

  keyPress(event: any) {
    if (event.charCode === 13) {
      this.query();
    }
  }

  exportCSV() {
    const params = { access_token: this.accessToken };
    this.productService.export(params).then()
      .catch((err) => {
        const link = document.createElement('a');
        link.target = '_blank';
        link.download = 'file';
        link.href = err.url;
        link.click();
      });
  }

  openFile() {
    this.showImport = !this.showImport;
  }
}
