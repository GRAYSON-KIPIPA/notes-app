import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesPage from "./components/NotesPage";
import MainLayout from "./components/MainLayout";
import ProfilePage from "./components/ProfilePage";
import AddNote from "./components/AddNote";
import UpdateNote from "./components/UpdateNote";
import NoteDetails from "./components/NoteDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import RoleProtectedRoute from "./components/RoleProtectRoute";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/notes" element={<NotesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/add-note/" element={<AddNote />} />

                  <Route
                    element={<RoleProtectedRoute allowedRoles={["admin"]} />}
                  >
                    {/* <Route element={<MainLayout />}> */}
                    <Route path="/admin" element={<AdminPage />} />
                  </Route>
                  <Route path="/update-note/:id" element={<UpdateNote />} />
                  <Route path="/:id" element={<NoteDetails />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
