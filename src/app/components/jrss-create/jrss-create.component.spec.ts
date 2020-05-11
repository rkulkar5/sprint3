import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JrssCreateComponent } from './jrss-create.component';

describe('JrssCreateComponent', () => {
  let component: JrssCreateComponent;
  let fixture: ComponentFixture<JrssCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JrssCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JrssCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
