import { useState, useEffect } from "react";
import './App.css';
import Item from "./components/Item";
import Navbar from "./components/Navbar";
import AddNewItem from "./components/AddNewItem";

function App() {

  const [items, setItems] = useState([]); //GET ALL
  const [deletedItems, setDeletedItems] = useState(null) //DELETE 1
  const [newItem, setNewItem] = useState() //POST 1
  const [qty, setQty] = useState(0); //POST 1
  const [editName, setEditName] = useState(null) //PATCH 1
  const [editQty, setEditQty] = useState(null) //PATCH 1
  const [selectedItems, setSelectedItems] = useState([]); //CHECKMARK


  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:8000/items')
      const data = await response.json() 
      setItems(data)
  }
  getData()
  });


async function handleDeleteClick() {  
  if (deletedItems !== null) {
    try {
      await fetch(`http://localhost:8000/items/${deletedItems[0]}`, {
        method: 'DELETE',
      })
      console.log('Item Deleted')
      setDeletedItems(null)
    } catch (error) {
      console.log(error)
    }
  }
}

handleDeleteClick()

async function addToList() {

  try {
      await fetch('http://localhost:8000/items', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "item_name": newItem,
        "qty": qty
      })
    })
    console.log('Item Added')
  } catch (error) {
    console.log(error)
  }
}

async function saveName() {  
  if (editName !== null) {
    try {
      await fetch(`http://localhost:8000/items/${editName.item_id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "item_name": editName.item_name,
        })
      })
      console.log('Item Name Updated')
      setEditName(null)
    } catch (error) {
      console.log(error)
    }
  }
}

saveName()

async function saveQty() {  
  if (editQty !== null) {
    try {
      await fetch(`http://localhost:8000/items/${editQty.item_id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "qty": editQty.qty,
        })
      })
      setEditName(null)
    } catch (error) {
      console.log(error)
    }
  }
}
saveQty()

  return (
    <div className ="container">
      <Navbar />
      <div className ="list-container">
        <AddNewItem 
          setNewItem= {setNewItem}
          setQty= {setQty}
          qty= {qty}
          addToList= {addToList}
        />
        <div className ='items-container'>
          <div className ="title">
						<div className ="qty-title">
							Qty
						</div>
						<div className ="name-title">
							Item
						</div>
					</div>
          <Item 
            items= {items}
            key= {items.item_id}
            setDeletedItems= {setDeletedItems}
            handleDeleteClick= {handleDeleteClick}
            setEditName= {setEditName}
            setEditQty= {setEditQty}
            selectedItems = {selectedItems}
            setSelectedItems= {setSelectedItems}
          />
        </div>
      </div>
    </div>
  );
}



export default App;

//PUT
// async function handleSaveClick() {  
//   if (editItemInServer !== null) {
//     try {
//       await fetch(`http://localhost:4000/items/${editItemInServer.item_id}`, {
//         method: 'PUT',
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           "item_name": editItemInServer.item_name,
//           "qty": editItemInServer.qty
//         })
//       })
//       console.log('Item Updated')
//       setEditItemInServer(null)
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

//handleSaveClick()