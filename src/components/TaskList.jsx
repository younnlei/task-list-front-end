import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = ({ tasks, onToggle, onDelete }) => {   // Wave 03 B + C: added onToggle, onDelete
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onToggle={onToggle}                         // Wave 03 Part B: added
          onDelete={onDelete}                         // Wave 03 Part C: added
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,   // Wave 03 Part B: added
  onDelete: PropTypes.func.isRequired,   // Wave 03 Part C: added
};

export default TaskList;


/*
==========================================================================
TASKLIST.JSX — ROLE: PASSES everything down (the "middle man")
==========================================================================

WAVE 03 SUMMARY
  Part A: no change
  Part B: receives onToggle, passes it to each Task, added to propTypes
  Part C: receives onDelete, passes it to each Task, added to propTypes

  TaskList doesn't USE onToggle or onDelete itself — it just hands them
  down to every Task.

--------------------------------------------------------------------------
LINE BY LINE
--------------------------------------------------------------------------

import PropTypes from 'prop-types';
  - Library that checks props are the right type (see propTypes below).

import Task from './Task.jsx';
  - TaskList renders one Task per task, so it needs the component.

import './TaskList.css';
  - Loads this component's styles.

const TaskList = ({ tasks, onToggle, onDelete }) => { ... };
  - Destructures the three props App passed in.
  - Same as (props) => { ... props.tasks, props.onToggle, props.onDelete }

const getTaskListJSX = (tasks) => { ... };
  - Helper function that turns the tasks array into Task elements.
  - Its parameter is also named tasks, so inside the helper it hides the
    outer tasks prop. Same array, so it works — just a naming quirk.

return tasks.map((task) => { ... });
  - map loops over the array and returns a NEW array.
  - Each plain task object becomes a <Task /> element.

<Task key={task.id} id={task.id} title={task.title}
      isComplete={task.isComplete} onToggle={onToggle} onDelete={onDelete} />
  - Each attribute becomes a prop for that Task.
  - This is where one task object gets split into separate props.
  - key: React uses it to track which list item is which when the list
    changes (e.g. after a delete). Task can't read key, so id is passed
    separately.
  - onToggle / onDelete: every Task gets the SAME functions. Each Task
    calls them with its OWN id, so App knows which one was clicked.

return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
  - Calls the helper inside a <ul>. React renders the array of Task
    elements one after another.
  - tasks__list is styled in TaskList.css; no-bullet removes the bullets
    (defined in another CSS file).

TaskList.propTypes = { ... };
  - Tells React what each prop should look like. Wrong type or missing
    prop → a WARNING in the browser console (the app doesn't crash).
  - tasks: an array of objects, each with a number id, string title,
    and boolean isComplete.
  - onToggle / onDelete: PropTypes.func = must be a function.
    They sit OUTSIDE the shape because they're props of TaskList itself,
    not keys inside each task object.
  - The linter warns "not props validated" if a destructured prop is
    missing from this list.

export default TaskList;
  - Lets App.jsx import this component.

--------------------------------------------------------------------------
WITHOUT THE HELPER (same result)
--------------------------------------------------------------------------
  return (
    <ul className="tasks__list no-bullet">
      {tasks.map((task) => (
        <Task key={task.id} id={task.id} title={task.title}
              isComplete={task.isComplete}
              onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
*/
