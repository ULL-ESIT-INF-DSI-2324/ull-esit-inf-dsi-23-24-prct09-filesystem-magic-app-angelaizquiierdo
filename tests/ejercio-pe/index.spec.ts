import "mocha";
import { expect } from "chai";
import { Predicate, Mapper, Reducer } from "../../src/Ejercicio-pe/clasebase.js";
import { TodoAlgoritmos } from "../../src/Ejercicio-pe/subclase.js";

describe("TodoAlgoritmos", function () {
  it("debería devolver el resultado correcto después de ejecutar el algoritmo", function () {
    const data = [1, 2, 3, 4, 5];
    const filterPredicate: Predicate<number> = (element) => element % 2 === 0;
    const mapper: Mapper<number, number> = (element) => element * 2;
    const reducer: Reducer<number, number> = (accumulator, current) =>
      accumulator + current;

    const algorithm = new TodoAlgoritmos(
      data,
      filterPredicate,
      mapper,
      reducer,
    );
    algorithm.run();
    const result = algorithm.ObtenerResultado();

    // Comprobamos que el resultado sea igual a 12 (el resultado esperado)
    expect(result).to.equal(12);
  });

  it("Test 2 - devuelve el resultado correcto después de ejecutar el algoritmo con datos diferentes", function () {
    const data = [62, 32, 34, 54];
    const filterPredicate: Predicate<number> = (element) => element % 2 === 0;
    const mapper: Mapper<number, number> = (element) => element * 2;
    const reducer: Reducer<number, number> = (accumulator, current) =>
      accumulator + current;

    const algorithm = new TodoAlgoritmos(
      data,
      filterPredicate,
      mapper,
      reducer,
    );
    algorithm.run();
    const result = algorithm.ObtenerResultado();

    // Comprobamos que el resultado sea igual a 232 (el resultado esperado)
    expect(result).to.equal(364);
  });

  it("Test 3 - reduce", function () {
    const data = [62, 32, 34, 54];
    const filterPredicate: Predicate<number> = (element) => element % 2 === 0;
    const mapper: Mapper<number, number> = (element) => element * 2;
    const reducer: Reducer<number, number> = (accumulator, current) =>
      accumulator + current;

    const algorithm = new TodoAlgoritmos(
      data,
      filterPredicate,
      mapper,
      reducer,
    );
    const result = algorithm.reduce(data, reducer);

    // Comprobamos que el resultado sea igual a 182 (la suma de todos los elementos)
    expect(result).to.equal(182);
  });

  it("Test 4 - map", function () {
    const data = [1, 2, 3, 4, 5];

    const filterPredicate: Predicate<number> = (element) => element % 2 === 0;
    const mapper: Mapper<number, number> = (element) => element * 2;
    const reducer: Reducer<number, number> = (accumulator, current) =>
      accumulator + current;

    const algorithm = new TodoAlgoritmos(
      data,
      filterPredicate,
      mapper,
      reducer,
    );
    const result = algorithm.map(data, mapper);

    // Comprobamos que el resultado sea igual a [2, 4, 6, 8, 10]
    expect(result).to.deep.equal([2, 4, 6, 8, 10]);
  });

  it(" Test 5 - predicado", () => {
    const data = [46, 9, 4, 18, 30];

    const filterPredicate: Predicate<number> = (element) => element % 3 === 0;
    const mapper: Mapper<number, number> = (element) => element * 2;
    const reducer: Reducer<number, number> = (accumulator, current) =>
      accumulator + current;

    const algorithm = new TodoAlgoritmos(
      data,
      filterPredicate,
      mapper,
      reducer,
    );
    const result = algorithm.filter(data, filterPredicate);

    // Comprobamos que el resultado sea igual a [2, 4, 6, 8, 10]
    expect(result).to.deep.equal([9, 18, 30]);
  });

  it("Test 6 - Operación de mapeo con datos negativos", function () {
    const data = [-1, -2, -3, -4, -5];

    const filterPredicate: Predicate<number> = (element) => element % 2 === 0;
    const mapper: Mapper<number, number> = (element) => element * 2;
    const reducer: Reducer<number, number> = (accumulator, current) =>
      accumulator + current;

    const algorithm = new TodoAlgoritmos(
      data,
      filterPredicate,
      mapper,
      reducer,
    );
    const result = algorithm.map(data, mapper);

    // Comprobamos que el resultado sea igual a [-2, -4, -6, -8, -10]
    expect(result).to.deep.equal([-2, -4, -6, -8, -10]);
  });

  it("Test 7 - Operación de reducción con datos negativos", function () {
    const data = [-1, -2, -3, -4, -5];

    const filterPredicate: Predicate<number> = (element) => element % 2 === 0;
    const mapper: Mapper<number, number> = (element) => element * 2;
    const reducer: Reducer<number, number> = (accumulator, current) =>
      accumulator + current;

    const algorithm = new TodoAlgoritmos(
      data,
      filterPredicate,
      mapper,
      reducer,
    );
    const result = algorithm.reduce(data, reducer);

    // Comprobamos que el resultado sea igual a -15 (la suma de todos los elementos)
    expect(result).to.equal(-15);
  });

  it("Test 8 - Operación de filtrado con datos mixtos", function () {
    const data = [1, -2, 3, -4, 5];

    const filterPredicate: Predicate<number> = (element) => element > 0;
    const mapper: Mapper<number, number> = (element) => element * 2;
    const reducer: Reducer<number, number> = (accumulator, current) =>
      accumulator + current;

    const algorithm = new TodoAlgoritmos(
      data,
      filterPredicate,
      mapper,
      reducer,
    );
    const result = algorithm.filter(data, filterPredicate);

    // Comprobamos que el resultado sea igual a [1, 3, 5]
    expect(result).to.deep.equal([1, 3, 5]);
  });
});
