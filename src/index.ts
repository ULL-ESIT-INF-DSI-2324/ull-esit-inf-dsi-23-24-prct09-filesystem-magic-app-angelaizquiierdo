import { Reducer, Mapper, Predicate } from "./clasebase.js";
import { TodoAlgoritmos } from "./subclase.js";

const data = [1, 2, 3, 4, 5];
const filterPredicate: Predicate<number> = (element) => element % 2 === 0;
const mapper: Mapper<number, number> = (element) => element * 2;
const reducer: Reducer<number, number> = (accumulator, current) =>
  accumulator + current;

const algorithm = new TodoAlgoritmos(data, filterPredicate, mapper, reducer);
algorithm.run();
const result = algorithm.ObtenerResultado();
console.log(`Resultado: ${result}`);
