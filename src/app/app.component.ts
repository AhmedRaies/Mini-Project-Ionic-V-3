import { Component } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { HomePage } from '../pages/home/home';
import { ParamsPage } from '../pages/params/params';
import { ProfilePage } from '../pages/profile/profile';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tab1;
  tab2;
  tab3;
  rootPage: any = HomePage;
  db =new SQLiteObject(new SQLite())
  constructor(public app: App,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private sqlite: SQLite) {
    platform.ready().then(() => {
      this.tab1 = HomePage;
      this.tab2=ProfilePage;
      this.tab3=ParamsPage;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.createDataIfNotExist();
      statusBar.styleDefault();
      splashScreen.hide();
      setTimeout(() => {
        this.getData()
      }, 1000);
    });
  }

  data:any[]
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

  createDataIfNotExist() {
    this.sqlite.deleteDatabase({
      name: 'data.db',
      location: 'default'
    }).catch(e=>console.log(e)
    )
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("create table user(idc INTEGER PRIMARY KEY, nom VARCHAR(25), prenom VARCHAR(25),email VARCHAR(100), password VARCHAR(50))", {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

      db.executeSql("insert into user values (1,'Raies','Ahmed','ahmedraies594@gmail.com','azerty')", {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

        db.executeSql("insert into user values (2,'Raies','Hamza','hamzaraies594@gmail.com','azerty')", {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

      db.executeSql("create table annonce(id INTEGER PRIMARY KEY AUTOINCREMENT, titre VARCHAR(25),type VARCHAR(20) ,description VARCHAR(100),prix INTEGER, idc INTEGER,FOREIGN KEY(idc) REFERENCES user(idc))", {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

      db.executeSql("insert into annonce (titre,type,description,prix,idc) values ((?),(?),(?),20000,2)", [['Vente 407'],['Voiture'],['Voiture en bon etat']])
        .then(() => console.log('Executed insertion'))
        .catch(e => console.log(e));
        console.log("created");
      db.executeSql("insert into annonce (titre,type,description,prix,idc) values ((?),(?),(?),200,1)", [['S+2'],['Appartement'],['S+2 propre meuble pour etudiants a louer']])
        .then(() => console.log('Executed insertion'))
        .catch(e => console.log(e));
        this.db=db
    }).catch((error) => {
      console.log(error);

    })
  }

  goToProfile(){
    this.app.getActiveNav().push(ProfilePage)
  }

  goToHome(){
    this.app.getActiveNav().push(HomePage)
  }

  isLoggedIn(){
    if(localStorage.getItem('email')!=null){
      return true;
    }else{
      return false;
    }
  }


}

