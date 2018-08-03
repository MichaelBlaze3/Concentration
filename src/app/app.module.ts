import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

//Constants
import { Configuration } from './constants/configuration/configuration';

// Services
import { DeckService } from './services/deck/deck.service';

// Components
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { GametableComponent } from './components/gametable/gametable.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GametableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [Configuration, DeckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
