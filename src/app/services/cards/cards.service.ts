import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor() { }

  /**
   * @method compareCards
   * @description Receives an array that contains 2 cards. It finds out if the card's value are the same.  
   * @param { Array } cardsToCompare 
   */
  compareCards(cardsToCompare):Boolean {
    if (cardsToCompare[0].value == cardsToCompare[1].value) {
      return true;
    } 
    else {
      return false;
    }
  }

}
