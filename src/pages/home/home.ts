import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ModalController, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ParamsPage } from '../params/params'
import { UpdatePage } from '../update/update';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data=[];

  constructor(public navCtrl: NavController,private modalCtrl:ModalController ,private sqlite:SQLite) {
    setTimeout(() => {
      this.getData()
    }, 1000);
  }
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToParams(){
    this.navCtrl.push(ParamsPage);
  }


  forUser(item){
    if(item == localStorage.getItem('email'))
      return true;
      else return false;
  }


  getData(){
    this.data=[]
    this.sqlite.create({
      name:'data.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('select id , titre ,type , description , prix , nom , prenom , email from annonce a, user u where a.idc=u.idc',[]).then((res)=>{
        console.log(res.rows.item(0));
        for (let index = 0; index < res.rows.length; index++) {
          this.data.push(res.rows.item(index));
        }
        
      }).catch(e=>console.log(e)
      )
    })
    .catch(e=>console.log(e))
  }

  toupdate(id,type,titre,description,prix){
    let modal = this.modalCtrl.create(UpdatePage,{id:id,type:type,titre:titre,description:description,prix});
    modal.onDidDismiss(data => {
      this.getData();
    });
    modal.present();
  }

  delete(id){
    this.sqlite.create({
      name:'data.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('delete from annonce where id= (?)',[[id]]).then((res)=>{
        this.getData()
      }).catch(e=>console.log(e)
      )
    })
   // })
    .catch(e=>console.log(e))
  }

  getItems(ev){
    // set val to the value of the searchbar
    
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      
        this.data = this.data.filter((item) => {
          return (item.type.toLowerCase().indexOf(val.toLowerCase()) > -1) || 
          ( item.description.toLowerCase().indexOf(val.toLowerCase()) > -1 ) || 
          ( item.titre.toLowerCase().indexOf(val.toLowerCase()) > -1 ) || 
          ( item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1 ) ||
          ( item.prenom.toLowerCase().indexOf(val.toLowerCase()) > -1 )||
          ( item.email.toLowerCase().indexOf(val.toLowerCase()) > -1 )
          ;
        })
    }else{
      this.getData()
    }
  }

}
