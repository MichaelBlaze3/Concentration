import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor() { }

  compareCards(cardsToCompare) {
    if (cardsToCompare[0].value == cardsToCompare[1].value) {
      return true;
    } 
    else {
      return false;
    }
  }

}
