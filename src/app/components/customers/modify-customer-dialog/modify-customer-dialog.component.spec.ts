import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCustomerDialogComponent } from './modify-customer-dialog.component';

describe('ModifyCustomerDialogComponent', () => {
  let component: ModifyCustomerDialogComponent;
  let fixture: ComponentFixture<ModifyCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCustomerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
