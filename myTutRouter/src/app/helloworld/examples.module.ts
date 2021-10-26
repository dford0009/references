import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';

import { HelloworldComponent } from './helloworld.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserListComponent } from './user-list/user-list.component';
//import { ProductComponent } from './product/product.component';
//import { MainComponent } from './main/main.component';
//import { MoreInfoComponent } from './more-info/more-info.component';

export const routes: Routes = [
  { path: '', redirectTo: 'helloworld', pathMatch: 'full' },
  { path: 'helloworld', component: HelloWorldComponent },
  { path: 'useritem', component: UserItemComponent },
  { path: 'userlist', component: UserListComponent },
];

@NgModule({
  declarations: [
    HelloworldComponent,
    HelloWorldComponent,
    UserItemComponent,
    UserListComponent,
    //ProductComponent,
    //MainComponent,
    //MoreInfoComponent
  ],
  exports: [
    HelloworldComponent,
    HelloWorldComponent,
    UserItemComponent,
    UserListComponent,
    //ProductComponent,
    //MainComponent,
    //MoreInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ExamplesModule { }
