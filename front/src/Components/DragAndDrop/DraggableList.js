import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const DraggableList = ({ droppableId, children, ...props }) => {
    return (
        <Droppable droppableId={`${droppableId}`}>
            {(provided) => (
                <div
                    {...props}
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {React.Children.map(children, (child, index) => (
                        <Draggable key={index} draggableId={`${droppableId}-${index}`} index={index}>
                            {(provided) => (
                                <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}>
                                    {child}
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DraggableList;