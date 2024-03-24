#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

import { LineaTipo, Color, Rareza, Carta, CrearCarta } from "./cartas_magic.js";

import {
  EliminarCarta,
  GuardarCarta,
  ListaCartas,
  MostrarCarta,
} from "./gestor_cartas.js";

const cerror = console.error;

/**
 * Comando añadir: Añadimos una carta a un usuario.
 * @argument usuario: Usuario al que se añadirá la carta. [Obligatorio]
 * @argument id:  ID único de la carta . [Obligatorio]
 * @argument nombre: Nombre de la carta. [Obligatorio]
 * @argument costeMana : costeMana de maná de la carta. [Obligatorio]
 * @argument color: Color de la carta. [Obligatorio]
 * @argument tipo : Línea de tipo de la carta. [Obligatorio]
 * @argument rareza : Rareza de la carta. [Obligatorio]
 * @argument textoReglas : Texto de las reglas de la carta.  [Obligatorio]
 * @argument valorMercado : Valor de mercado de la carta. [Obligatorio]
 * @argument fuerza : Fuerza de la carta (solo si el tipo es "Criatura"). [Opcional]
 * @argument resistencia : Resistencia de la carta (solo si el tipo es "Criatura"). [Opcional]
 * @argument marcasdelealtad : Marcas de lealtad de la carta (solo si el tipo es "Planeswalker"). [Opcional]
 */
