import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ParamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-params',
  templateUrl: 'params.html',
})
export class ParamsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToLogin(){
    this.navCtrl.push(LoginPage)
  }

  disconnect(){
    localStorage.clear();
    this.navCtrl.push(HomePage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParamsPage');
  }

  isLoggedIn(){
    return localStorage.getItem('email')!=null;
  }

}
