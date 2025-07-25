import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiTarjetasComponent } from './mi-tarjetas.component';

describe('MiTarjetasComponent', () => {
  let component: MiTarjetasComponent;
  let fixture: ComponentFixture<MiTarjetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiTarjetasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
