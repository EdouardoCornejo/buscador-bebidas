import { useContext } from "react";
import CategoriasContext from "../context/Categorias.Provider";

/**
 * UseCategorias() is a function that returns the useContext(CategoriasContext) function.
 * @returns The useContext hook is being used to return the CategoriasContext.
 */
const useCategorias = () => {
  return useContext(CategoriasContext);
};

/* Exporting the useCategorias function. */
export default useCategorias;
