import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ProducttransactiontypeService } from '../../services/producttransactiontype.service';
import { AuthService, LocationService } from '../../../shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';
import {NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from '../../../shop/shop.service';
import { ProducttypeService } from '../../services/producttype.service';

@Component({
  selector: 'product-create',
  templateUrl: './form.html'
})
export class ProductCreateComponent implements OnInit {
  public product: any = {
    name: '',
    description: '',
    specifications: [],
    mainImage: null,
    metaSeo: {
      keywords: '',
      description: ''
    },
    type: 'physical',
    categoryId: '',
    isActive: true,
    freeShip: false,
    featured: false,
    hot: false,
    bestSell: false,
    stockQuantity: 0,
    producttypeId: '',
    price: 0,
    salePrice: 0,
    productType: '',
    zipcode: '',
    vat: 0,
    restrictFreeShipAreas: [],
    restrictCODAreas: [],
    notification: true
  };
  public isSubmitted: any = false;
  public tree: any = [];
  public transactionType: any = [];
  public productType: any[] = [];
  public countries: any = [];
  public states: any = [];
  public cities: any = [];
  public zipCode: any = '';
  public freeCountry: any;
  public freeState: any;
  public freeCity: any;
  public newSpecification: any = {
    key: '',
    value: ''
  };
  public imageUrl: string = '';
  public images: any = [];
  public mainImage: string = '';
  public tab = 'info';
  public freeShipAreas: any = [];
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

  constructor(private router: Router, private categoryService: ProductCategoryService,
    private productService: ProductService, 
    private producttransactiontypeService: ProducttransactiontypeService,
    private toasty: ToastyService, 
    private location: LocationService,
    private calendar: NgbCalendar, 
    private formatter: NgbDateParserFormatter,
    private authService: AuthService,
    private shopService :ShopService,
    private producttypeService: ProducttypeService
    ) {

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
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
    this.location.countries().then((resp) => {
      this.countries = resp.data;
    });

    this.categoryService.tree()
      .then(resp => (this.tree = this.categoryService.prettyPrint(resp.data)
    ));


    
    //This is for transaction type  
    this.producttransactiontypeService.findForDropdown()
    .then((resp) => {
        this.transactionType = resp.data;
        this.shopService.me().then(res => {
          this.addInProducts(res.data);
          this.showSelectedTransactionType(res.data);
        })
    });

    this.producttypeService.findForDropdown()
    .then((resp) => {
        this.productType = resp.data;
    });

  }

  addInProducts(product) {
    if(product.zipcode) {
      this.product.zipcode = product.zipcode;
    } else {
      this.toasty.error('Please Enter address and zip code');
      this.router.navigate(['/shops/update']);
    }
  }

  showSelectedTransactionType(product) {
    let transactiontypeId = this.transactionType.filter(type =>  type.name === product.shopType)[0];

    if(transactiontypeId) {
      this.product.transactiontypeId = transactiontypeId._id;
    }
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (frm.invalid) {
      return this.toasty.error('Form is invalid, please try again.');
    }

    if(this.transactionType == 'Rent' || this.transactionType == 'Share' ) {
      this.product.salePrice = this.product.price;
    }


    if (this.product.salePrice > this.product.price || this.product.salePrice <= 0 || this.product.price <= 0) {
      return this.toasty.error('Price or sale price is invalid.');
    }

    if(this.fromDate && this.fromDate != 'null'){
      this.product.startDate = this.formatter.format(this.fromDate);
    } else {
      this.product.startDate = '';
    }

    
    if(this.toDate && this.toDate != 'null'){
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



    this.freeShipAreas.forEach((item) => {
      const data = _.pick(item, ['areaType', 'value', 'name']);
      this.product.restrictFreeShipAreas.push(data);
    });
    this.product.images = this.images.map(i => i._id);
    this.product.mainImage = this.mainImage || null;


    this.productService.create(this.product)
      .then(() => {
        this.toasty.success('Product has been created');
        this.router.navigate(['/products/list']);
      }, err => this.toasty.error(err.data.message || 'Something went wrong!'));
  }

  changeAlias() {
    this.product.alias = this.product.name.split(' ').join('-');;
  }

  addSpecification() {
    if (!this.newSpecification.value.trim()) {
      return this.toasty.error('Please enter specification value');
    }
    this.product.specifications.push(this.newSpecification);
    this.newSpecification = { key: '', value: '' };
  }

  selectImage(media: any) {
    // this.product.mainImage = media._id;
    // this.imageUrl = media.fileUrl;
    if (media.type !== 'photo') {
      return this.toasty.error('Please select image!');
    }

    this.images.push(media);
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

  setMain(media: any) {
    this.mainImage = media._id;
  }

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
      const data = {
        areaType: 'zipcode',
        value: this.zipCode
      };
      this.freeShipAreas.push(data);
      this.zipCode = '';
    } else if (!this.zipCode && this.freeCountry && !this.freeState) {
      const data = {
        areaType: 'country',
        value: this.freeCountry.isoCode,
        name: this.freeCountry.name
      };
      this.freeShipAreas.push(data);
      this.freeCountry = {};
    } else if (!this.zipCode && this.freeCountry && this.freeState && !this.freeCity) {
      const data = {
        areaType: 'state',
        value: this.freeState._id,
        name: this.freeState.name
      };
      this.freeShipAreas.push(data);
      this.freeState = {};
    } else if (!this.zipCode && this.freeCountry && this.freeState && this.freeCity) {
      const data = {
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

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  transactionTypeChange($event){
    this.transactionTypeText = $event.target.options[$event.target.options.selectedIndex].text;
  }

  validateAvailableDate(){
    let startDate = this.formatter.format(this.fromDate);
    let endDate = this.formatter.format(this.toDate);
    if(startDate!='' && endDate !='')
    {
      if(startDate > endDate){
        return this.toasty.error('To date is grater then from date');
      }
    }
  }

  /*isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }*/
}
