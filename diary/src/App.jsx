import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Diary from "./component/Diary";
import PrivateRoute from "./component/PrivateRoute";
import MyDiaries from "./pages/MyDiaries";
import EditDiary from "./pages/EditDiary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/diary"
          element={
            <PrivateRoute>
              <Diary />
            </PrivateRoute>
          }
        />

        <Route
          path="/mydiaries"
          element={
            <PrivateRoute>
              <MyDiaries />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditDiary />
            </PrivateRoute>
          }
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
      />
    </>
  );
}

export default App;