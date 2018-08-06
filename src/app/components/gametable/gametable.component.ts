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
  deck: any = [];  // Contains all the cards obtained by the deck api
  deckID: string; // Contains the id of the current deck 
  deckResponse: any; // Temporary stores the response from the service
  coverStatus: boolean = false; // Contains the status of the div element status
  didGameEnd: boolean = false; // Let us know if the game finished
  comparationArray: any = []; // Stores the 2 cards that we want to compare

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

  /**
   * @method _toggle
   * @description Called by click event providing the card that player wants to compare
   * @param card 
   */
  _toggle(card: any) {
    // comparation array only accepts two element, no repeated elements allowed.
    if (this.comparationArray.length < 2) {
      card.active = true;
      let isCardAlreadyAdded = false;
      for (let i = 0; i < this.comparationArray.length; i++) {
        if (card.code === this.comparationArray[i].code) {
          isCardAlreadyAdded = true;
        }
      }
      if (!isCardAlreadyAdded) {
        this.comparationArray.push(card);
        console.log(this.comparationArray);
      }
    }

    if (this.comparationArray.length == 2) {
      // this.coverStatus = true;
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
   * @method removeMatchItems
   * @description Removes the cards that do match
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
   * @method resetToDefaultCardImage
   * @description Reset Section
   */
  resetToDefaultCardImage() {
    this.coverStatus = false;
    for(let i=0; i< this.comparationArray.length; i++){
      this.comparationArray[i].active = false;
    }
    this.comparationArray = [];
  }

  ngOnDestroy() {
    console.log('Reseting Enviroment');
  }

}
