import { createAction, props } from '@ngrx/store';
import {Cocktail, CocktailData} from "../models/cocktail.model";

export const fetchCocktailRequest = createAction('[Cocktails] Fetch Request');
export const fetchCocktailSuccess = createAction(
  '[Cocktails] Fetch Success',
  props<{cocktail: Cocktail[]}>()
);
export const fetchCocktailFailure = createAction(
  '[Cocktails] Fetch Failure',
  props<{error: string}>()
);

export const createCocktailRequest = createAction(
  '[Cocktails] Create Request',
  props<{cocktailData: CocktailData}>()
);
export const createCocktailSuccess = createAction(
  '[Cocktails] Create Success'
);
export const createCocktailFailure = createAction(
  '[Cocktails] Create Failure',
  props<{error: string}>()
);
