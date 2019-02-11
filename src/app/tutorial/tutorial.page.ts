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

  constructor(private storage: Storage, private router: Router) {}

  @ViewChild(IonSlides)
  slides: IonSlides;

  async finish() {
      await this.storage.set('tutorialComplete', true);
      this.router.navigateByUrl('/');
  }

  next() {
    this.slides.slideNext();
  }

  ngOnInit() {
  }

}
