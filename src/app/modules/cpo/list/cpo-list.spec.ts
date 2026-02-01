import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpoList } from './cpo-list';

describe('Cpo', () => {
  let component: CpoList;
  let fixture: ComponentFixture<CpoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
