import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeckService } from '../../services/deck/deck.service';
import { Router } from '@angular/router';
import { CardsService } from '../../services/cards/cards.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gametable',
  templateUrl: './gametable.component.html',
  styleUrls: ['./gametable.component.scss']
})
export class GametableComponent implements OnInit, OnDestroy {

  // Local properties
  deck: any;
  deckID: string;
  mySubscription: Subscription;
  myTriggerSubscription: Subscription;
  coverStatus: boolean = false;

  constructor(
    private _deck: DeckService,
    private _router: Router,
    private _cardsService: CardsService
  ) {
    this.mySubscription = this._cardsService.currentMessageForMatch.subscribe(message => {
      this.removedMatchedCards(message);
    });

    this.myTriggerSubscription = this._cardsService.currentTriggerStatus.subscribe(status => {
      this.coverStatus = status;
      setTimeout(() => {
        this.coverStatus = false;
      }, 2500);
    });

  }

  ngOnInit() {
    this.deckID = this._deck.getDeckID();
    this.getDeck();
  }

  getDeck() {
    if (this.deckID != null || this.deckID != undefined) {
      this._deck.drawCards(this.deckID, 52).subscribe(
        res => {
          this.deck = res;
          this.deck = this.deck.cards;
          if (this.deck.error) {
            this._router.navigate(['new']);
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this._router.navigate(['new']);
    }
  }

  removedMatchedCards(cards) {
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < this.deck.length; j++) {
        if (cards[i].code === this.deck[j].code) {
          console.log(`[Matched found and removing at position ${j}]`);
          this.deck.splice(j, 1);
          console.log(this.deck);
        }
      }
    }
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }

}
