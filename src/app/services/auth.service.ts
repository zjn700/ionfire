import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { DbService } from './db.service';

import { Platform } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private platform: Platform,
    private loadingController: LoadingController,
    private storage: Storage
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      // switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null)))
    );

    this.handleRedirect();

  }

  async anonymousLogin() {
    const credential = await this.afAuth.auth.signInAnonymously();
    return await this.updateUserData(credential.user);
  }

  private updateUserData({ uid, email, displayName, photoURL, isAnonymous }) {
  //   // Sets user data to firestore on login
    console.log('user', uid)
    const path = `users/${uid}`;

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      isAnonymous,
    };
    console.log("update user data", uid, displayName, photoURL, isAnonymous)
    return
  //   return this.db.updateAt(path, data);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }


//// GOOGLE AUTH

  setRedirect(val) {
    this.storage.set('authRedirect', val);
  }

  async isRedirect() {
    return await this.storage.get('authRedirect');
  }

  async googleLogin() {
    try {
      let user;
      console.log('googleLogin')
      if (this.platform.is('cordova')) {
        console.log('cordova')
        user = await this.nativeGoogleLogin();
      } else {
        console.log('web')
        await this.setRedirect(true);
        const provider = new auth.GoogleAuthProvider();
        user = await this.afAuth.auth.signInWithRedirect(provider);
        console.log('user', user)
      }

      return await this.updateUserData(user);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle login with redirect for web Google auth
  private async handleRedirect() {
    if ((await this.isRedirect()) !== true) {
      return null;
    }
    const loading = await this.loadingController.create();
    await loading.present();

    const result = await this.afAuth.auth.getRedirectResult();

    if (result.user) {
      await this.updateUserData(result.user);
    }

    await loading.dismiss();

    await this.setRedirect(false);

    return result;
  }

}
