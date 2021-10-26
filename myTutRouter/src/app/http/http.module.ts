import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';

import { HttpComponent } from './http.component';
import { SimpleHttpComponent } from './simple-http/simple-http.component';
import { MoreHttpRequestsComponent } from './more-http-requests/more-http-requests.component';
import { YouTubeSearchComponent } from './you-tube-search/you-tube-search.component';
import { SearchResultComponent } from './you-tube-search/search-result.component';
import { SearchBoxComponent } from './you-tube-search/search-box.component';
import { youTubeSearchInjectables } from './you-tube-search/you-tube-search.injectables';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  //{ path: 'main', component: MainComponent },
  //{ path: 'more-info', component: MoreInfoComponent },
  //{ path: ':id', component: ProductComponent },
];

@NgModule({
  declarations: [
    HttpComponent,
    SimpleHttpComponent,
    MoreHttpRequestsComponent,
    YouTubeSearchComponent,
    SearchResultComponent,
    SearchBoxComponent
  ],
  exports: [
    HttpComponent,
    SimpleHttpComponent,
    MoreHttpRequestsComponent,
    YouTubeSearchComponent,
    SearchResultComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [youTubeSearchInjectables],
})  
export class HttpModule { }
