import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './src/app/services/user.service';

describe('Debug UserService HTTP', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make HTTP request and receive data', (done) => {
    const mockResponse = {
      data: [{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john@test.com' }],
      total: 1
    };

    service.getUsers().subscribe(response => {
      console.log('Response received:', response);
      expect(response.data.length).toBe(1);
      done();
    });

    console.log('Expecting HTTP request...');
    const req = httpMock.expectOne('/assets/demo-data/users.json');
    console.log('HTTP request found, flushing response...');
    req.flush(mockResponse);
  });
});
