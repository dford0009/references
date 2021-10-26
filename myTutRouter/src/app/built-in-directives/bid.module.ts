import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';
import {
  APP_BASE_HREF,
  LocationStrategy,
  HashLocationStrategy
} from "@angular/common";

import { BuiltInDirectivesComponent } from './built-in-directives.component';
import { IntroComponent } from './intro/intro.component';
import { NgClassExampleComponent } from './ng-class-example/ng-class-example.component';
import { NgForExampleComponent } from './ng-for-example/ng-for-example.component';
import { NgNonBindableExampleComponent } from './ng-non-bindable-example/ng-non-bindable-example.component';
import { NgStyleExampleComponent } from './ng-style-example/ng-style-example.component';
import { NgSwitchExampleComponent } from './ng-switch-example/ng-switch-example.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from "./sidebar/sidebar-item.component";

import { ExampleDef } from "./example.model";

export const examples: ExampleDef[] = [
  { label: "Intro", name: "intro", path: "intro", component: IntroComponent },
  {
    label: "NgFor",
    name: "NgFor",
    path: "ng_for",
    component: NgForExampleComponent
  },
  {
    label: "NgSwitch",
    name: "NgSwitch",
    path: "ng_switch",
    component: NgSwitchExampleComponent
  },
  {
    label: "NgStyle",
    name: "NgStyle",
    path: "ng_style",
    component: NgStyleExampleComponent
  },
  {
    label: "NgClass",
    name: "NgClass",
    path: "ng_class",
    component: NgClassExampleComponent
  },
  {
    label: "NgNonBindable",
    name: "NgNonBindable",
    path: "ng_non_bindable",
    component: NgNonBindableExampleComponent
  }
];

// AOT Limitation, see:
//  https://github.com/rangle/angular-2-aot-sandbox#func-in-routes-top
//
// dynamically configure the router based on our ExampleDefs
// export function makeRoutes(exampleDefs: ExampleDef[]): Routes {
//     return exampleDefs.map( (example: ExampleDef) => ({
//     path: example.path, component: example.component, pathMatch: 'full'
//    }));
// };
// export const routes: Routes = makeRoutes(examples);
//
// Above will work fine for JIT, but not in AOT, so for now, define them
// manually
export const routes: Routes = [
  { path: "intro", component: IntroComponent, pathMatch: "full" },
  { path: "ng_for", component: NgForExampleComponent},
  { path: "ng_switch", component: NgSwitchExampleComponent},
  { path: "ng_style", component: NgStyleExampleComponent},
  { path: "ng_class", component: NgClassExampleComponent},
  {
    path: "ng_non_bindable",
    component: NgNonBindableExampleComponent,
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [
    BuiltInDirectivesComponent,
    IntroComponent,
    NgClassExampleComponent,
    NgForExampleComponent,
    NgNonBindableExampleComponent,
    NgStyleExampleComponent,
    NgSwitchExampleComponent,
    SidebarComponent,
    SidebarItemComponent,
  ],
  exports: [
    BuiltInDirectivesComponent,
    IntroComponent,
    NgClassExampleComponent,
    NgForExampleComponent,
    NgNonBindableExampleComponent,
    NgStyleExampleComponent,
    NgSwitchExampleComponent,
    SidebarComponent,
    SidebarItemComponent,
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: "ExampleDefs", useValue: examples }
  ],
})  
export class BidModule { }
