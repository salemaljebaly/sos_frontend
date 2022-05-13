import { useSelector } from "react-redux";
import MiniDrawer from "./components/drawer2";

import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/users/signIn";
function App() {
  // desctruct memebers from user state [ userSlice]
  const { user, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.auth
  );
  return (
    <>
      {user ? (
        <MiniDrawer />
      ) : (
        <Routes>
          <Route path="/login" element={<SignIn />} />
        </Routes>
      )}
    </>
  );
}

export default App;
