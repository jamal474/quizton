import Quiz from './components/quiz'
import NotFound from './components/NotFound'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// The app is mounted at /quiz/ (see vite.config.js). Reading the basename
// from Vite's BASE_URL keeps the router, the asset URLs and the deployed
// path from drifting apart — change the base in one place and this follows.
const basename = import.meta.env.BASE_URL;

// Every quiz lives at /<category>; there is no separate landing page, so the
// index sends visitors to the first category rather than rendering nothing.
const DEFAULT_CATEGORY = 'computer-science';

function App() {
  return (
    <BrowserRouter basename={basename}>
      <div className="App">
        <Routes>
            <Route path="/" element={<Navigate to={`/${DEFAULT_CATEGORY}`} replace/>}/>
            <Route path="/404" element={<NotFound/>}/>
            <Route path="/:category" element={<Quiz/>}/>
            <Route path="*" element={<Navigate to="/404" replace/>}/>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
