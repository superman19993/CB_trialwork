import { Card } from "react-bootstrap";

const Checklist = ({
  id,
  cardId,
  title,
  status,
}: {
  id: number;
  cardId: number;
  title: string;
  status: number;
}) => {
    
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Title>{status}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Checklist;
