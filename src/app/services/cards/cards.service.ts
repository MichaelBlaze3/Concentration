import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {


  
  cards: any[] = [];
  private messageSourceForMatch = new BehaviorSubject(this.cards);
  private messageSourceForNoMatch = new BehaviorSubject(false);
  currentMessageForMatch = this.messageSourceForMatch.asObservable();
  currentMessageForNoMatch = this.messageSourceForNoMatch.asObservable();
  constructor() { }

  addToCompareList(card: any) {
    console.log(card);
    if(this.cards.length < 2){
      this.cards.push(card);
    }

    if(this.cards.length == 2){
      this.compareCards();
    }
  }

  compareCards(){
    console.log(this.cards);
    if(this.cards[0].value == this.cards[1].value){
      console.log("Same");
      this.sendMatchedCards();
    }
    else {
      console.log("Not the same");
      setTimeout(() => {
        this.sendFlipMessage();
      }, 2000);

    }
    this.cards = [];
  }

  sendMatchedCards(){
    this.messageSourceForMatch.next(this.cards);
  }

  sendFlipMessage(){
    this.messageSourceForNoMatch.next(false);
  }



}
