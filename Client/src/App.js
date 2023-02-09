import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import useContent from "./hooks/useContent";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import PrayerLimit from "./pages/PrayerLimit";
import Register from "./pages/Register";

// import Register from "./pages/Register";

const ROLES = {
  User: 1000,
  Admin: 5150,
};

function App() {
  const { activeMenu, screenSize } = useContent();
  return (
    <div className="flex relative bg-main-dark-bg">
      {activeMenu ? (
        <div className="w-full md:w-48 fixed sidebar bg-secondary-dark-bg">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 bg-secondary-dark-bg ">
          <Sidebar />
        </div>
      )}
      <div
        className={`bg-main-dark-bg  min-h-screen w-full ${
          activeMenu ? "md:ml-48" : "flex-2"
        }`}
      >
        <div className="fixed md:static  bg-main-dark-bg navbar w-full">
          <Navbar />
        </div>

        <div className={screenSize <= 786 ? "mt-28 mb-20" : "mt-5 mb-20"}>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public Routes */}
              {/* we want to protect these routes */}
              <Route element={<PersistLogin />}>
                <Route path="/" element={<Home />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="prayerlimit" element={<PrayerLimit />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="admin" element={<Admin />} />
                  <Route path="register" element={<Register />} />
                </Route>
              </Route>
              {/* catch all */}
              <Route path="*" element={<Missing />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
