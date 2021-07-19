import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState([]);
  const [message, setMessage] = useState({ msg: "" });

  useEffect(() => {
    getTask();
    getEvent();

    setInterval(() => {
      if (EventSource.CLOSED) {
        console.log("Reconnecting");
        getEvent();
      }
    }, 300000);
  }, []);

  const getTask = async () => {
    await axios.get("http://127.0.0.1:3001/tasks").then((res) => {
      const data = res.data;
      setTask(data);
    });
  };

  // const eventList = (message) => {
  //   setMessage([...task, message]);
  // };

  const getEvent = () => {
    const source = new EventSource("http://127.0.0.1:3001/live/stream");

    source.addEventListener("message", (event) => {
      setMessage({ msg: event.data });
      // eventList(event.data);
      console.log(message);
    });

    source.onerror = (e) => {
      source.close();
    };
  };

  const onDelete = () => {
    setMessage({ msg: "" });
  };

  return (
    <div className="App">
      {message.msg !== "" && (
        <div>
          <p>{message.msg}</p>
          <button onClick={onDelete}>delete</button>
        </div>
      )}
      {task.map((tasks) => (
        <div key={tasks._id}>
          <h2>{tasks.title}</h2>
          <p>{tasks.day}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
