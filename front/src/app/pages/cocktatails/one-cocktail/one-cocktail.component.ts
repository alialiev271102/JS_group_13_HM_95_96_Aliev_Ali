import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Cocktail} from "../../../models/cocktail.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/types";
import {fetchCocktailRequest} from "../../../store/cocktail.actions";

@Component({
  selector: 'app-one-cocktail',
  templateUrl: './one-cocktail.component.html',
  styleUrls: ['./one-cocktail.component.sass']
})
export class OneCocktailComponent implements OnInit {

  cocktails: Observable<Cocktail[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  id!: string;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.cocktails = store.select(state => state.cocktails.cocktail);
    this.loading = store.select(state => state.cocktails.fetchLoading);
    this.error = store.select(state => state.cocktails.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.store.dispatch(fetchCocktailRequest());
  }


}
