import React, { useState } from "react";
import DeleteCollumn from "./DeleteCollumn";
import UpdateColumnForm from "./UpdateColumnForm";

const ModalTest = ({ columnId, column }: any) => {
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
      <div onClick={onClickUpdateCollumn}>update</div>
    </div>
  );
};

export default ModalTest;
