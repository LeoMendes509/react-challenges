import { useState } from "react";
import "./Counter.css"

function Counter() {
    // Estado do contador (começa em 0)
    const [count , setCount] = useState(0);
    
    function increment() {
        setCount(prev => prev + 1);
    }

    function decrement() {
        setCount(prev => (prev > 0 ? prev - 1 : 0));
    }

    function reset() {
        setCount(0);
    }

    return (
        <div className="counter-card">
            <h2>Counter</h2>

            <p className="count-value">{count}</p>

            <div className="buttons">
                <button onClick={decrement}>-1</button>
                <button onClick={reset}>Reset</button>
                <button onClick={increment}>+1</button>
            </div>
        </div>
    );

}


export default Counter;