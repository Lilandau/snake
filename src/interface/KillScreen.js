import Button from "react-bootstrap/Button";
import {Modal, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {useState} from "react";


export default function KillScreen(props){
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
    
    //TODO handle Close with play new
    
    
    return(
        <>
            <Modal show={props.gameOver} onHide={handleClose} size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>GAME OVER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Button variant="primary" onClick={handleClose}>
                            Play Again
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}