import React, { useState, useMemo, useEffect } from "react";
import { DragDropContext, Droppable, Draggable,} from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import CreateCol from "./CreateCol";
import Colum from "./Colum";
// import { useLocalStorage } from 'react-use';
// import { useSelector } from 'react-redux';
import './Colums.scss'
import {useGetColumnsQuery, useUpdateColumnMutation, useUpdateColumnNotRenderMutation} from '../../api/apiSlice'

const Colums = () => {
    const [updateCol] = useUpdateColumnMutation();
    const [updateColNotRender] = useUpdateColumnNotRenderMutation();
    const [maxSortVal, updateMaxSortVal] = useState(0)
    const { 
        data: cols = [],
    } = useGetColumnsQuery();
    
    const [stateCols, editStateCols] = useState([])

    useEffect(()=>{
        
        editStateCols(cols)
        
    },[cols])

    // sort cols
    const filteredColsSelector = useMemo(() => {
        const filteredCols = stateCols.slice();

        filteredCols.sort((a, b) => (a.sort > b.sort) ? 1 : -1)

        return filteredCols
    }, [stateCols])

    

    useEffect(()=>{
        let newMaxSortVal = maxSortVal;

        filteredColsSelector.map(item => {
            if(item.sort > newMaxSortVal){
                newMaxSortVal = item.sort; 
            }
        })

        updateMaxSortVal(newMaxSortVal)
    },[cols])
    
    const columReorder = (result) =>{ 
        let oldCols = Array.from(filteredColsSelector)
        let sourceCol =  {
            ...oldCols[result.source.index],
            sort: oldCols[result.destination.index].sort
        }
        let destinationCol =  {
            ...oldCols[result.destination.index],
            sort: oldCols[result.source.index].sort
        }

        // фільтрую стейт
        oldCols = oldCols.map(item => {
            if(item.id === oldCols[result.source.index].id){
                return item = {
                    ...item,
                    sort: oldCols[result.destination.index].sort
                }
            }
            if(item.id === oldCols[result.destination.index].id){
                return item = {
                    ...item,
                    sort: oldCols[result.source.index].sort
                }
            }
            return item
        })

        editStateCols(oldCols)

        // змінюєм на сервері
        let colId = sourceCol.id
        let newCol = sourceCol
        updateColNotRender({colId, newCol}).then(()=>{
            colId = destinationCol.id
            newCol = destinationCol
            updateCol({colId, newCol})
        })

        
    }

    const listReorder = (result) => {
        let columsState = Array.from(filteredColsSelector)
        const sourceId = result.source.droppableId
        const destinationId = result.destination.droppableId
      
        // в тій самій колонці
        if(sourceId === destinationId){
            
            columsState = columsState.map((col)=>{
                if(col.id.toString() === result.source.droppableId){
                    let items = [...col.items]
                    const [reorderedItem] = items.splice(result.source.index, 1);
                    items.splice(result.destination.index, 0, reorderedItem);
                    
                   
                    let colId = col.id
                    let newCol = {
                        ...col,
                        items: items
                    }

                    updateCol({colId, newCol})
                    return newCol
                }
                return col
            })

        }else{
            let item;

            // видаляємо із старої колонки
            columsState = columsState.map((col)=>{
                if(col.id.toString() === result.source.droppableId){
                    let items = [...col.items]
                   
                    item = items[result.source.index]
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    let colId = col.id
                    let newCol = {
                        ...col,
                        items: items
                    }

                    updateCol({colId, newCol})
                    return newCol
                }
                return col
            })

            // додаємо в нову
            columsState = columsState.map((col, index) => {
                if(col.id.toString() == destinationId){
                    let items = [...col.items]
                    items.splice(result.destination.index, 0, item);

                    let colId = col.id
                    let newCol = {
                        ...col,
                        items: items
                    }
                    updateCol({colId, newCol})

                    return newCol;
                }
                return col
            });
        }
        console.log(columsState)
        editStateCols(columsState)
    }
    
    function onDragEnd(result) {
        
        if (!result.destination) return;

        switch (result.type){
            case "COLUMN": 
                columReorder(result)
                break;
            case "LIST": 
                listReorder(result)
                break;
            default: 
                console.log('default')
        }
            
    }

    const changeColName = (newColumnName, colId) =>{
        let newCol = cols.filter(item=>item.id === colId)
        newCol = newCol[0]
        newCol = {
            ...newCol,
            columnName: newColumnName
        }

        updateCol({colId, newCol})

        // updateCols(
        //     cols.map(item => 
        //         item.id === colId 
        //         ? {...item, columnName : newColumnName} 
        //         : item 
        // ))
    }

    const changeItemStatus = (colId, itemId) => {
       
        function editItem(items, itemId) {
            let newItems = items.map(item => {
                if(item.id === itemId){
                    return {...item, statusActive: !item.statusActive}
                }
                return item
            })

            return newItems;
        }

        let newCol = cols.filter(item=>item.id === colId)
        newCol = newCol[0]
        newCol = {
            ...newCol,
            items: editItem(newCol.items, itemId)
        }
        
        updateCol({colId, newCol})

        // updateCols(
        //     cols.map(
        //         item => 
        //             item.id === colId 
        //             ? {...item, items : editItem(item.items, itemId)} 
        //             : item                 
        // ))
    }

    const deleteItem = (colId, itemId) => {
        let newCol = cols.filter(item=>item.id === colId)
        newCol = newCol[0]
        newCol = {
            ...newCol,
            items: newCol.items.filter(item => item.id != itemId)
        }
        updateCol({colId, newCol})
    }

    const createItem = (name, colId) => {
        
        const newItem = {
            id: uuidv4(),
            name: name,
            statusActive: false, 
        } 
        let newCol = cols.filter(item=>item.id === colId)
        newCol = newCol[0]
        newCol = {
            ...newCol,
            items: [...newCol.items, newItem]
        }
        updateCol({colId, newCol})
        // updateCols(
        //     cols.map(
        //         item => 
        //             item.id === colId 
        //             ? {...item, items: [...item.items, newItem]} 
        //             : item                 
        // ))
    }

    // const createCol = (name) => {
    //     const newId = uuidv4()
    //     let newCol = {
    //         columnName: name,
    //         id: newId,
    //         items: []
    //     } 

    //     // updateCols([...cols, newCol])
    // }

    return(
        <>
        <CreateCol maxSortVal={maxSortVal} updateMaxSortVal={updateMaxSortVal}/>

        <div className="overlay">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="board"
                    type="COLUMN"
                    direction="horizontal"
                >
                {provided => (
                    <div className="column__wrap" ref={provided.innerRef} {...provided.droppableProps}>
                        {
                            filteredColsSelector.map(({id, columnName, items}, index) => {
                                return(
                                    <Colum key={id} id={id} columnName={columnName} index={index} items={items} 
                                    changeColName={changeColName} 
                                    changeItemStatus={changeItemStatus} 
                                    deleteItem={deleteItem} 
                                    createItem={createItem}/>
                                )
                            })
                        }
                       
                        {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
        </div>
        </>
    )
} 

export default Colums;
