import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EntryList from './pages/EntryList.tsx';
import EntryView from './pages/EntryView';
import EntryForm from './pages/EntryForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryList />} />
        <Route path="/entry/:id" element={<EntryView />} />
        <Route path="/create" element={<EntryForm />} />
        <Route path="/edit/:id" element={<EntryForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
