import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { DbService } from './db.service';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { MsgService } from './msg.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private gplus: GooglePlus,
    private platform: Platform,
    private loadingController: LoadingController,
    private storage: Storage,
    private msgService: MsgService
  ) {
    // this.storage.set('tutorialComplete', false);
    // console.log("tutorial not complete")

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null)))
    );

    this.handleRedirect();
  }

  // used for authguard:
  uid() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.uid)
      )
      .toPromise();
  }

  async anonymousLogin() {
    // this.storage.set('tutorialComplete', false);

    const credential = await this.afAuth.auth.signInAnonymously();

    // temporary tutorial reset for anon login only

    return await this.updateUserData(credential.user);

  }

  private updateUserData({ uid, email, displayName, photoURL, isAnonymous }) {
    //   // Sets user data to firestore on login
    console.log('user', uid)
    this.msgService.showConsole('user ' + uid)
    const path = `users/${uid}`;

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      isAnonymous,
    };
    console.log("update user data", uid, displayName, photoURL, isAnonymous)
    // this.router.navigate(['todo'])
    return this.db.updateAt(path, data);
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
        console.log("cordova");
        this.msgService.showConsole('cordova)

        user = await this.nativeGoogleLogin();
        this.msgService.showConsole('user ' + user)

      } else {
        console.log('web')
        this.msgService.showConsole('web')

        await this.setRedirect(true);
        const provider = new auth.GoogleAuthProvider();
        user = await this.afAuth.auth.signInWithRedirect(provider);
        // user = await this.afAuth.auth.signInWithPopup(provider);

        // console.log("user", user)


        // .then( success => {console.log("nhhjkv"); this.router.navigate(['todo'])} );
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

    const result = await this.afAuth.auth.getRedirectResult()

    if (result.user) {
      console.log("result.user", result.user, result)
      await this.updateUserData(result.user);
      // await this.setRedirect(false);

      // this.router.navigate(['todo'])    
    }

    await loading.dismiss();

    await this.setRedirect(false);

    return result;
  }

  // '1085404550227-h1iabv9megngs4eleo7kd5khoo4fkn98.apps.googleusercontent.com',
  async nativeGoogleLogin(): Promise<any> {
    const gplusUser = await this.gplus.login({
      webClientId:
        // '460926881977-ofa5addddiuvq4om4a7o6o4fk0fsbh69.apps.googleusercontent.com',
        '139743657138-8c4fj0ee8ge4atrk03q6t5urtflfq7bd.apps.googleusercontent.com',
      // '139743657138-uh4s69teocit9idj0tfj4fq7am5tmjrl.apps.googleusercontent.com',
      offline: true,
      scopes: 'profile email'
    });
    // signInAndRetrieveDataWithCredential
    // return await this.afAuth.auth.signInWithCredential(
    return await this.afAuth.auth.signInAndRetrieveDataWithCredential(
      auth.GoogleAuthProvider.credential(gplusUser.idToken)
    );
  }
}