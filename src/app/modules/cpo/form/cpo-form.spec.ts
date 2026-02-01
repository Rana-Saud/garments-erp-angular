import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpoForm } from './cpo-form';

describe('CpoForm', () => {
  let component: CpoForm;
  let fixture: ComponentFixture<CpoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
