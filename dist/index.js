import { TodoAlgoritmos } from "./subclase.js";
const data = [1, 2, 3, 4, 5];
const filterPredicate = (element) => element % 2 === 0;
const mapper = (element) => element * 2;
const reducer = (accumulator, current) => accumulator + current;
const algorithm = new TodoAlgoritmos(data, filterPredicate, mapper, reducer);
algorithm.run();
const result = algorithm.ObtenerResultado();
console.log(`Resultado: ${result}`);
//# sourceMappingURL=index.js.map