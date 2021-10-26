import { Component, Inject } from '@angular/core';
import { 
  ActivatedRoute,
  Router 
} from '@angular/router';

import { ExampleDef } from './example.model';

@Component({
  selector: 'app-built-in-directives',
  templateUrl: './built-in-directives.component.html',
})
export class BuiltInDirectivesComponent{
  constructor(
    private router: Router,
    @Inject('ExampleDefs') public examples: ExampleDef[],
    private route: ActivatedRoute) {
  }
}
