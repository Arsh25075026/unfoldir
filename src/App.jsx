import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upload from './upload.jsx';
import Result from './result.jsx';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Upload />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;