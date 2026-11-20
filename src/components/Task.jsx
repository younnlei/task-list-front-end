//useState is the React hook that lets a component remember a value and re-render when the value changes
//also named exports from React use curly braces while PropTypes is a defalut export
//.css has the components style
//REMOVEDWAVE3-import { useState } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

//destructures the three props that TaskList passed in. Wave03-add onToggle and onDelete
const Task = ({ id, title, isComplete, onToggle, onDelete }) => {
  //REMOVEDWAVE3-const [complete, setComplete] = useState(isComplete); //see notes below
  //REMOVEDWAVE3-const buttonClass = complete ? 'tasks__item__toggle--completed' : '';//see notes below
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

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
        //REMOVEDWAVE3-onClick={() => setComplete(!complete)}
        onClick={() => onToggle(id)}
      >
        {title}
      </button>
      <button className="tasks__item__remove button" //Wave03-wire up the x button
        onClick={() => onDelete(id)}
      >
        x
      </button>
    </li>
  );
};

//these check that each of the three props has the right type and print a console warning if not.
//in wave 3 we'll add onToggle and onDelete props here too as PropTypes.func.isRequried
Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired, //Wave03
  onDelete: PropTypes.func.isRequired, //Wave03
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


/*
WAVE 03 CHANGES (Part A: Lifting Up State)

WHY
  - Before: Task kept its OWN copy of whether it was complete (useState).
    Clicking flipped Task's copy, but App's data never changed, so the
    screen and App's data stopped matching after the first click.
  - App is the component that will tell the database what changed (Wave 04),
    so App needs to be the one that owns the data and knows about changes.
  - Now: Task doesn't own the data. It just DISPLAYS whatever props it's given.
    isComplete comes straight from props, and Task can't change its own props.

Remove useState from Task
    1. Remove the import: import { useState } from 'react';
        - nothing in Task uses it anymore
    2. Remove: const [complete, setComplete] = useState(isComplete);
        - complete and setComplete no longer exist, so everything
          that used them must change (steps 3 and 4)
    3. Change: const buttonClass = complete ? 'tasks__item__toggle--completed' : '';
      To:     const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
        - the strikethrough style now comes from the prop, not local state
    4. Change: onClick={() => setComplete(!complete)}
      To:     onClick={() => {}}
        - temporary placeholder: clicking does nothing for now
        - Part B: App will pass down an onToggle function, and Task will
          call onToggle(id) to ASK App to flip the task

KEY IDEA: the child asks, the parent decides.
  Task (child) displays + asks  →  App (parent) owns + changes the data
*/

/*
WAVE 03 CHANGES (Part B: Toggle)
1. Set buttons onClick to () => onToggle(id)
    - changed onClick={() => {}} to onClick={() => onToggle(id)}
    - also need to add onToggle(id) to const Task destructured props list
    - also need to add onToggle to prop-types at the bottom of the file
*/
