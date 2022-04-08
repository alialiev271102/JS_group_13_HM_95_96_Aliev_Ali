import {Component, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {CocktailData} from "../../models/cocktail.model";
import {createCocktailRequest} from "../../store/cocktail.actions";

@Component({
  selector: 'app-new-cocktatails',
  templateUrl: './new-cocktatails.component.html',
  styleUrls: ['./new-cocktatails.component.sass']
})
export class NewCocktatailsComponent {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  profileForm!: FormGroup;

  constructor(
    private store: Store<AppState>
  ) {
    this.loading = store.select(state => state.cocktails.createLoading);
    this.error = store.select(state => state.cocktails.createError);
    this.profileForm = new FormGroup({});
    this.profileForm = new FormGroup({
      ingredients: new FormArray([]),
    });
  }

  addIng() {
    const ingredients = <FormArray>this.profileForm.get('ingredients');
    const ingredientGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('',Validators.required)
    })
    ingredients.push(ingredientGroup);
  }
  getIngControls() {
    const ing = <FormArray>this.profileForm.get('ingredients');
    return ing.controls;
  }

  fieldHasError(fieldName: string, errorType: string) {
    const field = this.profileForm.get(fieldName);
    return Boolean(
      field && field.touched && field.errors?.[errorType]
    );
  }



  onSubmit() {
    const cocktailData: CocktailData = this.form.value;
    this.store.dispatch(createCocktailRequest({cocktailData}));
  }
}
