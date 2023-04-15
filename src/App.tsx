import { BrowserRouter, Route, Routes } from "react-router-dom";
import CommandPage from "./pages/command";
import RolesPage from "./pages/roles";
import WayPage from "./pages/way";
import EndPage from "./pages/end";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<CommandPage />} />
				<Route path='/roles' element={<RolesPage />} />
				<Route path='/way' element={<WayPage />} />
				<Route path='/end' element={<EndPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
