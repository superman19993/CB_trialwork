import React, { useState } from "react";
import CreateCardForm from "./CreateCardForm";
import { Button } from "react-bootstrap";

const HeaderColumn = ({ columnId }: any) => {
  const [openFormCol, setOpenFormCol] = useState(false);

  const onClickFormCol = () => {
    setOpenFormCol(!openFormCol);
  };
  return (
    <>
      {openFormCol ? (
        <>
          <h2 className="hide-create" onClick={onClickFormCol}>
            -
          </h2>
          <CreateCardForm id={columnId} />
        </>
      ) : (
        <Button onClick={onClickFormCol} className="card-btn">
          +
        </Button>
      )}
    </>
  );
};

export default HeaderColumn;
