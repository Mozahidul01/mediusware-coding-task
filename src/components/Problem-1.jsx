import React, {useState} from 'react';
import Error from "./Error";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const status = e.target.status.value;

    if (name === "" || status === "") {
      setError("Input Field Can't be empty");
      return;
    }

    const newTask = { name, status };
    setTasks([...tasks, newTask]);
    e.target.reset();
    setError("");
  };

  tasks.sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    if (a.status === "completed" && b.status !== "completed") return -1;
    if (a.status !== "completed" && b.status === "completed") return 1;
    return 0;
  });

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
              />
            </div>
            <div className="col-auto">
              <select
                className="form-select form-control"
                name="status"
              >
                <option
                  value=""
                  disabled
                  selected
                >
                  Select Status
                </option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="archive">Archive</option>
              </select>
            </div>

            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
          {error !== "" && <Error message={error} />}
        </div>
        <div className="col-8">
          <ul
            className="nav nav-pills mb-3"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => {
                if (show === "active" && task.status !== "active") {
                  return null;
                } else if (
                  show === "completed" &&
                  task.status !== "completed"
                ) {
                  return null;
                }
                return (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;