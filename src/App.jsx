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
//TaskList: renders the TaskList component, creates a prop named tasks, Sets prop's value to the TASKS array.
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={TASKS} />}</div>
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
