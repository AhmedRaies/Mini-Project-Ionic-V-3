import { Component } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

  titre:string;
  description:string;
  prix:string;
  id:number;
  type:string

  constructor(    public viewCtrl: ViewController,
    public navCtrl: NavController, public params: NavParams, private sqlite:SQLite) {
    this.titre=params.get('titre')
    this.description=params.get('description')
    this.prix=params.get('prix')
    this.id=params.get('id')
    this.type=params.get('type')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
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
      db.executeSql('update annonce set titre=(?),type=(?),description=(?),prix=(?) where id = (?) ',[[this.titre],[this.type],[this.description],[this.prix],[this.id]]).then((res) => {
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
