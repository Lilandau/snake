import {useEffect, useState} from "react";
import './CountDown.css';


export default function CountDown(props) {

    let [countdown, setCountdown] = useState(3);


    useEffect(() => {
        if (props.show) {
            setCountdown(3);
            const intervalID = setInterval(() => {
                updateCounter();
                if (countdown === -1) {
                    props.setPlayCountdown(false);
                    props.setNewGame(true);

                }
            }, 2000);

            return () => clearInterval(intervalID);
        }
    }, [props.show])

    function updateCounter() {
        setCountdown(countdown--);
    }

    useEffect(()=>{
        setCountdown(props.countdown)
    },[props.countdown]);
    
    return (
        <div className="fade-in" hidden={!props.show}>
            <p>countDown: {countdown}</p>            
        </div>
    );


}