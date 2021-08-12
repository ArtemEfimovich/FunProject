import "./styles/App.css"
import Posts from "./pages/Posts";
import {BrowserRouter,Route} from "react-router-dom";
import About from "./pages/About";

function App() {

    return (
  <BrowserRouter>
      <Route path="/"component={Posts}/>
      <Route path="/about" component={About}/>
  </BrowserRouter>
    );
}

export default App;
