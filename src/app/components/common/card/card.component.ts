import { Component, OnInit, Input } from '@angular/core';
import { CardsService } from '../../../services/cards/cards.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card;

  constructor(
    private _cardsService: CardsService
  ) { }

  ngOnInit() { }

  _toggle() {
    console.log(this.card);
  }

}
