import fs from "fs";
import { Carta, ImprimirCarta } from "./cartas_magic.js";

import chalk from "chalk";

const log = console.log;

/**
 * Función para guardar una carta en la colección del usuario.
 * @param usuario Nombre del usuario.
 * @param carta Carta a guardar.
 */
export function GuardarCarta(usuario: string, carta: Carta): void {
  log(
    chalk.green(
      `Añadiendo carta a la colección del usuario: ${usuario} con id ${carta.id}`,
    ),
  );
  const directorioUsuario = `./src/Ejercicio-app/usuarios/${usuario}`;
  if (!fs.existsSync(directorioUsuario)) {
    fs.mkdirSync(directorioUsuario);
  }

  const rutaCarta = `${directorioUsuario}/${carta.id}.json`;
  fs.writeFileSync(rutaCarta, JSON.stringify(carta));
}

/**
 * Función para cargar las cartas de un usuario desde el sistema de archivos.
 * @param usuario Nombre del usuario.
 * @returns Un array de cartas del usuario.
 */
export function CargarCartas(usuario: string): Carta[] {
  const directorioUsuario = `./src/Ejercicio-app/usuarios/${usuario}`;
  if (!fs.existsSync(directorioUsuario)) {
    throw new Error(`No existe este usuario: ${usuario} con carta magic`);
  }
  const cartas: Carta[] = [];
  const archivos = fs.readdirSync(directorioUsuario);
  archivos.forEach((archivo) => {
    const rutaCarta = `${directorioUsuario}/${archivo}`;
    const cartaJson = fs.readFileSync(rutaCarta, "utf-8");
    const carta: Carta = JSON.parse(cartaJson);
    cartas.push(carta);
  });

  return cartas;
}

/**
 * Función para modificar una carta en la colección del usuario.
 * @param usuario Nombre del usuario.
 * @param id ID de la carta a modificar.
 * @param nuevaCarta Nuevos datos de la carta.
 * @throws {Error} Si no se encuentra la carta con el ID especificado.
 */
export function ModificarCarta(
  usuario: string,
  id: number,
  nuevaCarta: Carta,
): void {
  const coleccion: Carta[] = CargarCartas(usuario);
  const index: number = coleccion.findIndex((carta) => carta.id === id);
  if (index !== -1) {
    // Si se encontró la carta, se modifica
    coleccion[index] = nuevaCarta;
    GuardarCarta(usuario, coleccion[index]);
    log(
      chalk.green(
        `La carta con ID ${id} de ${usuario} a sido actualizada con éxito.`,
      ),
    );
  } else {
    throw new Error(`No existe ninguna carta con ID ${id} en la colección.`);
  }
}

/**
 * Función para eliminar una carta de la colección del usuario.
 * @param usuario Nombre del usuario.
 * @param id ID de la carta a eliminar.
 * @throws {Error} Si no se encuentra la carta con el ID especificado.
 */
export function EliminarCarta(usuario: string, id: number): void {
  const cartas = CargarCartas(usuario);
  const index = cartas.findIndex((carta) => carta.id === id);
  if (index !== -1) {
    cartas.splice(index, 1);

    // Eliminar el archivo correspondiente al usuario
    const filePath = `./src/Ejercicio-app/usuarios/${usuario}/${id}.json`;
    fs.unlinkSync(filePath);
    // Verificar si el archivo se ha eliminado correctamente
    try {
      fs.accessSync(filePath, fs.constants.F_OK);
      log(chalk.red(`Error: El archivo ${filePath} no se ha eliminado.`));
    } catch (err) {
      log(
        chalk.green(
          `Carta con ID ${id} eliminada y archivo ${filePath} borrado con éxito.`,
        ),
      );
    }
  } else {
    throw new Error(`No existe ninguna carta con ID ${id} en la colección.`);
  }
}

/**
 * Función para listar las cartas de un usuario.
 * @param usuario Nombre del usuario.
 * @throws {Error} Si no se encuentra al usuario especficado como parametro.
 */
