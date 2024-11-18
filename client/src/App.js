import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./pages/header/NavBar";
import Home from "./pages/Home";
import AddHorse from "./pages/AddHorse";
import Horses from "./pages/Horses";
import HorseCare from "./pages/HorseCare";
import CreateUser from "./pages/CreateUser";
import UsersProvider from "./contexts/UsersContext";
import PrivateRoutes from "./pages/PrivateRoutes";
import Normalize from "react-normalize";

const App = () => {
  return (
    <>
      <Normalize />
      <UsersProvider>
        <Router>
          <GlobalStyles />
          <NavBar />
        
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/accountCreation" element={<CreateUser />}></Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/horses" element={<Horses />}></Route>
              <Route path="/addHorse" element={<AddHorse />}></Route>
              <Route path="/horseCare/:id" element={<HorseCare />}></Route>
              <Route path="*" element={<h1>404 Page Not Found</h1>}></Route>
            </Route>
          </Routes>
        </Router>
        {/* <Footer /> */}
      </UsersProvider>
    </>
  );
};
export default App;
