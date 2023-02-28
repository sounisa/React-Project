import { MdDelete } from 'react-icons/md' //TRASHCAN ICON
import  { EditText } from 'react-edit-text' //EDITTEXT COMPONENTS
import 'react-edit-text/dist/index.css'


export default function Item ({ 
	items, 
	setDeletedItems, 
	setEditName,
	setEditQty,
    setSelectedItems,
    selectedItems
}) {

	const deleteItem = (id) => {
		setDeletedItems([id])
		//console.log(id)
	}


	const handleSaveName = ({value, name}) => {
		setEditName({
			item_id: name,
			item_name: value
		})
		//console.log(value)
		//console.log(name)
		
	}
	
	const handleSaveQty = ({value, name}) => {
		setEditQty({
			item_id: name,
			qty: value
		})
		//console.log(value)
		//console.log(name)
	}

    const handleCheckboxChange = (e) => {
        const itemId = parseInt(e.target.value);
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };
    
	return items.map((item) => (
			<div key = {item.item_id} id = "item">
					<>
						<div className = 'item-info'>
                        <input className='checkbox' type="checkbox" value= {item.item_id} checked={selectedItems.includes(item.item_id)} onChange={handleCheckboxChange} />
							<EditText
             	 				name={item.item_id.toString()}
              					defaultValue= {item.qty.toString()}
              					style={{padding: '10px', fontSize: '36px', width: '100px'}}
								onSave={handleSaveQty}
            				/>
                            <EditText
              					name={item.item_id.toString()}
								defaultValue={item.item_name}
              					style={{padding: '10px', fontSize: '36px', width: '500px'}}
            					onSave={handleSaveName}
            				/>
						</div>
						<div className ='item-btns'>
							<button onClick ={ ()=> (deleteItem(item.item_id)) } className="delete-btn"><MdDelete size={'2.5em'} /></button>
						</div>
					</>
				
			</div>
	))
}
