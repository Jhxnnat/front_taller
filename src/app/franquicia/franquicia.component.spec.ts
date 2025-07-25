import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranquiciaComponent } from './franquicia.component';

describe('FranquiciaComponent', () => {
  let component: FranquiciaComponent;
  let fixture: ComponentFixture<FranquiciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranquiciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranquiciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
