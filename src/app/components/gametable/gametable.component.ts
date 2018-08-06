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

  /**
   * 1. Validate that there is a deckID stored. If not redirect to new game.
   * 2. Make request to get all the card from the deck
   * 3. Store the cards in the deck array
   */

  // Local properties
  deck: any = [];
  deckID: string;
  deckResponse: any;
  coverStatus: boolean = false;
  didGameEnd: boolean = false;
  comparationArray: any = [];

  // Card Image variables
  path: string = '';
  back: string = "../../../../assets/playing-cards-front/playing-card-back.png";

  constructor(
    private _deckService: DeckService,
    private _router: Router,
    private _cardsService: CardsService
  ) { }

  ngOnInit() {
    // Getting DeckID
    this.deckID = this._deckService.getDeckID();
    console.log('DECK_ID:  ' + this.deckID);

    // Redirect if no id is found
    if (this.deckID === null) {
      console.log('Redirecting...');
      this._router.navigate(['new']);
    }

    //Setting card image to default
    this.path = this.back;

    // Calling method to get the 52 cards
    this.getDeck();
  }

  /**
   * @method getDeck
   * @description Makes a call to _deckService to obtain the cards object
   */
  getDeck() {

    if (this.deckID != null || this.deckID != undefined) {
      this._deckService.drawCards(this.deckID, 52).subscribe(
        res => {
          this.deckResponse = res;
          this.deck = this.deckResponse.cards;
          console.log(this.deck);
          if (this.deckResponse.error) {
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

  _toggle(card: any) {
    card.active = true;
    // comparation array only accepts two element, no repeated elements allowed.
    if (this.comparationArray.length < 2) {
      let isCardAlreadyAdded = false;
      for (let i = 0; i < this.comparationArray.length; i++) {
        if (card.code === this.comparationArray[i].code) {
          isCardAlreadyAdded = true;
        }
      }
      if (!isCardAlreadyAdded) {
        this.comparationArray.push(card);
      }
    }

    if (this.comparationArray.length == 2) {
      this.coverStatus = true;
      let result = this._cardsService.compareCards(this.comparationArray);
      console.log('Are these two cards the same? ' + result);
      if (result) {
        // call method to remove items
        setTimeout(() => {
          this.removeMatchItems();
        }, 2000);
      }
      else {
        // call method to reset image default
        setTimeout(() => {
          this.resetToDefaultCardImage();
        }, 2000);
      }
    }
  }

  /**
   * 
   */
  removeMatchItems() {
    for (let cardToBeRemove = 0; cardToBeRemove < this.comparationArray.length; cardToBeRemove++) {
      for (let i = 0; i < this.deck.length; i++) {
        if (this.comparationArray[cardToBeRemove].code === this.deck[i].code) {
          console.log('Matched found');
          this.deck.splice(i, 1);
        }
      }
    }
    this.comparationArray = [];
    /** 
     * We verify if there are any remaining cards on deck, otherwise show a message that player won
     **/
    if (this.deck.length == 0) {
      this.coverStatus = true;
      this.didGameEnd = true;
    }
    else {
      this.coverStatus = false;
    }
  }

  /**
   * Reset Section
   */
  resetToDefaultCardImage() {
    this.coverStatus = false;
    this.comparationArray[0].active = false;
    this.comparationArray[1].active = false;
    this.comparationArray = [];
  }

  ngOnDestroy() {
    console.log('Reseting Enviroment');
  }

}
