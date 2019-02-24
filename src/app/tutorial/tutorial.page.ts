import { Component, ViewChild, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('resetting slider to zero', this.resetIndex());

  }
  @ViewChild(IonSlides)
  slides: IonSlides;

  async resetIndex() {
    // console.log('in reset')
    return await this.slides.slideTo(0)

  }

  async finish() {
      await this.storage.set('tutorialComplete', true);
      this.router.navigateByUrl('/home');
      console.log("tutorialComplete")
  }

  next() {
    this.slides.slideNext();
  }

}
