// App.js
import { Routes, Route } from "react-router-dom";
import Component from "./pages/landing";
import AnimeBuilderForm from "./pages/volunteer";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Component />} />
        <Route path="/volunteer" element={<AnimeBuilderForm />} />
      </Routes>
    </div>
  );
};

export default App;
