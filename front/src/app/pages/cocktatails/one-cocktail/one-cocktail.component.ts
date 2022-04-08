import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Cocktail} from "../../../models/cocktail.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/types";
import {fetchCocktailRequest} from "../../../store/cocktail.actions";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-one-cocktail',
  templateUrl: './one-cocktail.component.html',
  styleUrls: ['./one-cocktail.component.sass']
})
export class OneCocktailComponent implements OnInit {

  cocktail!: Cocktail;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private http: HttpClient
  ) {
    this.loading = store.select(state => state.cocktails.fetchLoading);
    this.error = store.select(state => state.cocktails.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    const sss = this.http.get<Cocktail>(environment.apiUrl + '/cocktails/' + this.id);
    sss.subscribe(sss => {
      this.cocktail = sss;
    })

    this.store.dispatch(fetchCocktailRequest());
  }


}
