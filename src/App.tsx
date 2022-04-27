import { Report } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MiniDrawer from "./components/drawer2";
import SignIn from "./components/signIn";
import About from "./pages/About";
import PolicesOffices from "./pages/PolicesOffices";
import Reports from "./pages/Reports";
import Register from "./pages/users/Register";
import Users from "./pages/users/Users";
function App() {
  // desctruct memebers from user state [ userSlice]
  const { user, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.auth
  );
  return (
    <>
      {console.log(user)}
        
      <MiniDrawer />
        {/* {!user && <Route path="/login" element={<SignIn />} />}
        {user && (
          <Route>
            <>
            <MiniDrawer />
            <Route path="users" element={<Users />}>
              <Route path="profile:id" element={<Register />} />
            </Route>
            <Route path="/user" element={<Register />}>
              <Route path=":id" element={<Register />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/policesoffices" element={<PolicesOffices />} />
            <Route path="/about" element={<About />} />
            </>
          </Route>
        )} */}
    </>
  );
}

export default App;
