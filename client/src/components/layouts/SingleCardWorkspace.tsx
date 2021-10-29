import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchColumns } from "../../redux/slices/collumns";
import { chooseWorkspace } from "../../redux/slices/workspace";
import { RootState } from "../../redux/store";
import ModalDelete from "../common/ModalDelete";
import ModalUpdate from "../common/ModalUpdate";

const SingleCardWorkspace = ({ workspace }: { [key: string]: any }) => {
  const dispatch = useDispatch();

  const workspaceState = useSelector((state: RootState) => state.workspaces);

  const findWorkspace = async (e: any, wid: any) => {
    const bodyData = { wid, workspaces: workspaceState.workspaces };
    await dispatch(chooseWorkspace(bodyData));
    localStorage.setItem("wid", wid);
    await dispatch(fetchColumns(wid));
  };

  const [showModalDelete, setShowModalDelete] = useState(false);

  const onClickDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const onClickUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
  };
  return (
    <>
      {showModalDelete ? (
        <ModalDelete id={workspace.id} category={"workspaces"} />
      ) : null}
      {showModalUpdate ? (
        <ModalUpdate category={"workspaces"} categoryObj={workspace} />
      ) : null}

      <Card className="cardw-side">
        <Card.Header className="card-wp">
          <Card.Text className="icon-update" onClick={onClickUpdate}>
            <FontAwesomeIcon icon={faEdit} />
          </Card.Text>
          <Card.Text className="icon-delete" onClick={onClickDelete}>
            <FontAwesomeIcon icon={faTimes} />
          </Card.Text>
        </Card.Header>
        <Card.Body className="card-position">
          <Card.Link
            onClick={(e: any) => {
              findWorkspace(e, workspace.id);
            }}
            to="/dashboard"
            as={Link}
          >
            {workspace.workspace_name}
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleCardWorkspace;
