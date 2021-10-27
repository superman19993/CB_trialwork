import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { Card, Button, Spinner } from "react-bootstrap";
import "../../css/card/card.css";
import CreateCardForm from "./CreateCardForm";
import CardKanban from "./CardKanban";
import { fetchColumns } from "../../redux/slices/collumns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import DeleteCollumn from "./DeleteCollumn";
import UpdateColumnForm from "./UpdateColumnForm";
import ModalTest from "./Modal";

interface ICard {
  card_id: number;
  title: string;
  description: string;
}

export interface IColumn {
  [key: string]: {
    id: number;
    workspaceid: string;
    column_name: string;
    cards: ICard[];
  };
}

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  console.log(result);
  console.log(columns);
};

function DND({ columnsProp }: { columnsProp: IColumn }) {
  const [columns, setColumns] = useState(columnsProp);
  const [openFormCol, setOpenFormCol] = useState(false);

  const onClickFormCol = () => {
    setOpenFormCol(!openFormCol);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onClickDeleteCollumn = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const onClickUpdateCollumn = () => {
    setOpenUpdateModal(!openUpdateModal);
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <>
                <ModalTest columnId={columnId} column={column} />
                <Card className="card-collumn" key={columnId}>
                  <Card.Body>
                    <Card.Title style={{ float: "right" }}>x</Card.Title>
                    <Card.Title onClick={onClickUpdateCollumn}>
                      {column.column_name}
                    </Card.Title>

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
                    <div className="scroll">
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "transparent",
                                minHeight: 500,
                              }}
                            >
                              {column.cards.map((item: any, index: any) => {
                                return (
                                  <Draggable
                                    key={item.card_id}
                                    draggableId={item.card_id.toString()}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            backgroundColor: snapshot.isDragging
                                              ? "transparent"
                                              : "transparent",
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          <CardKanban
                                            key={item.card_id}
                                            colId={columnId}
                                            id={item.card_id}
                                            title={item.title}
                                            description={item.description}
                                          />
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    </div>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default DND;
