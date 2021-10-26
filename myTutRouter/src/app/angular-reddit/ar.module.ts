import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';

import { AngularRedditComponent } from './angular-reddit.component';
import { ArticleComponent } from './article/article.component';

/*export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'more-info', component: MoreInfoComponent },
  { path: ':id', component: ProductComponent },
];*/

@NgModule({
  declarations: [
    AngularRedditComponent,
    ArticleComponent
  ],
  exports: [
    AngularRedditComponent,
  ],
  imports: [
    CommonModule,
  ]
})  
export class ArModule { }
