import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck/deck.service';
@Component({
  selector: 'app-gametable',
  templateUrl: './gametable.component.html',
  styleUrls: ['./gametable.component.scss']
})
export class GametableComponent implements OnInit {

  deck:any = []
  cards:any = []
  deckID:string;

  constructor(
    private _deck: DeckService
  ) { }

  ngOnInit() {
    this.getDeckID();
  }

  getDeckID(){
    this.deckID = this._deck.getDeckID();
    console.log(this.deckID);
    // if(this.deckID != null || this.deckID != undefined){
    //   for(let i =0; i < 3; i++){
    //     this.setNewTable(this.deckID);
    //   }
    // }
  }

  setNewTable(ID:string){
    this._deck.drawCards(ID, 13).subscribe(
      res => {
        console.log(res);
        this.cards = res;
        this.deck.push(this.cards.cards);
      },
      err => {
        console.log(err);
      }
    );
  }

}
