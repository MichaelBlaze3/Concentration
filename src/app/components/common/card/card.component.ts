import { Component, OnInit, Input } from '@angular/core';
import { CardsService } from '../../../services/cards/cards.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card;

  defaultPath:string = "";
  back:string = "../../../../assets/playing-cards-front/playing-card-back.png";

  constructor(
    private _cardsService: CardsService
  ) { 
    this.defaultPath = this.back
  }

  ngOnInit() { }

  _toggle() {
    console.log('[Toggle Method]');
    this.defaultPath = this.card.image;
    this._cardsService.compareCards(this.card);
  }

}
