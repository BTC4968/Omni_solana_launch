import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Shell from "./components/Shell";
import Home from "./pages/Home";
import Models from "./pages/Models";
import Playground from "./pages/Playground";
import Docs from "./pages/Docs";
import Token from "./pages/Token";
import Tweets from "./pages/Tweets";
import NotFound from "./pages/NotFound";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/token" element={<Token />} />
          <Route path="/tweets" element={<Tweets />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Shell>
    </>
  );
}
