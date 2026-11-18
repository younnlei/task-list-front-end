//PropTypes is a libray for checking that the props a component receives are the right type
import PropTypes from 'prop-types';
//Task is imported because TaskList renders one Task for each item
import Task from './Task.jsx';
//.css has the components style
import './TaskList.css';

//App has passed task={TASKS} --> React builds a props object. {tasks: [...]}
//{tasks} is destructuring meaning it pulls tasks out of that object so I can write 'tasks' instead of const TaskList = (props) => {... props.tasks ...}
const TaskList = ({ tasks }) => {
  //helper function defined inside the component. parameter tasks hides the outer tasks prop inside the function even though it's the same array with duplicate names.
  const getTaskListJSX = (tasks) => {
    //loops over the array and returns a new array, turns each plain task object into a <Task /> element.
    //within 2 tasks, you get an array of 2 <Task> elements back
    return tasks.map((task) => {
      return (
        //One task object split into three separate props
        <Task
          key={task.id}//React uses key to keep track of which list item is which when the list changes. If somethin is deleted, key cannot be a prop, so it needs id separately.
          id={task.id}//prop for the task
          title={task.title}//prop for the task
          isComplete={task.isComplete}//prop for the task
        />
      );
    });
  };
  //calls the helper inside a <ul>. Reach will render an array of elements sequentially so each Task ends up inside the list. <li> is presumably in Task.jsx.
  //task__list is styled in TaskList.css and no-bullet somewhere else either App.css or index.css to remove bullet points.
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

//This tells React what tasks should look like. Prevents incorrect data types or missing information by printing a warning in browser console.
//later isComplete will be changed to is_complete
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

//This lets App.jsx import the component
export default TaskList;



//BEM naming block__element meaning the list part of the tasks block
/*
1. What props does TaskList have, and where do they come from? One prop, tasks, an array of tasks objects. It comes from App through tasks={TASKS}.
2. Where is getTaskListJSX called? Inside the <ul> in the return statement: {getTaskListJSX(tasks)}.
3. How would the code change without the helper? You'd put the 'map' directly in the JSX. the helper keesp the return statement shorter:

return (
  <ul className="tasks__list no-bullet">
    {task.map((task) => (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        isComplete={task.isComplete} />
    ))}
  </ul>
);

THIS IS THE SAME AS

const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
        />
      );
    });
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
  };
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
