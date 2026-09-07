import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import { TaskProvider } from "./context/TaskContext";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>

          {/* Pages without Layout */}

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Pages with Layout */}

          <Route element={<Layout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/tasks"
              element={<Tasks />}
            />

          </Route>

          {/* Unknown routes */}

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;