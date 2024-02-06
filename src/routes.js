import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import Home from "./pages/home";
import AddOrder from "./pages/addOrders";

export default function Path() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/q?" element={<Home />}></Route>
                <Route path="/addorder" element={<AddOrder />}></Route>
            </Routes>
        </BrowserRouter>
    )
};