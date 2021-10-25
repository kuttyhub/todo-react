import TodoContainer from "./pages/Todo";
import "./app.css";
function App() {
  return (
    <div
      className="App"
      style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}
    >
      <TodoContainer />
    </div>
  );
}

export default App;
