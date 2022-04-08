import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiCocktailData, Cocktail, CocktailData} from "../models/cocktail.model";
import {environment} from "../../environments/environment";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(private http: HttpClient) { }

  getCocktails() {
    return this.http.get<ApiCocktailData[]>(environment.apiUrl + '/cocktails').pipe(
      map(response => {
        return response.map(cocktailData => {
          return new Cocktail(
            cocktailData._id,
            cocktailData.creatorUserId,
            cocktailData.title,
            cocktailData.recipe,
            cocktailData.isPublished,
            cocktailData.ingredients,
            cocktailData.image,
          );
        });
      })
    );
  }

  createCocktail(cocktailData: CocktailData) {
    const formData = new FormData();
    Object.keys(cocktailData).forEach(key => {
      if (cocktailData[key] !== null) {
        formData.append(key, cocktailData[key]);
      }
    });
    return this.http.post(environment.apiUrl + '/cocktails', formData);
  }
}
