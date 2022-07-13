import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [ToDoList, setToDoList] = useState([]);
  const apiURL = "https://assets.breatheco.de/apis/fake/todos/user/dimaredunlap"
  const addItem = (onKeyDownEvent) => {
    if (onKeyDownEvent.keyCode === 13) {
      let newTask = onKeyDownEvent.target.value;
	  const newToDo = {label:newTask, done:false}
      const newList = [...ToDoList, newToDo];
      fetch(apiURL, {
        method: "PUT",
        body: JSON.stringify(newList),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          if (resp.status == 200) {
            return resp.json();
          }
        })
        .then((data) => {
          alert(data.result);
		  fetchListItems;
        })
        .catch((error) => {
          console.log(error);
        });
      setInputValue("");
    }
  };
  const removeItem = (index) => {
    const newList = ToDoList.filter((item, i) => i != index);
    setToDoList(newList);
    fetch(apiURL, {
      method: "PUT",
      body: JSON.stringify(newList),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status == 200) {
          return resp.json();
        }
      })
      .then((data) => {
        alert(data.result);
    fetchListItems;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [inputValue, setInputValue] = useState("");
  const [isShown, setIsShown] = useState({
    state: false,
    index: 0,
  });

  useEffect(() => {
    fetchListItems();
  }, []);
  const fetchListItems = () => {
    fetch(apiURL)
      .then((resp) => {
        if (resp.status == 200) {
          return resp.json();
        }
      })
      .then((data) => {
        setToDoList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const list = ToDoList.map((item, i) => {
    return (
      <div className="repeating" key={i}>
        <li
          onMouseEnter={() => setIsShown({ state: true, index: i })}
          onMouseLeave={() => setIsShown({ state: false, index: 0 })}
        >
          {item.label}{" "}
          {isShown.state === true && isShown.index === i ? (
            <button onClick={() => removeItem(i)}>X</button>
          ) : (
            ""
          )}
        </li>
      </div>
    );
  });

  return (
    <div className="container-fluid card">
      <h1>ToDos</h1>
      <input
        type="text"
        onKeyDown={addItem}
        placeholder=" "
        id="fname"
        name="fname"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <div>
        <ul>
          {list}
          <li>
            {ToDoList.length > 1
              ? `${ToDoList.length} items`
              : ToDoList.length > 0
              ? `${ToDoList.length} item`
              : "No tasks, add a task"}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Home;
