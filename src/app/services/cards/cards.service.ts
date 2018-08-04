import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  cardsToCompare: number[] = [];
  constructor() { }

  compareCards(card: number) {
    // let count = this.cardsToCompare.length;
    // if (count < 2) {
    //   this.cardsToCompare.push(card)
    // } else if (count == 2) {

    // }
  }

}
