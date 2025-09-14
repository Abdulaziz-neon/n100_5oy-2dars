import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (!name.trim() || !surname.trim()) return;
    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = { name, surname };
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([ { name, surname }, ...tasks]);
    }
    setName("");
    setSurname("");
  };

  const editTask = (index) => {
    setName(tasks[index].name);
    setSurname(tasks[index].surname);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-gray-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Surname"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-gray-600"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <button
            onClick={addTask}
            className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg font-medium"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-lg"
            >
              <span>
                {task.name} {task.surname}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => editTask(index)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
