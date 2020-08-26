import React, { useState } from 'react';
import './Todo.css';
import { List, ListItem, ListItemText, Modal, Button, FormControl, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import db from './firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        margin: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();
    
    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = () => {
        // Update the Todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true });

        setOpen(false); // Close modal
    };
  
    return (
        <>  
        <Modal
            onClose={e => setOpen(false)}
            open={open}
            className={classes.modal}
        >
            <div className={classes.paper}>
                <h1>Edit Todo</h1>
                <form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                >
                    <FormControl>
                        <Input
                            onChange={event => setInput(event.target.value)}
                            value={input}
                            placeholder={props.todo.todo}
                        />
                    </FormControl>
                    <Button
                        onClick={updateTodo}
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                    >Update</Button>
                </form>
            </div>
        </Modal>
        
        <List>
            <ListItem>
                <ListItemText
                    primary={props.todo.todo}
                    secondary="Deadline ⏰"
                />
            </ListItem>
            <Button
                onClick={e => setOpen(true)}
                variant="outlined"
                color="primary"
                size="small"
            >Edit</Button>
            <IconButton aria-label="delete">
                <DeleteIcon onClick={event => {
                    db.collection('todos').doc(props.todo.id).delete()
                }}></DeleteIcon>
            </IconButton>
        </List>
        </>
        // <div>
        //     <li>{props.text}</li>
        // </div>
    )
}

export default Todo
