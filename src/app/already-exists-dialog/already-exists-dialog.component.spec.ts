import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyExistsDialogComponent } from './already-exists-dialog.component';

describe('AlreadyExistsDialogComponent', () => {
  let component: AlreadyExistsDialogComponent;
  let fixture: ComponentFixture<AlreadyExistsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlreadyExistsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyExistsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
