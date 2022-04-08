import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {User} from "../models/user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../store/types";
import {Cocktail} from "../models/cocktail.model";

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective implements OnInit, OnDestroy {
  user: Observable<null | User>;
  userSub!: Subscription;

  @Input("appDelete") type!: Cocktail;

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

      if(user?._id == this.type.creatorUserId || user?.role === 'admin') {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
