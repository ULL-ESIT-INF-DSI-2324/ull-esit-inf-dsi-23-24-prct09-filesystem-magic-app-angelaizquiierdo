import "mocha";
import { expect } from "chai";

import {  Color,
  LineaTipo,
  Rareza,
  CrearCarta,
  ImprimirCarta,} from "../../src/Ejercicio-app/cartas_magic.js";



describe('CrearCarta', () => {
  it(' Test 1 - Crear carta normal', () => {
    const carta = CrearCarta(
      1,
      'Carta de prueba',
      3,
      Color.Azul,
      LineaTipo.Criatura,
      Rareza.Rara,
      'Descripción de las reglas',
      10,
      4,
      3,
    );

    expect(carta.id).to.equal(1);
    expect(carta.nombre).to.equal('Carta de prueba');
    expect(carta.costeMana).to.equal(3);
    expect(carta.color).to.equal(Color.Azul);
    expect(carta.Lineatipo).to.equal(LineaTipo.Criatura);
    expect(carta.rareza).to.equal(Rareza.Rara);
    expect(carta.textoReglas).to.equal('Descripción de las reglas');
    expect(carta.valorMercado).to.equal(10);
    expect(carta.fuerza).to.equal(4);
    expect(carta.resistencia).to.equal(3);
  });

  it('Test 2 - Error si falta el valor de fuerza para una criatura', () => {
    expect(() =>
      CrearCarta(
        2,
        'Otra carta de prueba',
        2,
        Color.Rojo,
        LineaTipo.Criatura,
        Rareza.Comun,
        'Otra descripción de las reglas',
        5,
        undefined,
        2,
      ),
    ).to.throw('Las criaturas deben tener valores de fuerza y resistencia.');
  });

  it('Test 3 - Error si falta el valor de resistencia para una criatura', () => {
    expect(() =>
      CrearCarta(
        3,
        'Otra carta de prueba',
        2,
        Color.Verde,
        LineaTipo.Criatura,
        Rareza.Infrecuente,
        'Otra descripción de las reglas',
        5,
        3,
        undefined,
      ),
    ).to.throw('Las criaturas deben tener valores de fuerza y resistencia.');
  });

  it('Test 4 - Crear carta de Planeswalker con las marcas de lealtad proporcionadas', () => {
    const carta = CrearCarta(
      4,
      'Planeswalker',
      4,
      Color.Incoloro,
      LineaTipo.Planeswalker,
      Rareza.Mitica,
      'Reglas del Planeswalker',
      15,
      undefined,
      undefined,
      6,
    );

    expect(carta.marcasLealtad).to.equal(6);
  });

  it('Test 5 - Error si falta el valor de marcas de lealtad para un Planeswalker', () => {
    expect(() =>
      CrearCarta(
        5,
        'Planeswalker',
        4,
        Color.Incoloro,
        LineaTipo.Planeswalker,
        Rareza.Mitica,
        'Reglas del Planeswalker',
        15,
        undefined,
        undefined,
        undefined,
      ),
    ).to.throw('Los Planeswalkers deben tener un valor de marcas de lealtad.');
  });
});

describe('ImprimirCarta()', () => {
  it('Test 6 - ImprimirCarta(carta)', () => {
    const carta = {
      id: 1,
      nombre: 'Carta de prueba',
      costeMana: 3,
      color: Color.Azul,
      Lineatipo: LineaTipo.Criatura,
      rareza: Rareza.Rara,
      textoReglas: 'Descripción de las reglas',
      valorMercado: 10,
      fuerza: 4,
      resistencia: 3,
    };

    const detalles = ImprimirCarta(carta);

    expect(detalles).to.equal(`ID: 1
Nombre: Carta de prueba
Costo de mana: 3
Color: Azul
Linea Tipo: Criatura
Rareza: Rara
Texto Reglas: Descripción de las reglas
Valor Mercado: 10
Fuerza: 4
Resistencia: 3`);
  });

  it('Test 6 - ImprimirCarta(carta)', () => {
    const carta = {
      id: 2,
      nombre: 'Otra carta de prueba',
      costeMana: 2,
      color: Color.Rojo,
      Lineatipo: LineaTipo.Instantaneo,
      rareza: Rareza.Comun,
      textoReglas: 'Otra descripción de las reglas',
      valorMercado: 5,
    };

    const detalles = ImprimirCarta(carta);

    expect(detalles).to.equal(`ID: 2
Nombre: Otra carta de prueba
Costo de mana: 2
Color: Rojo
Linea Tipo: Instantaneo
Rareza: Comun
Texto Reglas: Otra descripción de las reglas
Valor Mercado: 5`);
  });
});

