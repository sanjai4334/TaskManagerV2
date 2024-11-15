import React from 'react';
import { List } from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTasks, onEditTask }) => {
  return (
    <List>
      {tasks.map((task, index) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          index={index} 
          setTasks={setTasks} 
          onEditTask={onEditTask} 
        />
      ))}
    </List>
  );
};

export default TaskList;