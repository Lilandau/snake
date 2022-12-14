import Button from "react-bootstrap/Button";
import {Modal, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import './Home.css';


export default function NewGameDialog(props){

    const [show, setShow] = useState(true);
    const [value, setValue] = useState([1, 3]);

    useEffect(()=>{
        console.log("showNewGameDialog was changed in Modal")
        if(props.showNewGameDialog){
            handleShow();
        }
        else{
            setShow(false);
        }
    },[props.showNewGameDialog]);


    function handleShow(){
        setShow(true);
        props.handleStop();
    }

    function handleClose(){
        setShow(false);
        props.startNewGame();
    }

    function handleChange(val){
        setValue(val);
        console.log("option: "+ val+ "was selected.")
        onChoseSpeed(val);
    }

    function onChoseSpeed(val){
        console.log("speed changed to "+ val+ " in Home");
        props.onChoseSpeed(val);
    }
    
    return (
        <>
            <Button variant="primary" onClick={handleShow} className='newGameButton'>
                NEW GAME
            </Button>

            <Modal show={show} onHide={handleClose} size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Play Snake</Modal.Title>
                </Modal.Header>
                <Modal.Body>Choose your speed
                    <div>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={2} onChange={handleChange}>
                        <ToggleButton id="tbg-radio-1" value={500}>
                            slow
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-2" value={350}>
                            normal
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-3" value={100}>
                           fast
                        </ToggleButton>
                    </ToggleButtonGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Play
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );



}