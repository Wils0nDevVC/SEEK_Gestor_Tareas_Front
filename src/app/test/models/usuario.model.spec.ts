import { Usuario } from './../../core/models/usuario.model';

describe('Usuario', () => {
  it('sdebería crear una instancia', () => {
    const usuario = new Usuario('1', 'testuser', 'testpass');
    expect(usuario).toBeTruthy();
  });

  it('debe establecer las propiedades correctamente', () => {
    const id = '1';
    const usuario = 'testuser';
    const contrasena = 'testpass';
    const token = 'testtoken';

    const user = new Usuario(id, usuario, contrasena, token);

    expect(user.id).toBe(id);
    expect(user.usuario).toBe(usuario);
    expect(user.contrasena).toBe(contrasena);
    expect(user.token).toBe(token);
  });

  it('debe tener un token indefinido si no se proporciona', () => {
    const user = new Usuario('1', 'testuser', 'testpass');
    expect(user.token).toBeUndefined();
  });
});
