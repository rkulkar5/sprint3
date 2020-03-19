import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAddComponent } from './questions-add.component';

describe('QuestionsAddComponent', () => {
  let component: QuestionsAddComponent;
  let fixture: ComponentFixture<QuestionsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
