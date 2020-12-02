import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ProducttransactiontypeService } from '../../services/producttransactiontype.service';
import { LocationService } from '../../../shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';
import * as moment from 'moment';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from '../../../shop/shop.service';
import { ProducttypeService } from '../../services/producttype.service';

@Component({
  selector: 'product-update',
  templateUrl: './form.html'
})
export class ProductUpdateComponent implements OnInit {
  public product: any;
  public isSubmitted: any = false;
  public tree: any = [];
  public transactionType: any = [];
  public productType: any[] = [];
  public brands: any = [];
  public newSpecification: any = {
    key: '',
    value: ''
  };
  public imageUrl: string = '';
  public images: any = [];
  public mainImage: string = '';
  public tab = 'info';
  public freeShipAreas: any = [];
  public countries: any = [];
  public states: any = [];
  public cities: any = [];
  public zipCode: any = '';
  public freeCountry: any;
  public freeState: any;
  public freeCity: any;
  public dealDate: any;
  public imagesOptions: any = {
    multiple: true
  };
  public fileType: any = '';
  public fileOptions: any = {};

  public transactionTypeText: any = '';

  model: NgbDateStruct;
  today = this.calendar.getToday();
  placement = 'bottom';
  public fromDate: any;
  public toDate: any;

  constructor(private router: Router, private route: ActivatedRoute, private categoryService: ProductCategoryService,
    private productService: ProductService,
    private producttransactiontypeService: ProducttransactiontypeService,
    private toasty: ToastyService,
    private location: LocationService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private shopService: ShopService,
    private producttypeService: ProducttypeService) {
    if (route.snapshot.queryParams.tab) {
      this.tab = route.snapshot.queryParams.tab;
    }
  }

  ngOnInit() {
    this.fileOptions = {
      isDigital: true,
      url: window.appConfig.apiBaseUrl + '/media/files',
      onFinish: (resp) => {
        if (resp.data.mimeType.indexOf('zip') > -1) {
          this.fileType = 'zip';
        } else if (resp.data.mimeType.indexOf('rar') > -1) {
          this.fileType = 'rar';
        } else if (resp.data.mimeType.indexOf('pdf') > -1) {
          this.fileType = 'pdf';
        } else {
          this.fileType = 'file';
        }
        this.product.digitalFileId = resp.data._id;
        this.product.digitalFile = resp.data;
      }
    };
    const id = this.route.snapshot.paramMap.get('id');

    //This is for transaction type  
    this.producttransactiontypeService.findForDropdown()
      .then((resp) => {
        this.transactionType = resp.data;
      });

    this.producttypeService.findForDropdown()
    .then((resp) => {
      this.productType = resp.data;
    });

    this.productService.findOne(id)
      .then(resp => {
        this.product = resp.data;
        if (this.product.dailyDeal && this.product.dealTo) {
          const day = new Date(this.product.dealTo).getDate();
          const month = new Date(this.product.dealTo).getMonth() + 1;
          const year = new Date(this.product.dealTo).getFullYear();
          this.dealDate = {
            year: year,
            month: month,
            day: day
          };
        }
        this.freeShipAreas = resp.data.restrictFreeShipAreas;
        this.mainImage = resp.data.mainImage ? resp.data.mainImage._id : null;
        if (resp.data.digitalFile) {
          this.fileType = resp.data.digitalFile.type;
        }
        this.images = this.product.images;
        if (this.product.dealTo) {
          const date = new Date(this.product.dealTo);
          this.dealDate = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDay()
          };
        }

        //This is to set transcation set for hide and show
        this.transactionType.map((value) => {
          if (value._id == this.product.transactiontypeId) {
            console.log(value._id + ' - ' + this.product.transactiontypeId);
            this.transactionTypeText = value.name;
          }
        });

        if (this.product.startDate && this.product.startDate != null) {
          if(this.product.startDate !== '1970-01-01T00:00:00.000Z') {
            this.fromDate = { year: moment(this.product.startDate).year(), month: moment(this.product.startDate).month() + 1, day: moment(this.product.startDate).date() };
          }
        }

        if (this.product.endDate && this.product.endDate != null) {
          if(this.product.endDate !== '1970-01-01T00:00:00.000Z') {
            this.toDate = { year: moment(this.product.endDate).year(), month: moment(this.product.endDate).month() + 1, day: moment(this.product.endDate).date() };
          }
        }
      });
    this.categoryService.tree()
      .then(resp => (this.tree = this.categoryService.prettyPrint(resp.data)));
    this.location.countries().then((resp) => {
      this.countries = resp.data;
    });

