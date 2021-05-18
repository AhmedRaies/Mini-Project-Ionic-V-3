import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HomePage } from '../home/home';


/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  annonceType:string;
  titre:string;
  description:string;
  prix:string;




  constructor(public file :File,
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public camera: Camera,
    public sqlite:SQLite) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    if( localStorage.getItem('email')==null){
      this.navCtrl.popTo(HomePage);
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  upload(form){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('insert into annonce (titre,type,description,prix,idc) values ((?),(?),(?),(?),(?)) ',[[this.titre],[this.annonceType],[this.description],[this.prix],[localStorage.getItem('id')]]).then((res) => {
            this.dismiss();
        console.log("Executed query !");
        
      })
        .catch((e) => {
          console.log("this is an error", e);
        })
        .catch(e => console.log("it's about db object",e))
    })
  }


}
