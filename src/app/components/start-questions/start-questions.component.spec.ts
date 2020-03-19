import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartQuestionsComponent } from './start-questions.component';

describe('StartQuestionsComponent', () => {
  let component: StartQuestionsComponent;
  let fixture: ComponentFixture<StartQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
