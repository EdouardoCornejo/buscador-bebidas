import { Col, Card, Button } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";

/* A function that receives a prop called bebida. */
const Bebida = ({ bebida }) => {
  /* Destructuring the useBebidas() hook. */
  const { handleModalClick, handleBebidaIdClick } = useBebidas();

  /**
   * ModalClick() is a function that calls handleModalClick() and handleBebidaIdClick() with the argument
   * bebida.idDrink.
   */
  const modalClick = () => {
    handleModalClick();
    handleBebidaIdClick(bebida.idDrink);
  };

  return (
    <Col md={2} lg={3}>
      <Card className="mb-4 mt-4">
        <Card.Img
          variant="top"
          src={bebida.strDrinkThumb}
          alt={`Imagen de ${bebida.srtDrink}`}
        />
        <Card.Body>
          <Card.Title className="text-center">{bebida.strDrink}</Card.Title>
          <Button
            variant={"warning"}
            className="w-100 mt-2"
            onClick={modalClick}
          >
            Ver Receta
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

/* Exporting the Bebida component. */
export default Bebida;
