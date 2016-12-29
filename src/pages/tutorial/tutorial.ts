import { Component } from '@angular/core';

import { MenuController, NavController, ToastController, LoadingController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate/ng2-translate';

// Slide interface model
export interface Slide {
  title: string;
  description: string;
  image: string;
};

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  // Slide array
  slides: Slide[];
  // not end of slide flag
  showSkip = true;

  // injects nav, menu, translate, toast and loading service
  constructor(public navCtrl: NavController,
    public menu: MenuController,
    translate: TranslateService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    // get the translations to the slide
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION"])
      .subscribe((values) => {
        // after it's completed, add the value to the slide array
        console.log('Loaded values', values);
        this.slides = [
          {
            title: values.TUTORIAL_SLIDE1_TITLE,
            description: values.TUTORIAL_SLIDE1_DESCRIPTION,
            image: 'assets/img/rocket-1.jpg',
          },
          {
            title: values.TUTORIAL_SLIDE2_TITLE,
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/img/rocket-2.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/rocket-3.png',
          }
        ];
      });
  }
  // show message when 'get started' is hit
  showMessage() {
    // create the loader object
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    // show it
    loader.present();
    // when it finishes loading, shows the toast
    loader.onDidDismiss(() => {
      // create the toast
      let toast = this.toastCtrl.create({
        message: 'Ok, let\'s get started!',
        duration: 2000,
        position: 'bottom'
      });
      // show it
      toast.present(toast);
    });

  }
  // when slide changes, it catches the slide event
  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }
  // when the view is ready
  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
