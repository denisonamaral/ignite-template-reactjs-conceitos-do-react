import { useState } from "react";
import "../styles/tasklist.scss";
import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const minLengthTitle = 1;
  function handleCreateNewTask(
    tasks: Task[],
    setTasks: (task: Task[]) => void,
    title: string
  ) {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    const addNewTask = [
      ...tasks,
      {
        id: Math.random(),
        title: title,
        isComplete: false,
      },
    ];
    setTasks(addNewTask);
  }

  function handleToggleTaskCompletion(
    id: number,
    tasks: Task[],
    setTasks: (tasks: Task[]) => void
  ) {
    const copyTasks = tasks;
    const findTask = copyTasks.find((task) => task.id === id);
    if (!findTask) {
      return console.log("Task não encontrada!");
    }
    const indexTask = copyTasks.indexOf(findTask);
    if (findTask.isComplete) {
      findTask.isComplete = false;
    } else {
      findTask.isComplete = true;
    }
    if (indexTask > -1) {
      copyTasks.splice(indexTask, 1, findTask);
    }
    setTasks([...copyTasks]);
  }

  function handleRemoveTask(
    id: number,
    tasks: Task[],
    setTasks: (tasks: Task[]) => void
  ) {
    // Remova uma task da listagem pelo ID
    const copyTasks = tasks;
    const findTask = copyTasks.find((task) => task.id === id);
    if (!findTask) {
      return console.log("Task não encontrada!");
    }
    const indexTask = copyTasks.indexOf(findTask);
    if (indexTask > -1) {
      copyTasks.splice(indexTask, 1);
    }
    setTasks([...copyTasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={() => {
              handleCreateNewTask(tasks, setTasks, newTaskTitle);
              setNewTaskTitle("");
            }}
            disabled={newTaskTitle.length < minLengthTitle}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() =>
                      handleToggleTaskCompletion(task.id, tasks, setTasks)
                    }
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id, tasks, setTasks)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
