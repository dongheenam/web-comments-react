import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Comments from "./Comments";
import TopNav from "./TopNav";
import useDarkMode from "./useDarkMode";
import Home from "./Home";
import Admin from "./Admin";
import Write from "./Write";

export default function App() {
  const [mode, toggleMode, loadDOM] = useDarkMode();

  if (!loadDOM) return <div />;
  return (
    <div
      id="app"
      className={`h-max min-h-screen flex flex-col text-lg items-center ${mode}`}
    >
      <BrowserRouter>
        <TopNav mode={mode} toggleMode={toggleMode} />
        <main
          className="w-[min(95%,800px)] p-8 pb-24 flex-grow
            bg-gray-100 dark:bg-gray-900"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comments" element={<Comments />}>
              <Route path="write" element={<Write />} />
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
