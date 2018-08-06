import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  event:any;
  activeURL:string;
  mySubscription: Subscription
  constructor(
    private _router: Router
  ) {
    this.mySubscription = this._router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.getActiveURL();       
      }
    });
  }

  ngOnInit() {}
  
  /**
   * @method getActiveURL
   * @description Obtains the currect active url
   */
  getActiveURL(){
    console.log(this._router.url);
    this.activeURL = this._router.url;
  }
  
  /**
   * @method _newGame
   * @description Navigates to a new route triggered by click event
   */
  _newGame(){
    this._router.navigate(['new']);
  }

  ngOnDestroy(){
    this.mySubscription.unsubscribe();
  }

}
