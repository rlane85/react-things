import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <p>
        <Link to="/">Home</Link>
      </p>

      <p>
        <Link to="/st">SmartThings</Link>
      </p>

      <p>
        <Link to="/pws">Personal Weather</Link>
      </p>
      <Outlet />
    </div>
  );
}