yargs(hideBin(process.argv))
  .usage(
    "-Uso: $ node dist/Ejercicio-app/aplicacion.js añadir --usuario [string] --id [num] --nombre [string] --costeMana [num] --color [string] --tipo [string] --rareza [string]  --textoreglas [string]  --valormercado [num] ",
  )
  .example(
    '$node dist/Ejercicio-app/aplicacion.js añadir --usuario "Eva Peréz" --id 4234 --nombre "nombre_carta" --costeMana 3 --color "Azul" --tipo "Criatura" --rareza "Rara" --textoreglas "Descripción de las reglas" --fuerza 4 --resistencia 3 --valormercado 10',
    "añadimos una carta a un usuario",
  )
  .command(
    "añadir",
    "Añadir una tarjeta a la colección",
    {
      usuario: {
        description: "Usuario que compro la carta coleccionable de la carta.",
        type: "string",
        demandOption: true,
      },
      id: {
        description:
          "Debe ser un valor numérico único que identifica la carta.",
        type: "number",
        demandOption: true,
      },
      nombre: {
        description: "Cadena con el nombre de la carta coleccionable.",
        type: "string",
        demandOption: true,
      },
      costeMana: {
        description: "Numero con el costo de maná de la carta coleccionable.",
        type: "number",
        demandOption: true,
      },
      color: {
        description:
          "Color de la carta coleccionable que se quiere añadir, que puede ser  blanco, azul, negro, rojo, verde, incoloro o multicolor.",
        choices: Object.values(Color),
        demandOption: true,
      },
      tipo: {
        describe:
          "Línea de tipo de la carta coleccionable que se quiere añadir, que puede ser Tierra, Criatura, Ecantamiento, Conjuro, Instantáneo, Artefacto o Planeswalker.Si la carta es de tipo  criatura se debe incluir  --fuerza y --resistencia. Si la carta es de tipo Planeswalker se debe incluir --marcasdelealtad.",
        choices: Object.values(LineaTipo),
        demandOption: true,
      },
      rareza: {
        describe:
          "Rareza de la carta coleccionable que se quiere añadir ,que puede ser común, infrecuente, rara o mítica.",
        choices: Object.values(Rareza),
        demandOption: true,
      },
      textoreglas: {
        describe:
          "Cadena de texto que contiene descripcion de los efectos de la carta y cualquier regla especial que tenga.",
        type: "string",
        demandOption: true,
      },
      fuerza: {
        describe: "Valor númerico que solo se incluyen si el --tipo Criatura.",
        type: "number",
        demandOption: false,
      },
      resistencia: {
        describe: "Valor númerico que solo se incluye si el --tipo Criatura.",
        type: "number",
        demandOption: false,
      },
      marcaslealtad: {
        describe:
          "Valor númerico que solo se incluye si el --tipo Planeswalker.",
        type: "number",
        demandOption: false,
      },
      valormercado: {
        describe:
          "Valor numérico que indica el valor de la carta en el mercado.",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      if (typeof argv.usuario !== "string") {
        throw chalk.red(new Error("Usuario debe ser una cadena de caracteres"));
      }

      if (isNaN(argv.id)) {
        throw chalk.red(new Error("ID debe ser un número"));
      }

      if (typeof argv.nombre !== "string") {
        throw chalk.red(new Error("Nombre debe ser una cadena"));
      }

      if (isNaN(argv.costeMana)) {
        throw chalk.red(new Error("Coste de Maná debe ser un número"));
      }

      if (!Object.values(Color).includes(argv.color)) {
        throw chalk.red(new Error("Color debe ser un color válido"));
      }

      if (!Object.values(LineaTipo).includes(argv.tipo)) {
        throw chalk.red(new Error("Tipo debe ser un tipo válido"));
      }

      if (!Object.values(Rareza).includes(argv.rareza)) {
        throw chalk.red(new Error("Rareza debe ser una rareza válida"));
      }

      if (typeof argv.textoreglas !== "string") {
        throw chalk.red(new Error("Reglas debe ser una cadena"));
      }

      if (argv.marcaslealtad !== undefined) {
        if (isNaN(argv.marcaslealtad) && argv.tipo !== LineaTipo.Planeswalker) {
          throw chalk.red(new Error("Marcas de Lealtad debe ser un número"));
        }
      }
      if (isNaN(argv.valormercado)) {
        throw chalk.red(new Error("Valor debe ser un número"));
      }

      if (argv.fuerza && isNaN(argv.fuerza)) {
        throw chalk.red(new Error("Fuerza debe ser un número"));
      }

      if (argv.resistencia && isNaN(argv.resistencia)) {
        throw chalk.red(new Error("Resistencia debe ser un número"));
      }

      if (argv.fuerza && argv.resistencia && argv.tipo !== LineaTipo.Criatura) {
        throw chalk.red(
          new Error("Fuerza/Resistencia solo es para el tipo Criatura"),
        );
      }

      if (
        argv.tipo === LineaTipo.Criatura &&
        !argv.fuerza &&
        !argv.resistencia
      ) {
        throw chalk.red(
          new Error("El tipo Criatura debe tener Fuerza/Resistencia"),
        );
      }
      try {
        const carta: Carta = CrearCarta(
          argv.id,
          argv.nombre,
          argv.costeMana,
          argv.color,
          argv.tipo,
          argv.rareza,
          argv.textoreglas,
          argv.valormercado,
          argv.fuerza,
          argv.resistencia,
          argv.marcaslealtad,
        );
        GuardarCarta(argv.usuario, carta);
      } catch (error) {
        // Manejo de errores
        if (error instanceof Error) {
          cerror(chalk.red(error.message));
        } else {
          cerror(chalk.red(error));
        }
      }
    },
  )

  /**
   * Comando Actualizar: Actualizar una carta a un usuario.
   * @argument usuario: Usuario al que se añadirá la carta. [Obligatorio]
   * @argument id:  ID único de la carta . [Obligatorio]
   * @argument nombre: Nombre de la carta. [Obligatorio]
   * @argument costeMana : costeMana de maná de la carta. [Obligatorio]
   * @argument color: Color de la carta. [Obligatorio]
   * @argument tipo : Línea de tipo de la carta. [Obligatorio]
   * @argument rareza : Rareza de la carta. [Obligatorio]
   * @argument textoReglas : Texto de las reglas de la carta.  [Obligatorio]
   * @argument valorMercado : Valor de mercado de la carta. [Obligatorio]
   * @argument fuerza : Fuerza de la carta (solo si el tipo es "Criatura"). [Opcional]
   * @argument resistencia : Resistencia de la carta (solo si el tipo es "Criatura"). [Opcional]
   * @argument marcasdelealtad : Marcas de lealtad de la carta (solo si el tipo es "Planeswalker"). [Opcional]
   */
  .usage(
    "-Uso: $ node dist/Ejercicio-app/aplicacion.js actualizar --usuario [string] --id [num] --nombre [string] --costeMana [num] --color [string] --tipo [string] --rareza [string]  --textoreglas [string]  --valormercado [num] ",
  )
  .example(
    '$node dist/Ejercicio-app/aplicacion.js actualizar --usuario "Eva Peréz" --id 4234 --nombre "nombre_carta" --costeMana 3 --color "Azul" --tipo "Criatura" --rareza "Rara" --textoreglas "Descripción de las reglas" --fuerza 4 --resistencia 3 --valormercado 10',
    "Actualizar una carta a un usuario",
  )
  .command(
    "actualizar",
    "Actualizar una carta de la colección",
    {
      usuario: {
        description: "Usuario que quiere modificar contenido.",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Carta que quiere cambiar sus elementos.",
        type: "number",
        demandOption: true,
      },
      nombre: {
        description: "Cadena con el nombre de la carta coleccionable.",
        type: "string",
        demandOption: true,
      },
      costeMana: {
        description: "Numero con el costo de maná de la carta coleccionable.",
        type: "number",
        demandOption: true,
      },
      color: {
        description:
          "Color de la carta coleccionable que se quiere añadir, que puede ser  blanco, azul, negro, rojo, verde, incoloro o multicolor.",
        choices: Object.values(Color),
        demandOption: true,
      },
      tipo: {
        describe:
          "Línea de tipo de la carta coleccionable que se quiere añadir, que puede ser Tierra, Criatura, Ecantamiento, Conjuro, Instantáneo, Artefacto o Planeswalker.Si la carta es de tipo  criatura se debe incluir  --fuerza y --resistencia. Si la carta es de tipo Planeswalker se debe incluir --marcasdelealtad.",
        choices: Object.values(LineaTipo),
        demandOption: true,
      },
      rareza: {
        describe:
          "Rareza de la carta coleccionable que se quiere añadir ,que puede ser común, infrecuente, rara o mítica.",
        choices: Object.values(Rareza),
        demandOption: true,
      },
      textoreglas: {
        describe:
          "Cadena de texto que contiene descripcion de los efectos de la carta y cualquier regla especial que tenga.",
        type: "string",
        demandOption: true,
      },
      fuerza: {
        describe: "Valor númerico que solo se incluyen si el --tipo Criatura.",
        type: "number",
        demandOption: false,
      },
      resistencia: {
        describe: "Valor númerico que solo se incluye si el --tipo Criatura.",
        type: "number",
        demandOption: false,
      },
      marcaslealtad: {
        describe:
          "Valor númerico que solo se incluye si el --tipo Planeswalker.",
        type: "number",
        demandOption: false,
      },
      valormercado: {
        describe:
          "Valor numérico que indica el valor de la carta en el mercado.",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      if (typeof argv.usuario !== "string") {
        throw chalk.red(new Error("Usuario debe ser una cadena de caracteres"));
      }

      if (isNaN(argv.id)) {
        throw chalk.red(new Error("ID debe ser un número"));
      }

      if (typeof argv.nombre !== "string") {
        throw chalk.red(new Error("Nombre debe ser una cadena"));
      }

      if (isNaN(argv.costeMana)) {
        throw chalk.red(new Error("Coste de Maná debe ser un número"));
      }

      if (!Object.values(Color).includes(argv.color)) {
        throw chalk.red(new Error("Color debe ser un color válido"));
      }

      if (!Object.values(LineaTipo).includes(argv.tipo)) {
        throw chalk.red(new Error("Tipo debe ser un tipo válido"));
      }

      if (!Object.values(Rareza).includes(argv.rareza)) {
        throw chalk.red(new Error("Rareza debe ser una rareza válida"));
      }

      if (typeof argv.textoreglas !== "string") {
        throw chalk.red(new Error("Reglas debe ser una cadena"));
      }

      if (argv.marcaslealtad !== undefined) {
        if (isNaN(argv.marcaslealtad) && argv.tipo !== LineaTipo.Planeswalker) {
          throw chalk.red(new Error("Marcas de Lealtad debe ser un número"));
        }
      }
      if (isNaN(argv.valormercado)) {
        throw chalk.red(new Error("Valor debe ser un número"));
      }

      if (argv.fuerza && isNaN(argv.fuerza)) {
        throw chalk.red(new Error("Fuerza debe ser un número"));
      }

      if (argv.resistencia && isNaN(argv.resistencia)) {
        throw chalk.red(new Error("Resistencia debe ser un número"));
      }

      if (argv.fuerza && argv.resistencia && argv.tipo !== LineaTipo.Criatura) {
        throw chalk.red(
          new Error("Fuerza/Resistencia solo es para el tipo Criatura"),
        );
      }

      if (
        argv.tipo === LineaTipo.Criatura &&
        !argv.fuerza &&
        !argv.resistencia
      ) {
        throw chalk.red(
          new Error("El tipo Criatura debe tener Fuerza/Resistencia"),
        );
      }

      try {
        const carta: Carta = CrearCarta(
          argv.id,
          argv.nombre,
          argv.costeMana,
          argv.color,
          argv.tipo,
          argv.rareza,
          argv.textoreglas,
          argv.valormercado,
          argv.fuerza,
          argv.resistencia,
          argv.marcaslealtad,
        );
        GuardarCarta(argv.usuario, carta);
      } catch (error) {
        // Manejo de errores
        if (error instanceof Error) {
          cerror(chalk.red(error.message));
        } else {
          cerror(chalk.red(error));
        }
      }
    },
  )

  /**
   * Comando lista: mostrar las cartas del usuario
   * @argument usuario : usuario que quieres ver sus cartas [Obligatorio]
   */

  .usage(
    "-Uso: $ node dist/Ejercicio-app/aplicacion.js lista --usuario [string] ",
  )
  .example(
    "$node dist/Ejercicio-app/aplicacion.js lista --usuario eduardo",
    "lista de cartas de un usuario",
  )
  .command(
    "lista",
    "Ver toda la lista de la coleccion",
    {
      usuario: {
        description: "Usuario que quiere ver su coleccion",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      if (typeof argv.usuario !== "string") {
        throw chalk.red(new Error("Usuario debe ser una cadena de caracteres"));
      }
      try {
        ListaCartas(argv.usuario);
      } catch (error) {
        // Manejo de errores
        if (error instanceof Error) {
          cerror(chalk.red(error.message));
        } else {
          cerror(chalk.red(error));
        }
      }
    },
  )

  /**
   * Comando leer
   * @argument usuario : usuario que le quieres leer una carta [Obligatorio]
   * @argument id : id de la carta que quieres lerr [Obligatorio]
   */
  .usage(
    "-Uso: $ node dist/Ejercicio-app/aplicacion.js leer --usuario [string] --id [num]",
  )
  .example(
    "$node dist/Ejercicio-app/aplicacion.js leer --usuario eduardo --id 2",
    "Mostrar una carta de un usuario ",
  )
  .command(
    "leer",
    "Lee una carta de un usuario.",
    {
      usuario: {
        description: "Usuario a la que quieres ver",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Identificador de la carta del usuario",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      if (typeof argv.usuario !== "string") {
        throw chalk.red(new Error("Usuario debe ser una cadena de caracteres"));
      }

      if (isNaN(argv.id)) {
        throw chalk.red(new Error("ID debe ser un número"));
      }
      try {
        MostrarCarta(argv.usuario, argv.id);
      } catch (error) {
        // Manejo de errores
        if (error instanceof Error) {
          cerror(chalk.red(error.message));
        } else {
          cerror(chalk.red(error));
        }
      }
    },
  )

  /**
   * Comando eliminar
   * @argument usuario : usuario que le quieres eliminar una carta [Obligatorio]
   * @argument id : id de la carta que quieres eliminar [Obligatorio]
   */

  .usage(
    "-Uso: $ node dist/Ejercicio-app/aplicacion.js eliminar --usuario [string] --id [num]",
  )
  .example(
    "$node dist/Ejercicio-app/aplicacion.js eliminar --usuario eduardo --id 2",
    "Eliminar una carta del usuario.",
  )
  .command(
    "eliminar",
    "Eliminar una carta del usuario. ",
    {
      usuario: {
        description:
          "Usuario que compro la carta coleccionable de la carta que se quiere añadir",
        type: "string",
        demandOption: true,
      },
      id: {
        description:
          "Debe ser un valor numérico único que identifica la carta.",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      if (typeof argv.usuario !== "string") {
        throw chalk.red(new Error("Usuario debe ser una cadena de caracteres"));
      }

      if (isNaN(argv.id)) {
        throw chalk.red(new Error("ID debe ser un número"));
      }

      try {
        EliminarCarta(argv.usuario, argv.id);
      } catch (error) {
        // Manejo de errores
        if (error instanceof Error) {
          cerror(chalk.red(error.message));
        } else {
          cerror(chalk.red(error));
        }
      }
    },
  )
  .help().argv;
