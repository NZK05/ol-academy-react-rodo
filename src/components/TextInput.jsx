import { useState } from 'react';

function TextInput() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    setText(event.target.value);
    setErrorMessage('');
  }

  function handleAdd() {
    if (text.trim()) {
      setTasks([...tasks, { name: text.trim(), completed: false, editMode: false, checked: false }]);
      setText('');
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a task name');
    }
  }

  function handleUpdate(index, field, value) {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  }

  function handleCheckbox(index) {
    handleUpdate(index, 'checked', !tasks[index].checked);
  }

  function handleComplete(index) {
    handleUpdate(index, 'completed', !tasks[index].completed);
  }

  function handleEdit(index) {
    handleUpdate(index, 'editMode', true);
  }

  function handleSave(index, newName) {
    handleUpdate(index, 'name', newName.trim());
    handleUpdate(index, 'editMode', false);
  }

  function handleMove(index, direction) {
    const newTasks = [...tasks];
    const currentIndex = direction === 'up' ? index - 1 : index + 1;
    [newTasks[currentIndex], newTasks[index]] = [newTasks[index], newTasks[currentIndex]];
    setTasks(newTasks);
  }

  function handleDelete(index) {
    setTasks([...tasks.slice(0, index), ...tasks.slice(index + 1)]);
  }

  function handleDeleteAll() {
    setTasks([]);
  }

  return (
    <div>
      <label htmlFor="textInput">Make a new task</label>
      <input type="text" id="textInput" value={text} onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleDeleteAll}>Delete All</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ color: task.completed ? 'red' : 'black' }}>
            {!task.editMode ? (
              <div>
                <input type="checkbox" checked={task.checked} onChange={() => handleCheckbox(index)} />
                {task.name}
                <button onClick={() => handleComplete(index)}>Mark completed</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
                {index > 0 && <button onClick={() => handleMove(index, 'up')}>Up</button>}
                {index < tasks.length - 1 && <button onClick={() => handleMove(index, 'down')}>Down</button>}
              </div>
            ) : (
              <div>
                <input type="text" defaultValue={task.name} onBlur={(event) => handleSave(index, event.target.value)} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TextInput;