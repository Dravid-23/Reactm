import React, { useEffect,useState } from 'react';
import'./App.css';
const API_URL = 'http://localhost:5000';

function App() {
    const[todos, setTodos]=useState([]);
    const[student_id, setStudent_id]=useState('');
    const[tutor_id, setTutor_id]=useState('');
    const{subject, setSubject}=useState('');
    const[editId, setEditId]=useState(null);
   
    useEffect(()=>{
      fetchTodos();

    },[]);


    const fetchTodos = async() => {
      try{
        const response= await fetch('http://localhost:5000/data');
        const data= await response.json();
        setTodos(data);
      }catch (err){
        console.error("Error fetching todos:",err);
      }
    };
    const createTodo=async()=>{
      try{
        await fetch(API_URL ,{
          method:'POST',
          headers: { 'Content-Type':'application/json'},
          body:JSON.stringify({ student_id, tutor_id }),
        });

        fetchTodos();
        resetForm();

      } catch(err) {
        console.error('Error creating todo:',err);
      }
    };
    const updateTodo=async()=>{
      try{
        await fetch('http://localhost:5000/:id',{
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({student_id,tutor_id}),
        });
        fetchTodos();
        resetForm();
      } catch(err){
        console.error('Error updating todo:',err);
      }
    };
    const deleteTodo=async(id) => {
      try{
        await fetch('${API_URL}/${id}',{
          method:'DELETE',
        });
        fetchTodos();
      } catch(err) {
        console.error('Error deleting todo',err);
      }
    };
    const handleSubmit=(e) => {
      e.preventDefault();
      editId ? updateTodo(): createTodo();
    };
    const handleEdit=(todo)=>{
      setStudent_id(todo.student_id);
      setTutor_id(todo.tutor_id);
      setSubject(todo.subject);
      setEditId(todo._id);
    };
    const resetForm=()=>{
      setStudent_id("");
      setTutor_id('');
      setSubject('');
      setEditId(null);
    };
    return(
    <div className='style'>
      
           <h1>TODO APP</h1>

      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder='Student_id' 
        value={student_id} 
        onChange={(e)=>setStudent_id(e.target.value)}
        required
        />

        <input 
        type="text" 
        placeholder='Tutor_id' 
        value={tutor_id} 
        onChange={(e)=>setTutor_id(e.target.value)}
        />
        <button type="submit">{editId?'Update':'Add'}</button>
      </form>

      <ul>
        {todos.map((todo)=>(
          <li key={todo._id}>
            <strong>{todo.student_id}</strong>:{todo.tutor_id}
            <button onClick={()=>handleEdit(todo)}>Edit</button>
            <button onClick={()=>deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;