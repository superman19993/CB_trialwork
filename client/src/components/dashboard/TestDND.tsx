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
import HeaderColumn from "./HeaderColumn";
import { changeCardForCol } from "../../redux/slices/card";

interface ICard {
  card_id: number;
  title: string;
  description: string;
  percentage: number;
}

export interface IColumn {
  [key: string]: {
    id: number;
    workspaceid: string;
    column_name: string;
    cards: ICard[];
  };
}

function DND({ columnsProp }: { columnsProp: IColumn }) {
  const dispatch = useDispatch();

  const onDragEnd = async (result: any, columns: any, setColumns: any) => {
    const srcColId = result.source.droppableId;
    const destColId = result.destination.droppableId;
    const wid = localStorage.getItem("wid");
    if (srcColId !== destColId) {
      const srcColumns = columns[srcColId];
      const srcCards = [...srcColumns.cards];
      const [removed] = srcCards.splice(result.source.index, 1);
      const cardId = removed.card_id;
      await dispatch(changeCardForCol({ destColId, cardId, wid }));
      await dispatch(fetchColumns(wid));
    }
  };
  const [columns, setColumns] = useState(columnsProp);

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
                <Card className="card-collumn" key={columnId}>
                  <Card.Body>
                    <ModalTest
                      colName={column.column_name}
                      columnId={columnId}
                      column={column}
                    />

                    <HeaderColumn columnId={columnId} />

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
