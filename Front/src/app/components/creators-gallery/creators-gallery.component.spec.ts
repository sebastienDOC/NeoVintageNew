import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorsGalleryComponent } from './creators-gallery.component';

describe('CreatorsGalleryComponent', () => {
  let component: CreatorsGalleryComponent;
  let fixture: ComponentFixture<CreatorsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatorsGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatorsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
