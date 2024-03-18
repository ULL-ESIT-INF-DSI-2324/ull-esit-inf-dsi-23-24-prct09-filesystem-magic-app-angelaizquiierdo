import { Predicate, Mapper, Reducer } from "./tipos.js";

export abstract class AlgoritmoGenerativo {
  protected resultado: number;

  constructor(
    protected data: number[],
    protected predicate: Predicate<number>,
    protected mapper: Mapper<number, number>,
    protected reducer: Reducer<number, number>,
  ) {
    this.resultado = 0;
  }

  /**
   * Contiene las secuencias de codigo
   */
  public run(): void {
    const filteredData = this.filter(this.data, this.predicate);
    const mappedData = this.map(filteredData, this.mapper);
    const result = this.reduce(mappedData, this.reducer);
    this.resultado = result;
  }

  ObtenerResultado(): number {
    return this.resultado;
  }

  protected abstract filter(
    data: number[],
    predicado: Predicate<number>,
  ): number[];
  protected abstract map(
    data: number[],
    mapear: Mapper<number, number>,
  ): number[];
  protected abstract reduce(
    data: number[],
    reducer: Reducer<number, number>,
  ): number;

  // Hooks (métodos de enganche)
  protected afterFilter() {}
  protected afterMap() {}
  protected afterReduce() {}
}
export { Reducer, Predicate, Mapper };
