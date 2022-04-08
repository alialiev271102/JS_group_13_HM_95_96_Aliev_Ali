import {IngredientModel} from "./ingredient.model";

export class Cocktail {
  constructor(
    public id: string,
    public creatorUserId: string,
    public title: string,
    public recipe: string,
    public isPublished: boolean,
    public ingredients: IngredientModel[],
    public image: string,
  ) {}
}

export interface CocktailData {
  [key: string]: any,
  creatorUserId: string,
  title: string,
  recipe: string,
  isPublished: boolean,
  ingredients: string,
  image: File | null,
}

export interface ApiCocktailData {
  _id: string,
  creatorUserId: string,
  title: string,
  recipe: string,
  isPublished: boolean,
  ingredients: IngredientModel[],
  image: string
}
