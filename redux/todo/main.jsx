

const toggleTodo = (todo) => {
    return Object.assign({}, todo, {
        completed: !todo.completed
    });
};


const visibilityFilter = (
    state = "SHOW_ALL", action) => {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return true;
    }
};


const todo = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            console.log(action);
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case "TOGGLE_TODO":
            if (state.id !== action.id) {
                return state;
            }
            return {
            ...state, completed: !state.completed
          };
        default:

return state;
      }
    }

const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, {
                id: action.id,
                text: action.text,
                completed: false
            }];
        case "TOGGLE_TODO":
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

/*const combineReducers = (reducers) => {
//console.log(reducers);
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      }, {})
  };
}*/


const {
    combineReducers
} = Redux;
//console.log(combineReducers);


const todoApp = combineReducers({
    todos,
    visibilityFilter
});



const storeToDo = createStore(todoApp);

const {
    Component
} = React;


const FilterLink = ({
    filter,
    children
}) => {
    return (< a href = "#"
        onClick = {
            e => {
                e.preventDefault();
                store.dispatch({
                    type: "Set_VISIBLITY_FILTER",
                    filter
                });
            }
        }>{children}</a>);
}

let nextTodoId = 0;


class TodoApp extends Component {
    render() {

        console.log(this.props.todos);
        return (< div >
            < input ref = {
                node => {
                    this.input = node;
                }
            }
                /> < button onClick = {
                    () => {
                        storeToDo.dispatch({
                            type: "ADD_TODO",
                            text: this.input.value,
                            id: nextTodoId++
                        });
                        this.input.value = "";
                    }
                } > Add TODO < /button> < ul > todoki: {
                    this.props.todos.map(todo => {
                        return <li onClick = {
                            () => {
                                storeToDo.dispatch({
                                    type: "TOGGLE_TODO",
                                    id: todo.id
                                });
                            }
                        }
                            style = {
                                {
                                    textDecoration: todo.completed ? "line-through" : "none"
                                }
                            }
                            key = {
                                todo.id
                            } > {
                                todo.text
                            } < /li>}) } < /ul >

                            <p>Show: {' '}
                                <FilterLink filter="SHOW_ALL">All</FilterLink>
                                {' '}
                                <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
                                {' '}
                                <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
                            </p>
                            < /div >);
                            }
                            }

                            const renderToDo = () => {
                                ReactDOM.render(< TodoApp todos = {
                                    storeToDo.getState().todos
                                }
                                    / >, document.getElementById("todo"));
                            }
                            storeToDo.subscribe(renderToDo);
                            renderToDo();
