import {CocktailState} from "./types";
import {createReducer, on} from "@ngrx/store";
import {
  createCocktailFailure,
  createCocktailRequest, createCocktailSuccess,
  fetchCocktailFailure,
  fetchCocktailRequest,
  fetchCocktailSuccess
} from "./cocktail.actions";

const initialState: CocktailState = {
  cocktail: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const cocktailsReducer = createReducer(
  initialState,
  on(fetchCocktailRequest, state => ({...state, fetchLoading: true})),
  on(fetchCocktailSuccess, (state, {cocktail}) => ({
    ...state,
    fetchLoading: false,
    cocktail
  })),
  on(fetchCocktailFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createCocktailRequest, state => ({...state, createLoading: true})),
  on(createCocktailSuccess, state => ({...state, createLoading: false})),
  on(createCocktailFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  }))
);
