import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  createCocktailFailure, createCocktailRequest, createCocktailSuccess,
  fetchCocktailFailure,
  fetchCocktailRequest,
  fetchCocktailSuccess
} from "./cocktail.actions";
import {CocktailService} from "../services/cocktail.service";

@Injectable()
export class CocktailEffects {
  fetchCocktails = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailRequest),
    mergeMap(() => this.cocktailService.getCocktails().pipe(
      map(cocktail => fetchCocktailSuccess({cocktail})),
      catchError(() => of(fetchCocktailFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createCocktail = createEffect(() => this.actions.pipe(
    ofType(createCocktailRequest),
    mergeMap(({cocktailData}) => this.cocktailService.createCocktail(cocktailData).pipe(
      map(() => createCocktailSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createCocktailFailure({error: 'Wrong data'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private cocktailService: CocktailService,
    private router: Router
  ) {}
}
