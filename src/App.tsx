import { useSelector } from "react-redux";
import MiniDrawer from "./components/drawer2";
function App() {
  // desctruct memebers from user state [ userSlice]
  const { user, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.auth
  );
  return (
    <>
        
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
