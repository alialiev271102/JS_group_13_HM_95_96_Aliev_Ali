import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {CocktatailsComponent} from "./pages/cocktatails/cocktatails.component";
import {NewCocktatailsComponent} from "./pages/new-cocktatails/new-cocktatails.component";
import {OneCocktailComponent} from "./pages/cocktatails/one-cocktail/one-cocktail.component";
import {MyCocktailsComponent} from "./pages/my-cocktails/my-cocktails.component";

const routes: Routes = [
  {path: '', component: CocktatailsComponent},
  {path: 'cocktail', component: CocktatailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cocktail/new', component: NewCocktatailsComponent},
  {path: 'cocktail/myCocktails', component: MyCocktailsComponent},
  {path: 'cocktail/:id', component: OneCocktailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
