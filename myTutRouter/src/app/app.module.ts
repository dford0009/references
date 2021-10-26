import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  routes as childRoutes,
  ProductsModule
} from './products/products.module';

import {
  routes as childrenRoutes,
  ExamplesModule
} from './helloworld/examples.module';

import{
  ArModule
} from './angular-reddit/ar.module';

import{
  IaModule
} from './inventory-app/ia.module';

import{
  routes as bidRoutes,
  BidModule
} from './built-in-directives/bid.module';

import{
  routes as httpRoutes,
  HttpModule
} from './http/http.module';

import{
  routes as fexRoutes,
  FexModule
} from './formsexample/fex.module';

import{
  routes as diRoutes,
  DiModule
} from './dependency-injection/di.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { ProductsComponent } from './products/products.component';

import { AUTH_PROVIDERS } from './auth.service';
import { LoggedInGuard } from './logged-in.guard';
import { HelloworldComponent } from './helloworld/helloworld.component';
import { AngularRedditComponent } from './angular-reddit/angular-reddit.component';
import { InventoryAppComponent } from './inventory-app/inventory-app.component';
import { BuiltInDirectivesComponent } from './built-in-directives/built-in-directives.component';
import { HttpComponent } from './http/http.component';
import { FormsexampleComponent } from './formsexample/formsexample.component';
import { DependencyInjectionComponent } from './dependency-injection/dependency-injection.component';

const routes: Routes = [
  // basic routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contactus', redirectTo: 'contact' },

  // authentication demo
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ LoggedInGuard ]
  },

  // nested
  {
    path: 'products',
    component: ProductsComponent,
    children: childRoutes
  },
  //start of tutorial examples
  {
    path: 'helloworld',
    component: HelloworldComponent,
    children: childrenRoutes
  },

  //angular reddit example
  {
    path: 'angular-reddit',
    component: AngularRedditComponent
  },

  //inventory app example
  {
    path: 'inventory-app',
    component: InventoryAppComponent
  },

  //built in directives example
  {
    path: 'built-in-directives',
    component: BuiltInDirectivesComponent,
    children: bidRoutes
  },

  //http example
  {
    path: 'http',
    component: HttpComponent,
    children: httpRoutes
  },

  //forms example
  {
    path: 'formsexample',
    component: FormsexampleComponent,
    children: fexRoutes
  },

  //dependency injection example
  {
    path: 'dependency-injection',
    component: DependencyInjectionComponent,
    children: diRoutes
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    ProtectedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // <-- routes

    // added this for our child module
    ProductsModule,
    ExamplesModule,
    ArModule,
    IaModule,
    BidModule,
    HttpModule,
    FexModule,
    DiModule,
  ],
  providers: [
    // uncomment this for "hash-bang" routing
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
    AUTH_PROVIDERS,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
