import { Route, Routes } from "react-router-dom";
import Heroes from "./components/Heroes/Heroes";
import HeroPage from "./routes/HeroPage/HeroPage"


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Heroes />} />
      <Route path="/:id" element={<HeroPage />} />
    </Routes>
  );
}

export default AppRouter;
