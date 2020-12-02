import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../services';
import { UtilService } from '../../shared/services';

declare var $: any;
@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'
  
})
export class SidebarComponent implements OnInit {
    public currentUser: any;
    showMenu: string = '';
    showSubMenu: string = '';
    public sidebarnavItems: any[];
    //this is for the open close
    addExpandClass(element: any) {
      if (element === this.showMenu) {
        this.showMenu = '0';
      } else {
        this.showMenu = element; 
      }
    }
    addActiveClass(element: any) {
      if (element === this.showSubMenu) {
        this.showSubMenu = '0';
      } else {
        this.showSubMenu = element; 
      }
    }
    
    constructor(private modalService: NgbModal, private router: Router,
      private route: ActivatedRoute, 
      private authService: AuthService,
      private util: UtilService
      ) {
    } 
    // End open close
    ngOnInit() {
      this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
      $(function () {
        $(".sidebartoggler").on('click', function() {
          if ($("#main-wrapper").hasClass("mini-sidebar")) {
            $("body").trigger("resize");
            $("#main-wrapper").removeClass("mini-sidebar");
               
          } else {
            $("body").trigger("resize");
            $("#main-wrapper").addClass("mini-sidebar");
          }
        });
      });
    }
    
    logout() {
      this.authService.removeToken();
      this.router.navigate(['/auth/login']);
    }

    Backtoweb(type:any)
    {
      if (this.authService.isLoggedin()) {
        this.authService.getCurrentUser().then(resp => {
          this.currentUser = resp

          const token = this.authService.generateAutoLoginToken(this.currentUser._id, 'user').then((resp) => {
            if(resp.data.message == 'TOKEN_GENERATED'){
              if(resp.data.data)
              {
                let loginToken = resp.data.data.autoLoginToken;
                window.location.href = `${window.appConfig.webUrl}/auth/autologin/${loginToken}`;
              }
            }
          }).catch(() => {
            this.util.setLoading(false);
          });
        });
      } else {
        this.router.navigate(['/auth/login']);
      }
  }
}
