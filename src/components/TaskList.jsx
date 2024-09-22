import React from 'react';
import { List } from '@mui/material';
import TaskItem from './TaskItem';
import { Droppable } from 'react-beautiful-dnd';

const TaskList = ({ tasks, setTasks, onEditTask }) => {
  return (
    <Droppable droppableId="taskList">
      {(provided) => (
        <List {...provided.droppableProps} ref={provided.innerRef}>
          {tasks.map((task, index) => (
            <TaskItem key={task.id} task={task} index={index} setTasks={setTasks} onEditTask={onEditTask} />
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default TaskList;
