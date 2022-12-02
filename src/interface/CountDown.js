import {useEffect, useState} from "react";
import './CountDown.css';


export default function CountDown(props) {

    const [countdown, setCountdown] = useState(3);


    useEffect(()=>{
        setCountdown(props.countdown)
    },[props.countdown]);
    
    return (
        <div className="fade-in" hidden={!props.show}>
            <p>countDown: {countdown}</p>            
        </div>
    );


}