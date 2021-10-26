import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {
  RouterModule,
  Routes,
  Router
} from '@angular/router';
import {
  APP_BASE_HREF,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

import { DependencyInjectionComponent } from './dependency-injection.component';
import { IntroComponent } from './intro/intro.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item.component';

import { UserDemoModule } from './user-demo/user-demo.module';
import { AnalyticsDemoModule } from './analytics-demo/analytics-demo.module';

import { ExampleDef } from './example.model';
import { UserDemoInjectorComponent } from './user-demo/user-demo.injector.component';
import { UserDemoComponent } from './user-demo/user-demo.component';
import { AnalyticsDemoComponent } from './analytics-demo/analytics-demo.component';

/*
 * Here's the master list of our examples for this chapter.
 */
export const examples: ExampleDef[] = [
   {label: 'Intro', name: 'intro', path: 'intro', component: IntroComponent},
   {label: 'Injector', name: 'Injector', path: 'injector', component: UserDemoInjectorComponent},
   {label: 'useClass (UserService)', name: 'UseClass', path: 'use-class', component: UserDemoComponent},
   {label: 'factory (AnalyticsService)', name: 'UseClass', path: 'factory', component: AnalyticsDemoComponent},
];

export const routes: Routes = [
  { path: 'intro', component: IntroComponent, pathMatch: 'full' },
  { path: 'injector', component: UserDemoInjectorComponent, pathMatch: 'full' },
  { path: 'use-class', component: UserDemoComponent, pathMatch: 'full' },
  { path: 'factory', component: AnalyticsDemoComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    DependencyInjectionComponent,
    IntroComponent,
    SidebarComponent,
    SidebarItemComponent,
    UserDemoInjectorComponent,
    UserDemoComponent,
    AnalyticsDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

    UserDemoModule,
    AnalyticsDemoModule,
  ],
  providers: [
    { provide: APP_BASE_HREF,    useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'ExampleDefs',    useValue: examples }
  ],
})
export class DiModule { }
