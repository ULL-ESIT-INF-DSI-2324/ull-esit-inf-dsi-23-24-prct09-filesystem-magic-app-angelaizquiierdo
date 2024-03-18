// Definición del tipo Predicate
export type Predicate<T> = (element: T) => boolean;

// Definición del tipo Mapper
export type Mapper<T, U> = (element: T) => U;

// Definición del tipo Reducer
export type Reducer<T, U> = (accumulator: U, current: T) => U;
