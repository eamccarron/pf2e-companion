export type Jsonify<T> = {
  [P in keyof T]: string | boolean | [];
};
