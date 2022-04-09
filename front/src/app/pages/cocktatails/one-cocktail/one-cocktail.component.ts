import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
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
export class OneCocktailComponent implements OnInit, OnDestroy {

  deleteSub!: Subscription;
  pubSub!: Subscription;
  cocktail!: Cocktail;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  id!: string;
  flag!: boolean
  flag2!: boolean

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private http: HttpClient,
    private router: Router
  ) {
    this.loading = store.select(state => state.cocktails.fetchLoading);
    this.error = store.select(state => state.cocktails.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.flag = false;
    this.flag2 = false;
    this.http.get<Cocktail>(environment.apiUrl + '/cocktails/' + this.id).subscribe(cocktail => {
      this.cocktail = cocktail;
    })

    this.store.dispatch(fetchCocktailRequest());
  }

  OnDelete() {
    this.flag = true;
    this.deleteSub = this.http.delete(environment.apiUrl + '/cocktails/' + this.id).subscribe();
    void this.router.navigate(['/cocktail']);
  }

  onPublish() {
    this.flag2 = true;
    this.pubSub = this.http.post(environment.apiUrl + '/cocktails/update', this.cocktail).subscribe();
    void this.router.navigate(['/cocktail']);
  }

  ngOnDestroy() {
    if (this.flag)this.deleteSub.unsubscribe();
    if (this.flag2)this.pubSub.unsubscribe();
  }


}
