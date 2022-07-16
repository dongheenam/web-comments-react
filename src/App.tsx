import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import TopNav from "./TopNav";
import useDarkMode from "./useDarkMode";
import Home from "./Home";
const Comments = React.lazy(() => import("./Comments"));
const Write = React.lazy(() => import("./Write"));
const Admin = React.lazy(() => import("./Admin"));

export default function App() {
  const [mode, toggleMode, loadDOM] = useDarkMode();

  if (!loadDOM) return <div />;
  return (
    <div
      id="app"
      className={`h-screen flex flex-col text-lg items-center ${mode}`}
    >
      <BrowserRouter>
        <TopNav mode={mode} toggleMode={toggleMode} />
        <main
          className="w-[min(95%,1000px)] p-8 overflow-x-hidden overflow-y-scroll
          flex-grow bg-gray-100 dark:bg-gray-900 flex flex-col"
        >
          <div className="flex-grow">
            <Suspense fallback={<span>Loading...</span>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/comments" element={<Comments />}>
                  <Route path="write" element={<Write />} />
                  <Route path="admin" element={<Admin />} />
                </Route>
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </main>
      </BrowserRouter>
    </div>
  );
}
