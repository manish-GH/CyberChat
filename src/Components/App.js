import firebaseApp from "../firebase";
import { Chat } from "./Chat";
import { Navbar } from "./Navbar";
import { SignIn } from "./SignIn";
import { useAuth } from "../context/AuthProvider";

function App() {
  const { user, darkMode } = useAuth();
  const db = firebaseApp.firestore();

  return (
    <div className={darkMode ? null : "dark"}>
      <div className="App">
        {user ? (
          <div>
            <Navbar btn={true} />
            <Chat user={user} db={db} />
          </div>
        ) : (
          <div className="page">
            <Navbar btn={false} />
            <SignIn />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
