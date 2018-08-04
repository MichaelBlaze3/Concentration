import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../../services/deck/deck.service';
import { DECK } from '../../../constants/deck.interface';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  temp: any;

  constructor(
    private _deckService: DeckService
  ) { }

  ngOnInit() {
  }

  // _newGame(): void {
  //   this._deckService.newShuffledDeck().subscribe(res => {
  //     console.log(res);
  //     this.temp = res;
  //     this._deckService.setDeck(this.temp);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

}
