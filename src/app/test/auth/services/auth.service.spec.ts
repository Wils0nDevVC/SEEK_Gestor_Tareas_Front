import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from './../../../auth/services/auth.service';
import { LocalService } from '../../../shared/services/local-service.service';
import { AppState } from '../../../core/interfaces';
import { Usuario } from '../../../core/models';
import { v4 as uuidv4 } from 'uuid';

describe('AuthService', () => {
  let service: AuthService;
  let store: Store<AppState>;
  let localServiceSpy: jasmine.SpyObj<LocalService>;

  beforeEach(() => {
    const localServiceSpyObj = jasmine.createSpyObj('LocalService', [
      'setJsonValue',
      'getJsonValue',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: LocalService, useValue: localServiceSpyObj },
      ],
      imports: [
        // Add any necessary modules here
        StoreModule.forRoot({}),
      ],
    });

    service = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
    localServiceSpy = TestBed.inject(
      LocalService
    ) as jasmine.SpyObj<LocalService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loginUser', () => {
    it('Debería devolver un usuario con credenciales válidas', () => {
      const testUser: Usuario = {
        id: uuidv4(),
        usuario: 'test01',
        contrasena: 'test01',
        token: uuidv4() + 'test01',
      };
      service.loginUser('test01', 'test01').subscribe((user) => {
        expect(user.usuario).toEqual(testUser.usuario);
        expect(user.contrasena).toEqual(testUser.contrasena);
        expect(user.id).toBeTruthy();
        expect(typeof user.id).toBe(typeof testUser.id);
        expect(user.token).toBeTruthy();
        expect(typeof user.token).toBe(typeof testUser.token);
      });
    });

    it('Debería devolver un usuario vacío con credenciales no válidas', () => {
      service.loginUser('invalid', 'credentials').subscribe((user: Usuario) => {
        const usuario = new Usuario('', '', '', undefined);
        expect(user).toEqual(usuario);
      });
    });
  });

    describe('checkAuthentication', () => {
      it('Debería devolver verdadero si el token existe', () => {
        const token = '123456789';
        spyOn(localStorage, 'getItem').and.returnValue(token);
        service.checkAuthentication().subscribe(result => {
          expect(result).toBeTrue();
        });
      });

      it('Debería devolver falso si el token no existe', () => {
        spyOn(localStorage, 'getItem').and.returnValue(null);
        service.checkAuthentication().subscribe(result => {
          expect(result).toBeFalse();
        });
      });
    });
});
