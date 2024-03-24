import "mocha";
import { expect } from "chai";
import * as fs from 'fs';

import chalk from 'chalk';

import { Carta, Color, LineaTipo, Rareza } from "../../src/Ejercicio-app/cartas_magic.js";
import { EliminarCarta, ModificarCarta, CargarCartas, GuardarCarta, ListaCartas, MostrarCarta } from "../../src/Ejercicio-app/gestor_cartas.js";


describe('Funciones de gestión de archivos', () => {
  const usuario = 'testUser';

  // Antes de cada prueba, asegurarse de que haya al menos una carta guardada para el usuario
  beforeEach(() => {
    GuardarCarta(usuario, carta); // Guarda una carta para el usuario 'testUser'
    const cartas = CargarCartas(usuario);
    cartas.forEach((carta) => {
      EliminarCarta(usuario, carta.id);
    });
    GuardarCarta(usuario, carta); // Guarda una carta para el usuario 'testUser'
  });

  const carta: Carta = {
    id: 1,
    nombre: 'Carta de prueba',
    costeMana: 2,
    color: Color.Azul,
    Lineatipo: LineaTipo.Criatura,
    rareza: Rareza.Rara,
    textoReglas: 'Texto de reglas de prueba',
    valorMercado: 5,
  };

  const carta1: Carta = {
    id: 2,
    nombre: 'Otra Carta de prueba',
    costeMana: 3,
    color: Color.Rojo,
    Lineatipo: LineaTipo.Conjuro,
    rareza: Rareza.Comun,
    textoReglas: 'Texto de reglas de otra prueba',
    valorMercado: 8,
  };

  const blackLotus: Carta = {
    id: 3,
    nombre: 'Black Lotus',
    costeMana: 0,
    color: Color.Incoloro,
    Lineatipo: LineaTipo.Artefacto,
    rareza: Rareza.Mitica,
    textoReglas: 'Toca, Sacrificar Black Lotus: Agrega tres manás de cualquier color.',
    valorMercado: 1000, // Valor de mercado estimado
  };

  const ancestralRecall: Carta = {
    id: 4,
    nombre: 'Ancestral Recall',
    costeMana: 8764,
    color: Color.Azul,
    Lineatipo: LineaTipo.Conjuro,
    rareza: Rareza.Rara,
    textoReglas: 'Roba tres cartas.',
    valorMercado: 5000,
  };

  const timeWalk: Carta = {
    id: 5,
    nombre: 'Time Walk',
    costeMana: 68364,
    color: Color.Azul,
    Lineatipo: LineaTipo.Conjuro,
    rareza: Rareza.Rara,
    textoReglas: 'Toma un turno adicional después de este. El turno adicional no puede ser en el turno en el que lanzaste Time Walk.',
    valorMercado: 4000,
  };

  const moxJet: Carta = {
    id: 6,
    nombre: 'Mox Jet',
    costeMana: 0,
    color: Color.Negro,
    Lineatipo: LineaTipo.Artefacto,
    rareza: Rareza.Rara,
    textoReglas: 'Toca para añadir {B} a tu reserva de maná.',
    valorMercado: 500,
  };

  describe('GuardarCarta()', () => {
    it('Test 1 - GuardarCarta(usuario, carta)', () => {
      const cartas = CargarCartas(usuario);
      expect(cartas).to.have.lengthOf(1);
      expect(cartas[0]).to.deep.equal(carta);
    });
  });

  describe('CargarCartas()', () => {

    it('Test 2 - GuardarCarta(usuario, carta1) y CargarCartas(usuario) return 2 y carta1', () => {
      GuardarCarta(usuario, carta1);
      const cartas = CargarCartas(usuario);
      expect(cartas).to.have.lengthOf(2);
      expect(cartas[1]).to.deep.equal(carta1);
    });

    it('Test 3 - CargarCartas(usuarioInexistente) lanzar un error si el usuario no existe', () => {
      expect(() => CargarCartas('usuarioInexistente')).to.throw(Error, 'No existe este usuario: usuarioInexistente con carta magic');
    });
  });

  describe('ModificarCarta()', () => {
 
    it('Test 4 - ModificarCarta(usuario, carta1.id, nuevaCarta) return 2 y nuevaCarta', () => {
      GuardarCarta(usuario, carta1);
      const nuevaCarta = { ...carta1, nombre: 'Nueva Carta de Prueba' };
      ModificarCarta(usuario, carta1.id, nuevaCarta);
      const cartas = CargarCartas(usuario);
      expect(cartas).to.have.lengthOf(2);
      expect(cartas[1]).to.deep.equal(nuevaCarta);
    });

    it('Test 5 - ModificarCarta() lanzar un error si se intenta modificar una carta que no existe', () => {
      expect(() => ModificarCarta(usuario, 100, carta1)).to.throw(Error, 'No existe ninguna carta con ID 100 en la colección.');
    });
  });

  describe('EliminarCarta()', () => {

    it('Test 6 - EliminarCarta(usuario, blackLotus.id) una carta de la colección del usuario', () => {
      GuardarCarta(usuario, carta1);
      GuardarCarta(usuario, blackLotus);
      EliminarCarta(usuario, blackLotus.id);
      const cartas : Carta[] = CargarCartas(usuario);
      expect(cartas).to.have.lengthOf(2);
    });

    it('Test 7 - EliminarCarta(usuario, blackLotus.id) una carta de la colección del usuario', () => {
      GuardarCarta(usuario, moxJet);
      GuardarCarta(usuario, blackLotus);
      GuardarCarta(usuario, timeWalk);
      EliminarCarta(usuario, moxJet.id);
      const cartas : Carta[] = CargarCartas(usuario);
      expect(cartas).to.have.lengthOf(3);
    });

    it('Test 8 -  EliminarCarta(usuario, 100)  return error carta que no existe', () => {
      GuardarCarta(usuario, carta1);
      GuardarCarta(usuario, blackLotus);
      expect(() => EliminarCarta(usuario, 100)).to.throw(Error, 'No existe ninguna carta con ID 100 en la colección.');
    });
  });

  describe('ListaCartas()', () => {
    it('Test 9 - Listar() las cartas de un usuario', () => {
      GuardarCarta(usuario, carta);
      GuardarCarta(usuario, blackLotus);
      const expectedCardCount = 2;
      ListaCartas(usuario);
      const cartas = CargarCartas(usuario);
      expect(cartas).to.have.lengthOf(expectedCardCount);
      expect(fs.existsSync(`./src/Ejercicio-app/usuarios/${usuario}/${carta.id}.json`)).to.be.true;
      expect(fs.existsSync(`./src/Ejercicio-app/usuarios/${usuario}/${blackLotus.id}.json`)).to.be.true;
    });


    it('Test 10 - Listar() las cartas de un usuario', () => {
      GuardarCarta(usuario, timeWalk);
      GuardarCarta(usuario, moxJet);
      GuardarCarta(usuario,ancestralRecall);
      const expectedCardCount = 4;
      ListaCartas(usuario);
      const cartas = CargarCartas(usuario);
      expect(cartas).to.have.lengthOf(expectedCardCount);
      expect(fs.existsSync(`./src/Ejercicio-app/usuarios/${usuario}/${carta.id}.json`)).to.be.true;
      expect(fs.existsSync(`./src/Ejercicio-app/usuarios/${usuario}/${timeWalk.id}.json`)).to.be.true;
      expect(fs.existsSync(`./src/Ejercicio-app/usuarios/${usuario}/${moxJet.id}.json`)).to.be.true;
    });

    
  });

  describe('MostrarCarta()', () => {
    it('Test 11 -  MostrarCarta() la información de una carta específica de un usuario', () => {
      GuardarCarta(usuario, carta);
      const salidaconsola = CapturaSalidaConsola(() => {
        MostrarCarta(usuario, carta.id);
      });

      expect(fs.existsSync(`./src/Ejercicio-app/usuarios/${usuario}/${carta.id}.json`)).to.be.true;
  
    });
  });
});



// Función para capturar salida de consola
function CapturaSalidaConsola(callback: () => void): string {
  const log = console.log;
  const array: string[] = [];
  console.log = (message: any) => {
    array.push(message);
  };
  callback();
  console.log = log;
  return array.join('\n');
}