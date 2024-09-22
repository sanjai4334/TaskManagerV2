import React from 'react';
import { ListItem, ListItemText, IconButton, Checkbox, Chip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Draggable } from 'react-beautiful-dnd';

const TaskItem = ({ task, index, setTasks, onEditTask }) => {
  const toggleComplete = () => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = () => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => onEditTask(task)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={deleteTask}>
                <Delete />
              </IconButton>
            </>
          }
        >
          <Checkbox checked={task.completed} onChange={toggleComplete} />
          <ListItemText
            primary={task.title}
            secondary={
              <>
                {task.category && <Chip label={task.category} size="small" sx={{ mr: 1 }} />}
                {task.priority && <Chip label={task.priority} size="small" sx={{ mr: 1 }} color="primary" />}
                {task.dueDate && (
                  <Chip
                    label={new Date(task.dueDate).toLocaleDateString()}
                    size="small"
                    sx={{ mr: 1 }}
                    color="secondary"
                  />
                )}
              </>
            }
          />
        </ListItem>
      )}
    </Draggable>
  );
};

export default TaskItem;
