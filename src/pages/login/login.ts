import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(form) {
    this.testExist()
  }

  showAlert() {
    const alert = this.alert.create({
      title: 'Erreur',
      subTitle: 'Verifier vos parametres login !',
      buttons: ['OK']
    });
    alert.present();
  }

  testExist() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('select * from user WHERE user.password= (?) and user.email = (?) ',[[this.password],[this.email]]).then((res) => {
        if (res.rows.length !=0) {
          if (res.rows.item(0).email == this.email && res.rows.item(0).password == this.password) {
            localStorage.setItem('email', this.email);
            localStorage.setItem('nom', res.rows.item(0).nom);
            localStorage.setItem('prenom', res.rows.item(0).prenom);
            localStorage.setItem('id', res.rows.item(0).idc);
            this.navCtrl.push(HomePage);
            //console.log(this.email);
          }
        }
        else{
          this.showAlert();
        }
      })
        .catch((e) => {
          this.showAlert();
          console.log("this is an error", e);
        })
        .catch(e => console.log("it's about db object",e))
    })
  }

}
