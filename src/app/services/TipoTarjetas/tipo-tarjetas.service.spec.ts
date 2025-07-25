import { TestBed } from '@angular/core/testing';

import { TipoTarjetasService } from './tipo-tarjetas.service';

describe('TipoTarjetasService', () => {
  let service: TipoTarjetasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTarjetasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
