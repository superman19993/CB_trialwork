import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CardDetail from "./CardDetail";
import DeleteCardForm from "./DeleteCardForm";
import UpdateCardForm from "./UpdateCardForm";
import { fetchChecklists } from "../../redux/slices/checklist";
import { chooseCard } from "../../redux/slices/card";
import { addAbortSignal } from "stream";

const CardKanban = ({
  colId,
  id,
  title,
  description,
}: {
  colId: number | string;
  id: number;
  title: string;
  description: string;
}) => {
  const checklist = useSelector((state: RootState) => state.checklists);
  const user= useSelector((state:RootState)=> state.user)
  const usersCards= useSelector((state:RootState)=> state.users_cards);
  const card = {
    colId,
    id,
    card_name: title,
    card_description: description,
    checklists: checklist.checklists,
    users: usersCards.users,
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onClickDeleteCard = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const [updateCardModal, setUpdateCardModal] = useState(false);

  const [cardDetailModal, setCardDetailModal] = useState(false);

  const onClickUpdateCard = () => {
    setUpdateCardModal(!updateCardModal);
  };

  const dispatch = useDispatch();
  const findCard = async (e: any, id: number) => {
    await dispatch(chooseCard(id));
    await dispatch(fetchChecklists(id));
    setCardDetailModal(!cardDetailModal);
  };

  const aliasDesc =
    description.length > 20 ? description.substring(0, 20) : description;

  return (
    <>
      {updateCardModal ? (
        <UpdateCardForm
          colId={colId}
          id={id}
          title={title}
          description={description}
        />
      ) : null}
      {cardDetailModal ? <CardDetail card={card} /> : null}
      {openDeleteModal ? <DeleteCardForm id={id} /> : null}
      <Card className="card-kanban">
        <Card.Body>
          <Card.Title
            onClick={onClickUpdateCard}
            className="card-kanban-header"
          >
            {title}
          </Card.Title>
          <Card.Title
            onClick={onClickDeleteCard}
            className="card-kanban-delete"
          >
            X
          </Card.Title>
          <Card.Text
            onClick={(e: any) => {
              findCard(e, id);
            }}
            className="card-kanban-content"
          >
            {aliasDesc}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardKanban;
