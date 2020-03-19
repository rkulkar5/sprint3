import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInstructionComponent } from './test-instruction.component';

describe('TestInstructionComponent', () => {
  let component: TestInstructionComponent;
  let fixture: ComponentFixture<TestInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
