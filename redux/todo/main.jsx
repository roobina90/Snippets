const { combineReducers, createStore } = Redux;

/*
REDUX reducers and helpers
 */
const toggleTodo = (todo) => {
    return Object.assign({}, todo, {
        completed: !todo.completed
    });
};

//visivility filter reducer:: SET_VISIBILITY_FILTER
const visibilityFilter = (
    state = "SHOW_ALL", action) => {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
};

//single TODO reducer:: ADD_TODO, TOGGLE_TODO
const todo = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
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

//list of TODOS reducer:: ADD_TODO, TOGGLE_TODO
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


//combined reducer of todos reducer and visiblity
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

//create store for reducers to edit
//



/*
React components
*/
const {connect} = ReactRedux;
let nextTodoId = 0;


const { Component } = React;





const addTodo = (text) => {
    return {
        type: "ADD_TODO",
        id: nextTodoId++,
        text
    };
}


const setVisibilityFilter = (filter) => {
    return {
        type: "SET_VISIBILITY_FILTER",
        filter
    }
}

const toggleTodoAction = (id) => {
    return {
        type: "TOGGLE_TODO",
        id
    };
}


const Link = ({
    active,
    children,
    onClick
}) => {
    if (active) {
        return <span>{children}</span>
    }
    return (
        < a href="#"
            onClick={
                e => {
                    e.preventDefault();
                    onClick();
                }
            }>{children}</a>);
}

const mapStateToLinkProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    };
}

const mapDispatchToLinkProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

// class FilterLink extends Component {
//     componentDidMount() {
//         const {store} = this.context;

//         this.unsubscribe = store.subscribe(() => this.forceUpdate());
//     }

//     componentWillUnmount() {
//         this.unsubscribe();
//     }
//     render() {
//          const {store} = this.context;
//         const props = this.props;
//         const state = store.getState();

//         return (
//             <Link active= { } 
//             onClick = {() => store.}> {props.children}</Link>
//         )
//     }
// }

FilterLink.contextTypes = {
    store: React.PropTypes.object
}

//helper for todoApp component
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case "SHOW_ALL":
            return todos;
        case "SHOW_COMPLETED":
            return todos.filter(t => t.completed);
        case "SHOW_ACTIVE":
            return todos.filter(t => !t.completed);
    }
}

const ToDo = ({onClick, completed, text}) => (


    <li onClick={
        onClick
    }
        style={
            {
                textDecoration: completed ? "line-through" : "none"
            }
        }
        > {
            text
        } < /li>
)


const ToDoList = ({todos, onClick}) => (
    <ul>
            {todos.map(todo => (
                <ToDo key={todo.id} {...todo} onClick={() => onClick(todo.id)} />
            ))}
        </ul>
        )






let AddTodo = ({dispatch}) => {
            let input;
    return (
        <div>

            < input ref={
                node => {
                    input = node;
                }
            }
                /> < button onClick={() => {
                    dispatch(addTodo(input.value))
                    input.value = "";
                }
                } > Add TODO < /button>

    </div>
            )


}

AddTodo= connect()(AddTodo);

const Footer = () => (

    <p>Show: {' '}
                <FilterLink filter="SHOW_ALL" >All</FilterLink>
                {' '}
                <FilterLink filter="SHOW_ACTIVE" >Active</FilterLink>
                {' '}
                <FilterLink filter="SHOW_COMPLETED" >Completed</FilterLink>
            </p>

            )


const mapStateToProps = (state) => {
    return {
                todos: getVisibleTodos(state.todos, state.visibilityFilter)
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
                onClick: id =>  dispatch(toggleTodoAction(id))
    }
}


const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps)(ToDoList);

// class VisibleTodoList extends Component {
                //       componentDidMount() {
                //           const {store} = this.context;
                //         this.unsubscribe = store.subscribe(() => this.forceUpdate());
                //     }

                //     componentWillUnmount() {
                //         this.unsubscribe();
                //     }
                //     render() {
                //         const {store} = this.context;
                //         const props = this.props;
                //         const state = store.getState();

                //         return (
                //             <ToDoList todos={} 
                //             onClick={} />
                //         )
                //     }
                // }


                VisibleTodoList.contextTypes = {
                    store: React.PropTypes.object
                }



const TodoApp =  () => (< div >
                <AddTodo />
                <VisibleTodoList />

                <Footer />
                < /div >);



class Provider extends Component {

                    getChildContext() {

                return {
                    store: this.props.store
        };
    }

    render() {
        return this.props.children;
    }

}

Provider.childContextTypes = {
                    store: React.PropTypes.object
}
                ReactDOM.render(<Provider store={createStore(todoApp)}><TodoApp /></Provider>, document.getElementById("todo"));

                            // store.subscribe(renderToDo);
                            // renderToDo();
