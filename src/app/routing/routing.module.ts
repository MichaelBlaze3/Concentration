import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { NewgameComponent } from '../components/newgame/newgame.component';
import { GametableComponent } from '../components/gametable/gametable.component';

const routes:Routes = [
  { path: 'new', component: NewgameComponent},
  { path: 'table', component: GametableComponent },
  { path: '', redirectTo: 'new', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule { }
