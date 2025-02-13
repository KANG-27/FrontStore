import "./App.css";
import Content from "./Components/Content";
import Header from "./Components/Header";

function App() {
  localStorage.clear();

  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen">
      <Header />
      <Content />
      <div>foter</div>
    </div>
  );
}

export default App;
