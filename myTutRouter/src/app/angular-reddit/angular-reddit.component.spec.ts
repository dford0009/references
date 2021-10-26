import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularRedditComponent } from './angular-reddit.component';

describe('AngularRedditComponent', () => {
  let component: AngularRedditComponent;
  let fixture: ComponentFixture<AngularRedditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularRedditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularRedditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
