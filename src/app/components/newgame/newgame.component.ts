import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck/deck.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.component.html',
  styleUrls: ['./newgame.component.scss']
})
export class NewgameComponent implements OnInit {

  /**
   *  By clicking the new button The following takes place:
   *  1. We create a new deck
   *  2. We store the deckID on localStorage for other components to access to
   *  3. We shuffle the current deck
   *  4. If succesfull, change to the actual table route
   */

  // Local properties
  temp: any;

  constructor(
    private _deckService: DeckService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * @method _newDeck
   * @description Request a new deck by calling the _deckService triggered by a click event
   */
  _newDeck() {
    console.log('[Create New Deck]');
    this._deckService.newDeck().subscribe(
      res => {
        console.log(res);
        this.temp = res;
        this._deckService.setDeckID(this.temp);
        this.shuffleNewDeck();
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * @method shuffleNewDeck
   * @description We get the current deck and make a request to _deckService to shuffle the deck for us.
   */
  shuffleNewDeck() {
    console.log('[Shuffling New Deck]');
    let id = this._deckService.getDeckID();
    if (id != null) {
      this._deckService.shuffleDeck(id).subscribe(
        res => {
          console.log(res);
          this._router.navigate(['table']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
