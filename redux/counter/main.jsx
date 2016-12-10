const counter = (state = 0, action) => {
  if (action.type === "INCREMENT") {
    return state + 1;
  } else if (action.type === "DECREMENT") {
    return state - 1;
  } else {
    return state;
  }
}

const {
  createStore
} = Redux;

//dumb component
const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (< div > < h1 > {
  value
} < /h1> < button onClick = {
  onIncrement
} > + < /button> < button onClick = {
  onDecrement
} > - < /button> < /div >);



      const addCounter = (list) => {
  return [...list, 0];
      };
      const removeCounter = (list, index) => {
  return [...list.slice(0, index), ...list.slice(index + 1)];
      };
      const incrementCounter = (list, index) => {
  return [...list.slice(0, index), list[index]+ 1,
      ...list.slice(index + 1)
      ];
      };

      const store = createStore(counter);
      const render = () => {
        ReactDOM.render(< Counter value = {
          store.getState()
        }
          onIncrement = {
            () => store.dispatch({
              type: "INCREMENT"
            })
          }
          onDecrement = {
            () => store.dispatch({
              type: "DECREMENT"
            })
          }
          />, document.getElementById("counter"));
      }
      store.subscribe(render);
      render();
