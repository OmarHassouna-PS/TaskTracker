import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function Home() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [userTasks, setUserTasks] = useState([{}]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUser();
  }, []);

  const [task, setTask] = useState({
    id: user.id,
    title: "",
    description: "",
    priority: "",
    date: "",
    done: false,
  })


  function handleTaskDescription(e) {
    setTask({ ...task, description: e.target.value });
  }

  function handleTaskTitle(e) {
    setTask({ ...task, title: e.target.value });
  }

  function handleTaskPriority(e) {
    setTask({ ...task, priority: e.target.value });
  }

  function handleTaskDate(e) {
    setTask({ ...task, date: e.target.value });
  }

  function handleAddTaskText(e) {
    axios.post('http://localhost:5000/update', { ...userTasks, Task: [...userTasks.Task, task] }).then((res) => {
      // console.log({ ...userTasks, Task: [...userTasks.Task, task] })
    }).catch((err) => {
      console.log(err);
    })
    getUser ()
    console.log({ ...userTasks, Task: [...userTasks.Task, task] })
  }

  function getUser () {
    axios.get("http://localhost:5000/")
    .then( (res) => {
      const result = res.data.filter((users) => {
        return users.id === user.id;
      });
      setUserTasks(result[0]);
      console.log(result[0])
    })
  }



  function TaskDone() {

  }

  function RemoveTask() {

  }





  return (
    <>

      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full ">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
              <input onChange={(e) => handleTaskTitle(e)}
                className="shadow appearance-none rounded w-full py-2 px-3 mr-4 text-grey-darker border-2 focus:outline-none border-blue-300 focus:border-blue-500 dark:border-blue-500"
                placeholder="Title"
              />

              <select
                className="select select-primary shadow  border-2 rounded w-full py-2 px-3 mr-4 text-grey-darker focus:outline-none border-blue-300 focus:border-blue-500 dark:border-blue-500"
                placeholder="priority"
                onChange={(e) => handleTaskPriority(e)}
              >
                <option value="Task Priority">Task Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <input onChange={(e) => handleTaskDate(e)}
                className="shadow appearance-none border-2 rounded w-full py-2 px-3 mr-4 text-grey-darker focus:outline-none border-blue-300 focus:border-blue-500 dark:border-blue-500"
                placeholder="date"
                type='date'
              />
            </div>
            <div className="flex mt-4">
              <input onChange={(e) => handleTaskDescription(e)}
                className="shadow appearance-none border-2 rounded w-full py-2 px-3 mr-4 text-grey-darker mt-4 focus:outline-none border-blue-300 focus:border-blue-500 dark:border-blue-500"
                placeholder="Add Todo"
              />
            </div>
            <div className="flex mt-4">
              <button onClick={(e) => handleAddTaskText()} className="flex-no-shrink p-2 mt-4 w-full border-2 rounded text-teal border-teal hover:text-white bg-blue-600">
                Add
              </button>
            </div>
          </div>
          <div>
            {userTasks.Task?.map((Task) => {
              return (
                <div className="flex mb-4 items-center">
                  <h1>{Task.title}</h1>
                  <p className="w-full text-grey-darkest">
                    {Task.description}
                  </p>
                  <p className="w-full text-grey-darkest">
                    {Task.priority}
                  </p>
                  <p className="w-full text-grey-darkest">
                    {Task.date}
                  </p>
                  <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green bg-green-300">
                    Done
                  </button>
                  <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey bg-teal-500">
                    Edit
                  </button>
                  <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white bg-red-500">
                    Remove
                  </button>
                </div>
              )
            })}
            <div className="flex mb-4 items-center">
              <p className="w-full line-through text-green">
                Submit Todo App Component to Tailwind Components
              </p>
              <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green bg-green-300">
                Done
              </button>
              <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey bg-teal-500">
                Edit
              </button>
              <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white bg-red-500">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
