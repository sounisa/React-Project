import { useRef } from "react";

export default function AddNewItem({ setQty, qty, setNewItem, addToList, isPlaceholder }) {
    
    const inputRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputValue = inputRef.current.value;
        //console.log(inputValue);
        setNewItem(inputValue)
    }

    const handleIncrease = () => {
        setQty(qty + 1);
    }

    const handleDecrease = () => {
        setQty(qty - 1);
    }

    const handleQtyChange = (e) => {
        const inputQty = parseInt(e.target.value);
        if (isNaN(inputQty)) {
            setQty(0);
        } else {
            setQty(inputQty);
        }
        //console.log(inputQty)
    }

    const handleAddToList = () => {
        addToList(); //function in app component
        inputRef.current.value = ""; // clear input field
        
        setQty(0)
      };


    return (
        <div id="new-item">
            <form onSubmit ={handleSubmit}>
                <input className = "new-item-name" type="text" placeholder= {"Add New Item Here"} ref={inputRef} />
                <div className ="qty-container">
                    <label className ="new-qty-label">Qty:</label>
                    <input className ="new-qty" type="text" value={qty} onChange={handleQtyChange} />
                    <button className = "decrease" onClick={handleDecrease}>-</button>
                    <button className = "increase" onClick={handleIncrease}>+</button>
                </div>
                <div id ='add-btn'>
                    <button className = 'add-btn' onClick = {handleAddToList}>Add</button>
                </div>
            </form>
        </div>
    )
}