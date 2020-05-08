import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConfigAddComponent } from './test-config-add.component';

describe('TestConfigAddComponent', () => {
  let component: TestConfigAddComponent;
  let fixture: ComponentFixture<TestConfigAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestConfigAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConfigAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
