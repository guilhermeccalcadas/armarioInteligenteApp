import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyWardrobePage } from './my-wardrobe.page';

describe('MyWardrobePage', () => {
  let component: MyWardrobePage;
  let fixture: ComponentFixture<MyWardrobePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWardrobePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
