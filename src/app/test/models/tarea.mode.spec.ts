import { Tarea } from './../../core/models/todo.model';
import { v4 as uuidv4 } from 'uuid';

// Simulación de uuid como un string
let uuid = uuidv4();

describe('Tarea', () => {
  let originalUuidv4: string;

  beforeEach(() => {
    originalUuidv4 = uuid;
  });

  afterEach(() => {
    // Restaurar uuid.v4 al valor original
    uuid = originalUuidv4;
  });

  it('Debería crear una instancia', () => {
    const tarea = new Tarea('Test description');
    expect(tarea).toBeTruthy();
  });

  it('Debe establecer las propiedades correctamente', () => {
    const description = 'Test description';
    const tarea = new Tarea(description);

    expect(typeof tarea.id).toBe('string');
    expect(typeof tarea.description).toBe('string');
    
    expect(typeof tarea.completado).toBe('boolean');
  });
});
