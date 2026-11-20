import { useState } from 'react';                 // Wave 03 Part A: added
import TaskList from './components/TaskList.jsx';
import './App.css';

const TASKS = [
  { id: 1, title: 'Mow the lawn', isComplete: false },
  { id: 2, title: 'Cook Pasta', isComplete: true },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);     // Wave 03 Part A: added


  const toggleComplete = (id) => {              // Wave 03 Part B: added
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, isComplete: !task.isComplete };
        }
        return task;
      })
    );
  };


  const deleteTask = (id) => {                // Wave 03 Part C: added
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        {/* Wave 03: A = TASKS → tasks, B = added onToggle, C = added onDelete */}
        <div>
          <TaskList tasks={tasks} onToggle={toggleComplete} onDelete={deleteTask} />
        </div>
      </main>
    </div>
  );
};

export default App;


/*
==========================================================================
APP.JSX — ROLE: OWNS the task data and the functions that change it
==========================================================================

WAVE 03 SUMMARY
  Part A: added useState, passes tasks from state (not TASKS) to TaskList
  Part B: added toggleComplete, passes it down as onToggle
  Part C: added deleteTask, passes it down as onDelete

--------------------------------------------------------------------------
LINE BY LINE
--------------------------------------------------------------------------

import { useState } from 'react';
  - useState is the React hook that lets a component remember a value
    and re-render when that value changes.
  - Curly braces because it's a NAMED export from React.

import TaskList from './components/TaskList.jsx';
  - Brings in the TaskList component so App can render it.

import './App.css';
  - Loads this component's styles. No variable name needed.

const TASKS = [ ... ];
  - Hard-coded starting data: an array of two task objects.
  - ALL_CAPS because it's a constant that never changes.
  - Each object has id, title, isComplete — these become Task's props.
  - Wave 04: real data will come from the API instead.

const App = () => { ... };
  - A React component is just a function that returns JSX.

const [tasks, setTasks] = useState(TASKS);
  - Creates state. App now OWNS the tasks ("lifting state up").
  - TASKS = only the STARTING value.
  - tasks = the live data. setTasks = the only way to change it.
  - When setTasks is called, App re-renders and the new list flows
    down to TaskList → Task automatically.

const toggleComplete = (id) => { ... };
  - Flips isComplete for the ONE task whose id matches.
  - Needs the id so it knows WHICH task was clicked.

  setTasks((prevTasks) => ...)
    - "Updater form": React hands us the latest tasks as prevTasks,
      and we return the new list.
    - Use it whenever the NEW state depends on the OLD state.

  prevTasks.map((task) => { ... })
    - map builds a NEW array (never change state directly).
    - Same number of items; only the matching one is changed.

  if (task.id === id) { return { ...task, isComplete: !task.isComplete }; }
    - ...task copies every key (id, title, isComplete) into a NEW object.
    - isComplete: !task.isComplete then overwrites just that one key.

  return task;
    - Every other task is returned unchanged.

const deleteTask = (id) => { ... };
  - Removes the ONE task whose id matches.

  prevTasks.filter((task) => task.id !== id)
    - filter builds a NEW array with only the items that pass the test.
    - task.id !== id → "keep every task whose id is NOT the one clicked."
    - map vs filter:
        map    = same number of items, some changed   (toggle)
        filter = fewer items, none changed            (delete)

<div className="App"> ... </div>
  - className instead of class (class is a reserved word in JS).

<h1>Ada&apos;s Task List</h1>
  - &apos; is an apostrophe; the linter prefers the escaped version in JSX.

<TaskList tasks={tasks} onToggle={toggleComplete} onDelete={deleteTask} />
  - Renders TaskList and passes it three props:
      tasks    = the task data from state
      onToggle = the toggleComplete function
      onDelete = the deleteTask function
  - Left side = prop NAME (what TaskList calls it).
    Right side = VALUE (what App is handing over).
  - No () after toggleComplete / deleteTask: we're handing over the
    function itself, not calling it.

export default App;
  - Lets main.jsx import App and render it to the page.

--------------------------------------------------------------------------
DATA FLOW
--------------------------------------------------------------------------
  App (owns tasks + toggleComplete + deleteTask)
    → TaskList (receives tasks, onToggle, onDelete; passes them down)
      → Task (displays id/title/isComplete; calls onToggle(id) / onDelete(id))

  Data goes DOWN as props. Requests go UP as function calls.
  Changes come back DOWN as new props.
*/
