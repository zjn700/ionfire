import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private toastConroller: ToastController){}

  async showToast() {
    const toast = await this.toastConroller.create({
      message: "Hello from Toast",
      duration: 2000
    });
    toast.present();
  }

}
