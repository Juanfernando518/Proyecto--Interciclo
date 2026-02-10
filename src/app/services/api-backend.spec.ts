import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// CORRECCIÓN: Importamos desde './api-backend' (sin .service en el nombre del archivo)
import { ApiBackendService } from './api-backend'; 

describe('ApiBackendService', () => {
  let service: ApiBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiBackendService]
    });
    service = TestBed.inject(ApiBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});