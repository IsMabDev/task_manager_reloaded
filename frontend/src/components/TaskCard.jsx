import PropTypes from "prop-types";

const TaskCard = ({ task }) => (
  <div className="task-card">
    <h3>{task.id} - {task.title}</h3>
    <p>{task.description}</p>
    <span>Due: {task.dueDate}</span>
  </div>
);

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    dueDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};
export default TaskCard;
