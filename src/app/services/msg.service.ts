import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(public toastController: ToastController) { }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  async showConsole(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 20000
    });
    toast.present();
  }

}
