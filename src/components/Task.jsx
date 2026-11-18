//useState is the React hook that lets a component remember a value and re-render when the value changes
//also named exports from React use curly braces while PropTypes is a defalut export
//.css has the components style
import { useState } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

//destructures the three props that TaskList passed in
const Task = ({ id, title, isComplete }) => {
  const [complete, setComplete] = useState(isComplete); //see notes below
  const buttonClass = complete ? 'tasks__item__toggle--completed' : '';//see notes below

//each task is one <li> inside TaskLit's <ul>
//The task title itself is a 'button' so a reaction when clicked
//className uses a template literal `` to combine an always-on class with the conditional one.
    //complete "task__item__toaggle tasks__item__toggle--completed"
    //Incomplete "task__item__toggle"
//on click set complete !complete means that when it's clicked complete flips to its opposite.
//arrow function means it onlly runs on click.
//title puts the prop's text inside the button
//tasks__item__remove button doesn't have an onClick until Wave 03
  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => setComplete(!complete)}
      >
        {title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

//these check that each of the three props has the right type and print a console warning if not.
//in wave 3 we'll add onToggle and onDelete props here too as PropTypes.func.isRequried
Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
};

export default Task;

/*
1. How a click causes the strikethrough
    - you click the title button
    - setComplete(!complete) flips the state from F to T
    - React re-renders this Task
    - buttonClass is recalculated and becomes 'tasks__item__toggle--completed'
    - the button's className now includes that modifier class
    - A rule in Task.css that targets .tasks_item__toggle--completed applies text-decoration: line-through
2. What props does Task have and where do they come from?
    - it has id, title, and isComplete. They come from TaskList, which got them from each object in App's TASKS array.
3. How would the code change with props instead of destructuring?
    const Task = (props) = > {
        const [complete, setComplete] = useState(props.isComplete); ...ect {props.title}};

    So every place that used prop by its bare name needs the props. prefix.
*/


/*
const [complete, setComplete] = useState(isComplete);
    creates a piece of state whose starting value comes from the prop.
    Complete is the current value, setComplete changes the value.
    React re-render's this component when called.
    Each 'Task' has its own separate 'complete' state.
    The prop only sets the starting value. After that, the state lives inside Task, and
    App has no idea when it changes. Later we will move this state up to App.

const buttonClass = complete ? 'tasks__item__toggle--completed; : '';
    Ternary: a one-line if/else statement
    if complete is true, use the class 'tasks__item__toggle--completed'
    : otherwise use an empty string to signify no extra class.
    --completed is a modifier in BEM naming.
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
