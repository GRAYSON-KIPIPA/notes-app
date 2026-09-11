import { useState } from "react";
import API_URL from "./services/api";
import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesPage from "./components/NotesPage";
import MainLayout from "./components/MainLayout";
import ProfilePage from "./components/ProfilePage";
import AddNote from "./components/AddNote";
import UpdateNote from "./components/UpdateNote";
import NoteDetails from "./components/NoteDetails";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<MainLayout />}>
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/add-note/" element={<AddNote />} />
              <Route path="/:id" element={<NoteDetails />} />
              <Route path="/update-note/:id" element={<UpdateNote />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
