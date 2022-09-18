import { Row } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
import Bebida from "./Bebida";

/**
 * The ListadoBebidas function returns a Row component that contains a Bebida component for each bebida
 * in the bebidas array.
 * @returns A function that returns a Row component with a list of Bebida components.
 */
const ListadoBebidas = () => {
  const { bebidas } = useBebidas();
  return (
    <Row>
      {bebidas.map((bebida) => (
        <Bebida key={bebida.idDrink} bebida={bebida} />
      ))}
    </Row>
  );
};

/* Exporting the ListadoBebidas function so that it can be imported by other files. */
export default ListadoBebidas;
