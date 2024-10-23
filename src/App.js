import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      console.log("토큰:", storedToken); 
      if (storedToken) {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      } else {
        console.log("토큰이 없습니다.");
      }
    } catch (error) {
      setUser(null);
      console.error("API 요청 실패:", error);
    }
  }
  useEffect( () => {
    getUser();

  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute user={user} setUser={setUser}>
        <TodoPage user={user} setUser={setUser}/>
        </PrivateRoute>
      } 
      />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
    </Routes>
  );
}

export default App;
