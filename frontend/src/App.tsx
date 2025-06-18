import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EntryList from './pages/EntryList.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
