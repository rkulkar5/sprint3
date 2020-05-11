import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestresultsComponent } from './view-testresults.component';

describe('ViewTestresultsComponent', () => {
  let component: ViewTestresultsComponent;
  let fixture: ComponentFixture<ViewTestresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTestresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
