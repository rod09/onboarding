import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { FirstRunPage } from '../pages/pages';

import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  template: `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  // first page to be run
  rootPage = FirstRunPage;
  // nav reference
  @ViewChild(Nav) nav: Nav;

  // inject translate and platform service
  constructor(translate: TranslateService, platform: Platform) {
    // Set the default language for translation strings, and the current language.
    translate.setDefaultLang('en');
    translate.use('en')

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
