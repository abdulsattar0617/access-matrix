import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NewUserForm from "./components/user/NewUserForm";
import EditUserForm from "./components/user/EditUserForm";
import UserList from "./components/user/UserList";
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDetails from "./components/user/UserDetails";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}

          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<NewUserForm />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/:id/edit" element={<EditUserForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
