import { useState, useEffect, createContext } from "react";
import axios from "axios";

/* Creating a context object. */
const CategoriasContext = createContext();

/* A function that is returning a component. */
const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  /**
   * When the component mounts, call the obtenerCategorias function, which will make an API call to
   * thecocktaildb.com, and set the state of the categorias array to the data returned from the API call.
   */
  const obtenerCategorias = async () => {
    try {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
      const { data } = await axios(url);
      setCategorias(data.drinks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    /* Passing the state of categorias to the children of the component. */
    <CategoriasContext.Provider
      value={{
        categorias,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};

/* Exporting the CategoriasProvider component and the CategoriasContext object. */
export { CategoriasProvider };

export default CategoriasContext;
