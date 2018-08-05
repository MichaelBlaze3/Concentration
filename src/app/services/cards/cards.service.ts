import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  cards: any[] = [];
  private messageSourceForMatch = new BehaviorSubject(this.cards);
  private messageSourceForNoMatch = new BehaviorSubject(false);
  private triggerStatus = new BehaviorSubject(false);

  currentMessageForMatch = this.messageSourceForMatch.asObservable();
  currentMessageForNoMatch = this.messageSourceForNoMatch.asObservable();
  currentTriggerStatus = this.triggerStatus.asObservable();

  constructor() { }

  addToCompareList(card: any) {
    if (this.cards.length < 2) {
      let alreadyAdded = false;
      for(let i = 0; i < this.cards.length; i++){
        if(card.code === this.cards[i].code){
          alreadyAdded = true;
        }
      }
      if(!alreadyAdded){
        this.cards.push(card);
      } 
      console.log("[List to Compare]");
      console.log(this.cards);
    }
    if (this.cards.length == 2) {
      this.changeTriggerStatus();
      this.compareCards();
    }
  }

  compareCards() {
    if (this.cards[0].value == this.cards[1].value) {
      setTimeout(() => {
        this.sendMatchedCards();
      }, 2000);
    }
    else {
      setTimeout(() => {
        this.sendFlipMessage();
      }, 2000);
    }
  }

  sendMatchedCards() {
    this.messageSourceForMatch.next(this.cards);
    this.cards = [];
  }

  sendFlipMessage() {
    this.messageSourceForNoMatch.next(false);
    this.cards = [];
  }

  changeTriggerStatus() {
    this.triggerStatus.next(true);
  }

}
