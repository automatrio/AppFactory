import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelsOverlayComponent } from './panels-overlay.component';

describe('PanelsOverlayComponent', () => {
  let component: PanelsOverlayComponent;
  let fixture: ComponentFixture<PanelsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelsOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
