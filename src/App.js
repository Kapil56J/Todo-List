import React,{useState, useEffect} from 'react'
import { View } from './components/View';
import './App.css'

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('tasks');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  // main array of objects state || tasks state || tasks array of objects
  const [tasks, setTask]=useState(getDatafromLS());
  const[open,setOpen]=useState(false);

  // input field states
  const [item, setItem]=useState('');
  const [quantity, setQuantity]=useState('');
  const [price, setPrice]=useState('');

  // form submit event
  const handleAddBookSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let shoping={
      item,
      quantity,
      price
    }
    setTask([...tasks,shoping]);
    setItem('');
    setQuantity('');
    setPrice('');
  }

  // delete book from LS
  const deleteBook=(item)=>{
    const filteredBooks=tasks.filter((element,index)=>{
      return element.item !== item
    })
    setTask(filteredBooks);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
  },[tasks])

  return (
    <div className='wrapper'>
      <h1 className='App-header'>Shoping List App</h1>
      <p className='App-subheader'>Add and view your Shoping List using local storage</p>
      <div id='add-item'>
      <button type="submit" onClick={()=>setOpen(true)} className='btn btn-success btn-md'>
              ADD Item
            </button>
      </div>
    
      <div className='main'>
     
      <div>
      
        {open && (

      
        <div className='form-container'>
          < form autoComplete="off" className='form-group'
          onSubmit={handleAddBookSubmit}>
            <label>Item</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setItem(e.target.value)} value={item}></input>
            <br></br>
            <label>Quantity</label>
            <input type="number" className='form-control' required
            onChange={(e)=>setQuantity(e.target.value)} value={quantity}></input>
            <br></br>
            <label>Price</label>
            <input type="number" className='form-control' required
            onChange={(e)=>setPrice(e.target.value)} value={price}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
            <button type="submit" onClick={()=>setOpen(false)} onKeyDown={()=>setOpen(false)} id='close' className='btn btn-success btn-md'>
              Close
            </button>
            
          </form>
        </div>
        
          )}
      </div>

        <div className='view-container'>
          {tasks.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View tasks={tasks} deleteBook={deleteBook}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>setTask([])}>Remove All</button>
          </>}
          {tasks.length < 1 && <div>No List are added yet</div>}
        </div>

      </div>
    </div>
  
  )
}

export default App