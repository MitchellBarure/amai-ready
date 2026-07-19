import { Link, Route, Routes } from "react-router";

import AuthTestPage from "@/pages/AuthTestPage";
import RegisterPage from "@/pages/RegisterPage";


function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold">AmaiReady</h1>

      <nav className="mt-6 flex gap-4">
        <Link to="/register">Register</Link>
        <Link to="/login">Log in</Link>
        <Link to="/auth-test">Test authentication</Link>
      </nav>

      <p className="text-sm uppercase tracking-widest">
        AmaiReady
      </p>

      <h1 className="mt-3 font-heading text-5xl font-bold">
        Preparing every mother for a safe delivery.
      </h1>

      <p className="mt-4 max-w-xl text-lg">
        Maternal delivery preparation and support.
      </p>
    </main>
  );
}



function LoginPage() {
  return <h1 className="p-8 text-2xl font-bold">Log in</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth-test" element={<AuthTestPage />} />
    </Routes>
  );
}



export default App;