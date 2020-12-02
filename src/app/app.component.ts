import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SystemService } from './shared/services';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Seller';

  constructor(private router: Router, private authService: AuthService,
    private translate: TranslateService, private systemService: SystemService) {

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        $('html, body').animate({ scrollTop: 0 });
      }
    });

    const defaultLang = 'en';
    // https://github.com/ngx-translate/core
    this.translate.setDefaultLang(defaultLang);
    this.systemService.configs().then(resp => {
      this.translate.setDefaultLang(resp.i18n.defaultLanguage);
      this.translate.use(resp.userLang);

      // change favicon
      $('#favicon').attr('href', resp.siteFavicon);
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedin()) {
      this.authService.getCurrentUser();
    }
  }
}
