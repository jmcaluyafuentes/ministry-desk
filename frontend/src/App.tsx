import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EntryList from './pages/EntryList.tsx';
import EntryView from './pages/EntryView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryList />} />
        <Route path="/entry/:id" element={<EntryView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