    this.shopService.me().then(res => {
      console.log(res)
      if(res.data.zipcode) {
        this.product.zipcode = res.data.zipcode;
      } else {
        this.toasty.error('Please Enter address and zip code');
        this.router.navigate(['/shops/update']);
      }
    })
  }

  changeAlias() {
    this.product.alias = this.product.name.split(' ').join('-');
  }

  submit(frm) {
    this.isSubmitted = true;
    if (frm.$invalid) {
      this.toasty.error('Invalid form, please try again.');
    }

    if(this.transactionTypeText == 'Rent' || this.transactionTypeText == 'Share' ) {
      this.product.salePrice = this.product.price;
    }


    if (this.transactionTypeText == 'Rent') {
      if (this.product.price == '' || this.product.price < 0.1) {
        return this.toasty.error('Price is invalid.');
      }
      if (this.product.pricePerWeek == '' || this.product.pricePerWeek < 0.1) {
        return this.toasty.error('Price per week is invalid.');
      }
      if (this.product.pricePerMonth == '' || this.product.pricePerMonth < 0.1) {
        return this.toasty.error('Price per month is invalid.');
      }
    } else {
      if (this.product.salePrice > this.product.price || this.product.salePrice < 0.1 || this.product.price < 0.1) {
        return this.toasty.error('Price or sale price is invalid.');
      }
    }


    /*if (this.product.salePrice > this.product.price || this.product.salePrice < 0.1 || this.product.price < 0.1) {
      return this.toasty.error('Price or sale price is invalid.');
    }*/

    if (this.product.taxPercentage < 0) {
      return this.toasty.error('Tax value is invalid.');
    }

    if (this.fromDate && this.fromDate != null) {
      this.product.startDate = this.formatter.format(this.fromDate);
    } else {
      this.product.startDate = '';
    }


    if (this.toDate && this.toDate != null) {
      this.product.endDate = this.formatter.format(this.toDate);
    } else {
      this.product.endDate = '';
    }

    if (this.product.dailyDeal && this.dealDate) {
      this.product.dealTo = new Date(this.dealDate.year, this.dealDate.month, this.dealDate.day).toUTCString();
    }

    if (this.product.type === 'digital' && !this.product.digitalFileId) {
      return this.toasty.error('Please select Digital file path!');
    }

    this.product.restrictFreeShipAreas = [];
    this.freeShipAreas.forEach((item) => {
      const data = _.pick(item, ['areaType', 'value', 'name']);
      this.product.restrictFreeShipAreas.push(data);
    });
    this.product.images = this.images.map(i => i._id);
    this.product.mainImage = this.mainImage || null;

    this.productService.update(this.product._id, this.product).then(resp => {
      this.toasty.success('Updated successfully.');
      this.router.navigate(['/products/list']);
    })
      .catch(err => this.toasty.error(err.data.message || err.data.data.message || 'Something went wrong, please try again.'))
  }

  addSpecification() {
    if (!this.newSpecification.value.trim()) {
      return this.toasty.error('Please enter specification value');
    }
    this.product.specifications.push(this.newSpecification);
    this.newSpecification = { key: '', value: '' };
  }

  selectImage(media: any) {
    if (media.type !== 'photo') {
      return this.toasty.error('Please select image!');
    }

    this.images.push(media);
  }

  setMain(media: any) {
    this.mainImage = media._id;
  }

  // selectDigital(media: any) {
  //   this.product.digitalFileId = media._id;
  //   this.product.digitalFile = media;
  //   if (media.mimeType.indexOf('image') === 0) {
  //     this.fileType = 'image';
  //   } else if (media.mimeType.indexOf('audio') === 0) {
  //     this.fileType = 'audio';
  //   } else if (media.mimeType.indexOf('video') === 0) {
  //     this.fileType = 'video';
  //   } else {
  //     this.fileType = 'file';
  //   }
  // }

  removeImage(media: any, index: any) {
    if (media._id === this.mainImage) {
      this.mainImage = null;
    }
    this.images.splice(index, 1);
  }

  changeTab(tab: string) {
    this.tab = tab;
  }

  loadStates(COD: any) {
    this.location.states({ country: COD }).then((res) => {
      this.states = res.data;
    });
  }

  loadCities(id: any) {
    this.location.cities({ state: id }).then((res) => {
      this.cities = res.data;
    });
  }

  addFreeShipAreas() {
    if (this.zipCode) {
      let data = {
        areaType: 'zipcode',
        value: this.zipCode
      };
      this.freeShipAreas.push(data);
      this.zipCode = '';
    } else if (!this.zipCode && this.freeCountry && !this.freeState) {
      let data = {
        areaType: 'country',
        value: this.freeCountry.isoCode,
        name: this.freeCountry.name
      };
      this.freeShipAreas.push(data);
      this.freeCountry = {};
    } else if (!this.zipCode && this.freeCountry && this.freeState && !this.freeCity) {
      let data = {
        areaType: 'state',
        value: this.freeState._id,
        name: this.freeState.name
      };
      this.freeShipAreas.push(data);
      this.freeState = {};
    } else if (!this.zipCode && this.freeCountry && this.freeState && this.freeCity) {
      let data = {
        areaType: 'city',
        value: this.freeCity._id,
        name: this.freeCity.name
      };
      this.freeShipAreas.push(data);
      this.freeCity = {};
    }
  }

  removeArea(item: any, index: number) {
    this.freeShipAreas.splice(index, 1);
  }

  removeSpec(i: number) {
    this.product.specifications.splice(i, 1);
  }

  updateDealTime() {
    this.product.dealTo = new Date(this.dealDate.year, this.dealDate.month - 1, this.dealDate.day);
  }

  transactionTypeChange($event) {
    this.transactionTypeText = $event.target.options[$event.target.options.selectedIndex].text;
  }

  validateAvailableDate() {
    let startDate = this.formatter.format(this.fromDate);
    let endDate = this.formatter.format(this.toDate);
    if (startDate != '' && endDate != '') {
      if (startDate > endDate) {
        return this.toasty.error('To date is grater then from date');
      }
    }
  }


}
