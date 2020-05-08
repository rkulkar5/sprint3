import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConfigEditComponent } from './test-config-edit.component';

describe('TestConfigEditComponent', () => {
  let component: TestConfigEditComponent;
  let fixture: ComponentFixture<TestConfigEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestConfigEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConfigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
