import {Component, OnInit} from '@angular/core';
import {Cocktail} from "../../models/cocktail.model";
import {Observable} from "rxjs";
import {fetchCocktailRequest} from "../../store/cocktail.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";

@Component({
  selector: 'app-cocktatails',
  templateUrl: './cocktatails.component.html',
  styleUrls: ['./cocktatails.component.sass']
})
export class CocktatailsComponent implements OnInit {

  cocktails: Observable<Cocktail[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.cocktails = store.select(state => state.cocktails.cocktail);
    this.loading = store.select(state => state.cocktails.fetchLoading);
    this.error = store.select(state => state.cocktails.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCocktailRequest());
    this.cocktails.subscribe(user => {
      console.log(user);
    })
  }
}
