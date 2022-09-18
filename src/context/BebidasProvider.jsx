import { useState, useEffect, createContext } from "react";
import axios from "axios";

/* It's creating a context. */
const BebidasContext = createContext();

/* It's a function that takes in a parameter called children. It's returning the
BebidasContext.Provider component with the value of the state variables. */
const BebidasProvider = ({ children }) => {
  /* Creating a state for each of the variables. */
  const [bebidas, setBebidas] = useState([]);
  const [modal, setModal] = useState(false);
  const [bebidaId, setBebidaId] = useState(null);
  const [receta, setReceta] = useState({});
  const [cargando, setCargando] = useState(false);

  /* A hook that is called when the component is mounted and when the component is updated. */
  useEffect(() => {
    setCargando(true);
    const obtenerReceta = async () => {
      if (!bebidaId) return;

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;

        const { data } = await axios(url);
        setReceta(data.drinks[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };
    obtenerReceta();
  }, [bebidaId]);

  /**
   * The function consultarBebidas is an async function that takes in a parameter called datos. It then
   * tries to make a request to the url, and if it's successful, it sets the state of bebidas to the
   * data.drinks property of the response. If it fails, it logs the error to the console.
   */
  const consultarBebidas = async (datos) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;

      const { data } = await axios(url);
      setBebidas(data.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * When the user clicks on the modal, the modal will toggle between true and false.
   */
  const handleModalClick = () => {
    setModal(!modal);
  };

  /**
   * When the user clicks on a button, set the state of the bebidaId to the id of the button that was
   * clicked.
   */
  const handleBebidaIdClick = (id) => {
    setBebidaId(id);
  };

  /* It's returning the BebidasContext.Provider component with the value of the state variables. */
  return (
    <BebidasContext.Provider
      value={{
        consultarBebidas,
        bebidas,
        handleModalClick,
        modal,
        handleBebidaIdClick,
        receta,
        cargando,
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

/* It's exporting the BebidasProvider component and the BebidasContext. */
export { BebidasProvider };

export default BebidasContext;
