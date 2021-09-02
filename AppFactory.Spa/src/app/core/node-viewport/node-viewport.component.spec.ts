import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeViewportComponent } from './node-viewport.component';

describe('NodeViewportComponent', () => {
  let component: NodeViewportComponent;
  let fixture: ComponentFixture<NodeViewportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeViewportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeViewportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
