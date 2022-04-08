import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of, tap} from 'rxjs';
import {Router} from '@angular/router';
import {createCocktailFailure, createCocktailRequest, createCocktailSuccess} from "./cocktail.actions";
import {CocktailService} from "../services/cocktail.service";

@Injectable()
export class CocktailEffects {

  createProduct = createEffect(() => this.actions.pipe(
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
  ) {
  }
}
