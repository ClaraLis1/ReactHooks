import { useReducer, useRef, useState } from "react";
import "./App.css";
import DetailCard from "./components/DetailCard";
import EmptyCard from "./components/EmptyCard";
import History from "./components/History";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

const initialState = {
  search: "",
  searchHistory: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH":
      return { ...state, search: action.payload };

    case "ADD_USER_TO_HISTORY":

      return {
             ...state,
              searchHistory: [...state.searchHistory, state.search],
            };      
      

    default:
      return state;
  }
};


function App() {
  const ref = useRef(null)
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue,setInputValue] = useState('')
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <header>
          <h1>Devfinder</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              dispatch({ type: "ADD_USER_TO_HISTORY" });
              dispatch({ type: "UPDATE_SEARCH", payload: "" });
              ref.current.focus();
              setInputValue('')
            }}
          >
            <label htmlFor="search">
              <input
                ref={ref}
                type="text"
                id="search"
                name="search"
                value={inputValue}
                placeholder="Search Github username_"
                autoComplete="off"
                onChange={(e) => {
                  setInputValue(e.target.value)
                }}
                onBlur={()=>{
                  dispatch({
                    type: "UPDATE_SEARCH",
                    payload: inputValue,
                  });
                }}
              />
              <button type="submit">Search</button>
            </label>
          </form>
        </header>
        <div className="result">
          {state.searchHistory.length === 0 ? (
            <EmptyCard text="Start finding a dev_" />
          ) : (
            <DetailCard
              user={state.searchHistory[state.searchHistory.length - 1]}
            />
          )}
        </div>
        {state.searchHistory.length !== 0 ? (
          <History users={state.searchHistory} />
        ) : null}
      </div>
    </QueryClientProvider>
  );
}

export default App;