import { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "../../css/card/checklist.css";
import { updateStatus } from "../../redux/slices/checklist";

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
  const [checked, setChecked] = useState(status == 0 ? false : true);

  const dispatch= useDispatch();

  const onClickChangeStatus = async () => {
    console.log(id, cardId, title, status);
    setChecked(!checked);
    status= checked? 0:1;
    const updateForm= { id, status };
    console.log(updateForm);
    await dispatch(updateStatus(updateForm));
  };

  const handleInputChange = (e: any) =>{
    if (e.key =='Enter')
    { 
      console.log("ok");
    }
  }

  return (
    <Card className="border">
      <Card.Body>
        <Card.Title className="check-list" contentEditable="true" onInput={(e: any) => handleInputChange(e)}>
          {title}
        </Card.Title>
        <Card.Title style={{ float: "right" }}>
          <input
            type="checkbox"
            defaultChecked={checked}
            onChange={onClickChangeStatus}
          />
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Checklist;
