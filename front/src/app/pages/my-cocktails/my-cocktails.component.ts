import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Cocktail} from "../../models/cocktail.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {fetchCocktailRequest} from "../../store/cocktail.actions";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-my-cocktails',
  templateUrl: './my-cocktails.component.html',
  styleUrls: ['./my-cocktails.component.sass']
})
export class MyCocktailsComponent implements OnInit {

  cocktails: Observable<Cocktail[]>;
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>,private http: HttpClient) {
    this.cocktails = store.select(state => state.cocktails.cocktail)
    this.loading = store.select(state => state.cocktails.fetchLoading);
    this.error = store.select(state => state.cocktails.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCocktailRequest());
  }
}
