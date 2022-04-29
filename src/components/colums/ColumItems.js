import React, { useState } from "react";
import { Board, DragDropContext, Droppable, Draggable, Column } from "react-beautiful-dnd";
import { Container, Row, Col } from "react-bootstrap";

import './Colums.scss'

const ColumItems = ({colId, columnName, items, changeItemStatus, deleteItem}) => {

    const handeleChangeItemStatus = (colId, itemId) => {
        changeItemStatus(colId, itemId)
    }

    return(
        <Droppable
            droppableId={colId}
            type="LIST"
        >
        {provided => (
            <div className="column__list" ref={provided.innerRef} {...provided.droppableProps}>
                {
                    items.map(({id, name, statusActive}, index) => {
                        let itemClassName = 'column__item';
                        if(statusActive){
                            itemClassName += ' active'
                        }

                        return(
                            <Draggable draggableId={id} index={index} key={id}>
                                {(provided, snapshot) => (
                                    
                                    
                                    <div className={itemClassName} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        {name}
                                        <div className="column__item__bot">
                                            <button className="btn btn-danger" onClick={() => deleteItem(colId, id)}>Delete</button>
                                            <button className="btn btn-primary" onClick={() => handeleChangeItemStatus(colId, id)}>Change</button>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        )
                    })
                }
                {provided.placeholder}
            </div>
        )}
        </Droppable>
    )
}

export default ColumItems;