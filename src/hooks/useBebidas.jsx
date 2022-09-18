import { useContext } from "react";
import BebidasConext from "../context/BebidasProvider";

/**
 * UseBebidas() is a function that returns the value of the BebidasConext
 * @returns The context object.
 */
const useBebidas = () => {
  return useContext(BebidasConext);
};

/* Exporting the function `useBebidas` so that it can be imported into other files. */
export default useBebidas;
