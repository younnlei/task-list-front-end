import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, onToggle, onDelete }) => {   // Wave 03 B + C: added onToggle, onDelete
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';   // Wave 03 Part A: complete → isComplete

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => onToggle(id)}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => onDelete(id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,   // Wave 03 Part B: added
  onDelete: PropTypes.func.isRequired,   // Wave 03 Part C: added
};

export default Task;


/*
==========================================================================
TASK.JSX — ROLE: DISPLAYS props and CALLS functions on click
==========================================================================

WAVE 03 SUMMARY
  Part A: removed useState (import + state line); reads isComplete from props
  Part B: title button calls onToggle(id); added to props + propTypes
  Part C: x button calls onDelete(id); added to props + propTypes

  KEY IDEA: the child asks, the parent decides.
  Task doesn't own the data, so it can't change it — it ASKS App to
  change it by calling a function App passed down.

--------------------------------------------------------------------------
WHAT WAS REMOVED IN PART A (for reference)
--------------------------------------------------------------------------
  import { useState } from 'react';
  const [complete, setComplete] = useState(isComplete);
  const buttonClass = complete ? 'tasks__item__toggle--completed' : '';
  onClick={() => setComplete(!complete)}

  Why: Task kept its OWN copy of complete. Clicking flipped Task's copy,
  but App never found out, so the screen and App's data stopped matching.
  App needs to own the data because it will talk to the API in Wave 04.

--------------------------------------------------------------------------
LINE BY LINE
--------------------------------------------------------------------------

import PropTypes from 'prop-types';
  - Checks props are the right type (see propTypes below).

import './Task.css';
  - Loads this component's styles (including the strikethrough rule).

const Task = ({ id, title, isComplete, onToggle, onDelete }) => { ... };
  - Destructures the five props TaskList passed in.
  - id tells App WHICH task was clicked.
  - onToggle / onDelete are really App's toggleComplete / deleteTask.

const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  - Ternary (one-line if/else):
      isComplete true  → add the --completed class
      isComplete false → empty string (no extra class)
  - --completed is a BEM "modifier": same element, different state.

<li className="tasks__item">
  - Each task is one <li> inside TaskList's <ul>.

<button className={`tasks__item__toggle ${buttonClass}`} ...>
  - Template literal (backticks) combines the always-on class with the
    conditional one:
      complete:   "tasks__item__toggle tasks__item__toggle--completed"
      incomplete: "tasks__item__toggle "

onClick={() => onToggle(id)}
  - The arrow function WAITS for the click, then calls onToggle with
    this task's id.
  - WRONG: onClick={onToggle(id)} → calls it immediately on every render.

{title}
  - Puts the title prop's text inside the button.

<button className="tasks__item__remove button" onClick={() => onDelete(id)}>x</button>
  - The delete button. Same pattern as toggle, but calls onDelete.

Task.propTypes = { ... };
  - Checks each prop's type; prints a console warning if wrong or missing.
  - func = must be a function.

export default Task;
  - Lets TaskList.jsx import this component.

--------------------------------------------------------------------------
WHAT HAPPENS WHEN YOU CLICK "Mow the lawn" (id 1)
--------------------------------------------------------------------------
  1. Task runs onToggle(1).
  2. onToggle is App's toggleComplete, so toggleComplete(1) runs.
  3. setTasks builds a new array where task 1 has isComplete: true.
  4. State changed → App re-renders → passes new tasks to TaskList.
  5. TaskList passes isComplete={true} to that Task.
  6. buttonClass becomes --completed → Task.css applies line-through.

  Delete works the same way, except deleteTask uses filter, so in
  step 5 that Task simply isn't rendered anymore.
*/
