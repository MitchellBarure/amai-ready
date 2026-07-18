import { Link, Route, Routes } from "react-router";

import AuthTestPage from "@/pages/AuthTestPage";

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold">AmaiReady</h1>

      <nav className="mt-6 flex gap-4">
        <Link to="/register">Register</Link>
        <Link to="/login">Log in</Link>
        <Link to="/auth-test">Test authentication</Link>
      </nav>
    </main>
  );
}

function RegisterPage() {
  return <h1 className="p-8 text-2xl font-bold">Register</h1>;
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