import React, { useState } from "react";
import DeleteCollumn from "./DeleteCollumn";
import UpdateColumnForm from "./UpdateColumnForm";
import { Row, Col, Card } from "react-bootstrap";

const ModalTest = ({ colName, columnId, column }: any) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onClickDeleteCollumn = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const onClickUpdateCollumn = () => {
    setOpenUpdateModal(!openUpdateModal);
  };

  return (
    <div key={columnId}>
      {openDeleteModal ? <DeleteCollumn id={columnId} /> : null}
      {openUpdateModal ? (
        <UpdateColumnForm colId={columnId} title={column.column_name} />
      ) : null}
      <Row>
        <Col>
          <Card.Title onClick={onClickUpdateCollumn}>{colName}</Card.Title>
        </Col>
        <Col>
          <Card.Title style={{ float: "right" }} onClick={onClickDeleteCollumn}>
            x
          </Card.Title>
        </Col>
      </Row>
    </div>
  );
};

export default ModalTest;
