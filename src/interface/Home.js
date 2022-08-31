import Button from "react-bootstrap/Button";
import {Modal, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {useState} from "react";
import './Home.css';


export default function Home(props){
    const [show, setShow] = useState(true);

    const handleShow = () => setShow(true);
    const [value, setValue] = useState([1, 3]);

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
            <Button variant="primary" onClick={handleShow} className='homeButton'>
                Home
            </Button>

            <Modal show={show} onHide={handleClose} size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Play Snake</Modal.Title>
                </Modal.Header>
                <Modal.Body>Chose your speed
                    <div>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={2} onChange={handleChange}>
                        <ToggleButton id="tbg-radio-1" value={1000}>
                            slow
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-2" value={500}>
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