import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandEditComponent } from './band-edit.component';

describe('BandEditComponent', () => {
  let component: BandEditComponent;
  let fixture: ComponentFixture<BandEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
