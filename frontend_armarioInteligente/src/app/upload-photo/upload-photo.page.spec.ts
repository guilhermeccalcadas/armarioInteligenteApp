import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadPhotoPage } from './upload-photo.page';

describe('UploadPhotoPage', () => {
  let component: UploadPhotoPage;
  let fixture: ComponentFixture<UploadPhotoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