export function ListaCartas(usuario: string) {
  const cartas: Carta[] = CargarCartas(usuario);
  if (cartas.length === 0) {
    throw new Error(`No existe ${usuario} en los datos.`);
  } else {
    log(chalk.green(`Coleccion de ${usuario} : `));
    cartas.forEach((carta) => {
      log("-------------------------------");
      switch (carta.color) {
        case "Azul":
          log(chalk.blue(`${ImprimirCarta(carta)}`)); // Imprimir información de la carta
          break;
        case "Rojo":
          log(chalk.red(`${ImprimirCarta(carta)}`)); // Imprimir información de la carta
          break;
        case "Blanco":
          log(chalk.white(`${ImprimirCarta(carta)}`)); // Imprimir información de la carta
          break;
        case "Verde":
          log(chalk.green(`${ImprimirCarta(carta)}`)); // Imprimir información de la carta
          break;
        case "Incoloro":
          log(chalk.grey(`${ImprimirCarta(carta)}`)); // Imprimir información de la carta
          break;
        case "Multicolor":
          log(chalk.grey(`ID: ${carta.id}`));
          log(chalk.yellow(`Nombre: ${carta.nombre}`));
          log(chalk.blue(`Costo de mana: ${carta.costeMana}`));
          log(chalk.gray(`Color: ${carta.color}`));
          log(chalk.magenta(`Linea Tipo: ${carta.Lineatipo}`));
          log(chalk.greenBright(`Rareza: ${carta.rareza}`));
          log(chalk.yellow(`Texto Reglas: ${carta.textoReglas}`));
          log(chalk.blue(`Valor Mercado: ${carta.valorMercado}`));
          log(
            chalk.gray(
              `${carta.fuerza !== undefined ? `Fuerza: ${carta.fuerza}` : ""}`,
            ),
          );
          log(
            chalk.magenta(
              `${carta.resistencia !== undefined ? `Resistencia: ${carta.resistencia}` : ""}`,
            ),
          );
          log(
            chalk.greenBright(
              `${
                carta.marcasLealtad !== undefined
                  ? `Marcas de lealtad: ${carta.marcasLealtad}`
                  : ""
              }`,
            ),
          );
          break;
      }
    });
  }
}

/**
 * Función para mostrar la información de una carta específica de un usuario.
 * @param usuario Nombre del usuario.
 * @param id ID de la carta.
 * @throws {Error} Si no se encuentra la carta con el ID especificado.
 */
export function MostrarCarta(usuario: string, id: number): void {
  const cartas: Carta[] = CargarCartas(usuario);
  const carta = cartas.find((carta) => carta.id === id);
  if (!carta) {
    throw new Error(
      `No existe ninguna carta con ID ${id} en la colección de ${usuario}.`,
    );
  }

  log(chalk.green("Información de la carta:"));
  log(chalk.bgGray("------------------------"));
  switch (carta.color) {
    case "Azul":
      log(chalk.blue(`${ImprimirCarta(carta)}`));
      break;
    case "Rojo":
      log(chalk.red(`${ImprimirCarta(carta)}`));
      break;
    case "Blanco":
      log(chalk.white(`${ImprimirCarta(carta)}`));
      break;
    case "Verde":
      log(chalk.green(`${ImprimirCarta(carta)}`));
      break;
    case "Incoloro":
      log(chalk.grey(`${ImprimirCarta(carta)}`));
      break;
    case "Multicolor":
      log(chalk.grey(`ID: ${carta.id}`));
      log(chalk.yellow(`Nombre: ${carta.nombre}`));
      log(chalk.blue(`Costo de mana: ${carta.costeMana}`));
      log(chalk.gray(`Color: ${carta.color}`));
      log(chalk.magenta(`Linea Tipo: ${carta.Lineatipo}`));
      log(chalk.greenBright(`Rareza: ${carta.rareza}`));
      log(chalk.yellow(`Texto Reglas: ${carta.textoReglas}`));
      log(chalk.blue(`Valor Mercado: ${carta.valorMercado}`));
      log(
        chalk.gray(
          `${carta.fuerza !== undefined ? `Fuerza: ${carta.fuerza}` : ""}`,
        ),
      );
      log(
        chalk.magenta(
          `${carta.resistencia !== undefined ? `Resistencia: ${carta.resistencia}` : ""}`,
        ),
      );
      log(
        chalk.greenBright(
          `${carta.marcasLealtad !== undefined ? `Marcas de lealtad: ${carta.marcasLealtad}` : ""}`,
        ),
      );
      break;
  }
}
