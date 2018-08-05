import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CardsService } from '../../../services/cards/cards.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() card;
  defaultPath:string = "";
  back:string = "../../../../assets/playing-cards-front/playing-card-back.png";
  mySubscription: Subscription;

  constructor(
    private _cardsService: CardsService
  ) { 
    this.defaultPath = this.back;
    this.mySubscription = this._cardsService.currentMessageForNoMatch.subscribe(res => {
      console.log(res);
      this.defaultPath = this.back;
    })
  }

  ngOnInit() { }

  _toggle() {
    console.log('[Toggle Method]');
    this.defaultPath = this.card.image;
    this._cardsService.addToCompareList(this.card);
  }

  ngOnDestroy(){
    this.mySubscription.unsubscribe();
  }

}
