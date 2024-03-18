import 'mocha';
import { expect } from 'chai';
import { Predicate, Mapper, Reducer } from "../src/tipos.js";
import { TodoAlgoritmos } from "../src/subclase.js";

describe('TodoAlgoritmos', function() {
  it('debería devolver el resultado correcto después de ejecutar el algoritmo', function() {
    const data = [1, 2, 3, 4, 5];
    const filterPredicate: Predicate<number> = (element) => element % 2 === 0;
    const mapper: Mapper<number, number> = (element) => element * 2;
    const reducer: Reducer<number, number> = (accumulator, current) => accumulator + current;

    const algorithm = new TodoAlgoritmos(data, filterPredicate, mapper, reducer);
    algorithm.run();
    const result = algorithm.ObtenerResultado();

    // Comprobamos que el resultado sea igual a 12 (el resultado esperado)
    expect(result).to.equal(12);
  });

  it('Test 2 - devuelve el resultado correcto después de ejecutar el algoritmo con datos diferentes', function() {
    const data = [62, 32, 34, 54];
    const filterPredicate: Predicate<number> = (element) => element % 2 === 0;
    const mapper: Mapper<number, number> = (element) => element * 2;
    const reducer: Reducer<number, number> = (accumulator, current) => accumulator + current;

    const algorithm = new TodoAlgoritmos(data, filterPredicate, mapper, reducer);
    algorithm.run();
    const result = algorithm.ObtenerResultado();

    // Comprobamos que el resultado sea igual a 232 (el resultado esperado)
    expect(result).to.equal(364);
  });

  it('Test 3 - reduce', function() {
    const data = [62, 32, 34, 54];
    const filterPredicate: Predicate<number> = (element) => element % 2 === 0;
    const mapper: Mapper<number, number> = (element) => element * 2;
    const reducer: Reducer<number, number> = (accumulator, current) => accumulator + current;

    const algorithm = new TodoAlgoritmos(data, filterPredicate, mapper, reducer);
    const result = algorithm.reduce(data, reducer);

    // Comprobamos que el resultado sea igual a 182 (la suma de todos los elementos)
    expect(result).to.equal(182);
  });

  it('Test 4 - map', function() {
    const data = [1, 2, 3, 4, 5];

    const filterPredicate: Predicate<number> = (element) => element % 2 === 0;
    const mapper: Mapper<number, number> = (element) => element * 2;
    const reducer: Reducer<number, number> = (accumulator, current) => accumulator + current;

    const algorithm = new TodoAlgoritmos(data, filterPredicate, mapper, reducer);
    const result = algorithm.map(data, mapper);

    // Comprobamos que el resultado sea igual a [2, 4, 6, 8, 10]
    expect(result).to.deep.equal([2, 4, 6, 8, 10]);
  });
});
