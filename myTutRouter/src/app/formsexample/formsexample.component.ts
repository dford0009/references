import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ExampleDef } from './example.model';

@Component({
  selector: 'app-formsexample',
  templateUrl: './formsexample.component.html',
  styleUrls: ['./formsexample.component.css']
})
export class FormsexampleComponent {
  constructor(
    private router: Router,
    @Inject('ExampleDefs') public examples: ExampleDef[]) {
  }
}
