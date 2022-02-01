import "./App.css";
import ToDo from "./components/ToDos/ToDo";
import Categories from "./components/Categories/Categories";
import Navigation from "./components/Navigation";
import NotFound from "./components/NotFound";
//import AuthProvider so we can use that context in the App
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/PrivateRoute";

//allows writing of custom routing functionality
import { HashRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navigation />
        <HashRouter>
          <Switch>
            <PrivateRoute exact path="/" component={ToDo} />
            <PrivateRoute path="/todos" component={ToDo} />
            <PrivateRoute path="/categories" component={Categories} />
            <Route path="/login" component={Login} />

            {/* Below we place the NotFound component in as the last route in the Switch. this will serve and and error page for our app. */}
            <Route component={NotFound} />
          </Switch>
        </HashRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
