import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck/deck.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gametable',
  templateUrl: './gametable.component.html',
  styleUrls: ['./gametable.component.scss']
})
export class GametableComponent implements OnInit {

  // Local properties
  deck: any;
  deckID: string;
  constructor(
    private _deck: DeckService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.deckID = this._deck.getDeckID();
    this.getDeck();
  }

  getDeck() {
    console.log("[Getting Deck]");
    if (this.deckID != null || this.deckID != undefined) {
      this._deck.drawCards(this.deckID, 52).subscribe(
        res => {
          this.deck = res;
          console.log(this.deck);
          if (this.deck.error) {
            this._router.navigate(['new']);
          }
          this.createPiles();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this._router.navigate(['new']);
    }
  }

  createPiles() {
    console.log("[Setting Deck Into Piles]");
    // console.log(this.deck.cards);
  }
  
}
