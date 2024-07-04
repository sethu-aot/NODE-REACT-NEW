import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "../pages/index"

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
            </Routes>
        </Router>
        )
}

export default AppRouter;