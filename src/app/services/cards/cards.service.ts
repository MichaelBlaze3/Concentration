import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  cards: any[] = [];
  constructor() { }

  compareCards(card: any) {
    console.log(card);
    if(this.cards.length < 2){
      this.cards.push(card);
    }

    console.log(this.cards);
  }

}
