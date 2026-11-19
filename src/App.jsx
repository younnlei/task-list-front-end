//useState is the React hook that lets a component remember a value and re-render when the value changes
//also named exports from React use curly braces while PropTypes is a defalut export
//Wave3- App needs useState
import { useState } from 'react';

//bring TaskList component so App can use it
import TaskList from './components/TaskList.jsx';

//load CSS for this component
import './App.css';


//placeholder data: an array of two task objects. Each object has 3 keys that props 'Task' uses later. Then moves into useSatate, then the real data comes from the API at the end.
const TASKS = [
  {id: 1, title: 'Mow the lawn', isComplete: false},
  {id: 2, title: 'Cook Pasta', isComplete: true},
];

//React component is just a function that returns JSX
//TaskList: renders the TaskList component, creates a prop named tasks, Sets prop's value to the tasks state.
const App = () => {
  //Wave3- App owns the task
  const [tasks, setTasks] = useState(TASKS);


  //Wave3 - Function to flip isComplete for the ONE task whose id matches
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, isComplete: !task.isComplete };
        }
        return task;
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div><TaskList tasks={tasks} onToggle={toggleComplete} /></div>
      </main>
    </div>
  );
};

//lets main.jsx import App and render it to the page
export default App;


/*
JSX vs JavaScript
    - classname instead of class
    - &apos is apostrophe
      - linter prefers the escaped version inside JSX text
1. Which component is TASKS passed to? TaskList
2. How is it passed? As a prop named tasks: tasks={TASKS}
3. What element is it wrapped in? A <div>, which sits inside <main>
*/


/*
FOLLOW THE DATA PATH
  - the task data is created once in 'App', then passed down one level at a time like a hand-off from parent to child through props.
App (owns the TASKS array)
    --> TaskList (receives it as props.tasks, loops over it, turns each one into a task)
        --> Task x2 each receives ONE task's id, title, isComplete and shows them on screen

EXAMPLE
'mow the lawn' --> inside TASKS inside App.jsx -->
TaskList receives it in a prop called tasks -->
  Tasklist hands 'mow the lawn' to a Task -->
Task.jsx puts the title in the HTML -->
*/

/*
WAVE 03 CHANGES (Part A: Lifting Up State)

WHY
  - "Lifting state" = moving useState from Task UP into App.
  - App is the closest common parent of every component that needs the
    task data, and it's the one that will talk to the API in Wave 04.
  - TaskList now gets its tasks from App's state instead of the
    hard-coded TASKS array.

Store the task list in state in App.jsx
    1. Import useState: import { useState } from 'react';
    2. Add: const [tasks, setTasks] = useState(TASKS);
        - now App owns the tasks
        - TASKS is now only the STARTING value
        - tasks is the live data, and setTasks is the only way to change it
        - when setTasks is called, App re-renders and the new list flows
          down to TaskList → Task automatically

Pass tasks from state to TaskList as a prop
    1. Change: <TaskList tasks={TASKS} />
      To:     <TaskList tasks={tasks} />
        - the prop NAME (tasks=) stays the same, so TaskList doesn't change
        - only the VALUE changes:
            TASKS = hard-coded array at the top of the file (never changes)
            tasks = state created by useState (changes through setTasks)
        - if we kept passing TASKS, updates from setTasks would never
          reach the screen

DATA FLOW AFTER PART A
  App (owns tasks in state)
    → TaskList (receives tasks as a prop, maps over it)
      → Task (receives id, title, isComplete as props, displays them)

NEXT (Part B): App will also pass DOWN a function (onToggle) so Task
can send a request back UP to change the data.
*/



/*
WAVE 03 CHANGES (Part B: Toggle Complete)

WHY
  - App owns the tasks now, so App is the only one allowed to change them.
  - Task needs a way to ASK App to flip a task. We give it a function to call.

1. Write a toggle function in App that takes a task id and builds a new array where only the matching task's isComplete flips then calls setTasks
    - needs the id so it knows WHICH task to flip
    - setTasks((prevTasks) => ...) is the "updater form":
        React hands us the most recent tasks as prevTasks, and we return the new list.
        Use it whenever the new state depends on the old state.
    - prevTasks.map(...) builds a NEW array (never change state directly):
        id matches  → return a copy of that task with isComplete flipped
        no match    → return the task unchanged
    - { ...task, isComplete: !task.isComplete }
        ...task copies every key (id, title, isComplete) into a new object,
        then isComplete: !task.isComplete overwrites just that one key

2. Pass it down as a prop: App > TaskList > Task
    - changed <div>{<TaskList tasks={tasks} />}</div> to <div><TaskList tasks={tasks} onToggle={toggleComplete} /></div>
    - onToggle = the prop NAME (what TaskList calls it)
    - toggleComplete = the VALUE (the actual function in App)
    - no () after toggleComplete: we're handing over the function itself, not calling it
*/
