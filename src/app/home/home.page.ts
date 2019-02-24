import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular'

import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private toastConroller: ToastController,
    private storage: Storage,
    private router: Router){}

  async showToast() {
    const toast = await this.toastConroller.create({
      message: "Hello from Toast",
      duration: 2000
    });
    toast.present();
  }

  resetTutorial() {
    this.storage.set('tutorialComplete', false);
    console.log("tutorial not complete");
    this.router.navigate(['tutorial']);

  }


}
