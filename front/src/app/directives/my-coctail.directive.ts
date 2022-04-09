import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import {Cocktail} from "../models/cocktail.model";

@Directive({selector: '[appMyCocktail]'})
export class MyCoctailDirective implements OnInit, OnDestroy {
  user: Observable<null | User>;
  userSub!: Subscription;

  @Input("appMyCocktail") type!: Cocktail;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<AppState>,
  ) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit() {
    this.userSub = this.user.subscribe(user => {
      this.viewContainer.clear();

      if ((this.type.creatorUserId === user?._id)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
