import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../constants/configuration/configuration';

import { DECK } from '../../constants/deck.interface';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(
    private _config: Configuration,
    private _http: HttpClient
  ) { }


  /**
   * @method newDeck
   * @description Creates a brand new deck
   */
  newDeck() {
    return this._http.get(this._config.url + "/new/");
  }

  /**
   * @method shuffleDeck
   * @description Shuffles a spacific deck
   * @param {String} deckID 
   */
  shuffleDeck(deckID: string) {
    return this._http.get(this._config.url + deckID + "/shuffle/");
  }

  /**
   * @method newShuffledDeck
   * @description Makes request to API for a brand new shuffled deck
   */
  newShuffledDeck() {
    return this._http.get(this._config.url + "/new/shuffle/?deck_count=1");
  }

  /**
   * @method drawCards 
   * @description Makes request to API to draw X amount of cards from deck
   * @param {String} deckID 
   * @param {Number} amountOfCards 
   */
  drawCards(deckID: string, amountOfCards: number) {
    return this._http.get(this._config.url + '/' + deckID + '/draw/?count=' + amountOfCards);
  }

  /**
   * @method setDeck
   * @description Stores the DECK information in localStorage for future access
   * @param {DECK} deck 
   */
  setDeckID(deck: DECK) {
    localStorage.setItem('deck_id', deck.deck_id);
  }

  /**
   * @method getDeckID
   * @description Returns the current deck ID 
   */
  getDeckID() {
    let id = localStorage.getItem("deck_id");
    if (id != null || id != undefined) {
      return id;
    } else {
      return null;
    }
  }

}
