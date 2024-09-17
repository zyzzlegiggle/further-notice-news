
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home.jsx";
import Nav from "./nav.jsx";
import Favorites from "./favorites.jsx";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Nav />}>
                    <Route index element={<Home />} />
                    <Route path="favorites" element={<Favorites />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}




export default App;