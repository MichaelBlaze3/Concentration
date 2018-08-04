import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';

//Constants
import { Configuration } from './constants/configuration/configuration';

// Services
import { DeckService } from './services/deck/deck.service';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { GametableComponent } from './components/gametable/gametable.component';
import { CardComponent } from './components/common/card/card.component';
import { NewgameComponent } from './components/newgame/newgame.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GametableComponent,
    CardComponent,
    NewgameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [Configuration, DeckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
