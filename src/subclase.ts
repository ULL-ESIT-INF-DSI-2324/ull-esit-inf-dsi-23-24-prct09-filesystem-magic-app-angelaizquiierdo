import { AlgoritmoGenerativo } from "./clasebase.js";
import { Predicate, Mapper, Reducer } from "./tipos.js";

export class TodoAlgoritmos extends AlgoritmoGenerativo {
  filter(data: number[], predicate: Predicate<number>): number[] {
    console.log("Filtering data...");
    const filteredData: number[] = [];
    for (const element of data) {
      if (predicate(element)) {
        filteredData.push(element);
      }
    }
    this.afterFilter();
    return filteredData;
  }

  /**
   *
   * @param data
   * @param mapper
   * @returns
   */
  map(data: number[], mapper: Mapper<number, number>): number[] {
    console.log("Mapping data...");
    const mappedData: number[] = [];
    for (const element of data) {
      mappedData.push(mapper(element));
    }
    this.afterMap();
    return mappedData;
  }

  /**
   * Este método es el que se encarga de realizar la operacion de Reduce
   * @param data los datos de forma array
   * @param reducer contiene los valores
   * @returns devuelte el resultado de la operación
   */
  reduce(data: number[], reducer: Reducer<number, number>): number {
    console.log("Reducing data...");
    let result: number = data[0];
    for (let i = 1; i < data.length; i++) {
      result = reducer(result, data[i]);
    }
    this.afterReduce();
    return result; // Devolver el valor acumulado final, no un arreglo de un solo elemento
  }
}

export { Reducer, Predicate, Mapper };
