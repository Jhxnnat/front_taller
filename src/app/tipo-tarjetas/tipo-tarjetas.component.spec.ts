import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTarjetasComponent } from './tipo-tarjetas.component';

describe('TipoTarjetasComponent', () => {
  let component: TipoTarjetasComponent;
  let fixture: ComponentFixture<TipoTarjetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoTarjetasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
