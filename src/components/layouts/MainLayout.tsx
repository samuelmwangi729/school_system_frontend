import Header from "../navigation/Header";
import { Outlet } from "react-router-dom";
import Footer from "../navigation/Footer";

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
