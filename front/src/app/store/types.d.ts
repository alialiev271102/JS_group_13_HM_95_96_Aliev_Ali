import { LoginError, RegisterError, User } from '../models/user.model';
import {Cocktail} from "../models/cocktail.model";


export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type CocktailState = {
  cocktails: Cocktail[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type AppState = {
  users: UsersState,
  cocktails: CocktailState,
}
