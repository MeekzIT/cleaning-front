import React, { useEffect } from "react";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Layout from "./layout";
import { useDispatch } from "react-redux";
import { changeAuth } from "./store/actions/authAction";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "am");
    }
    if (localStorage.getItem("token")) {
      dispatch(changeAuth(true));
    }
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Layout />
      <Footer />
    </div>
  );
}

export default App;
