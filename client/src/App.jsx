import { Link, Route, Routes } from "react-router";

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold">AmaiReady</h1>

      <div className="mt-6 flex gap-4">
        <Link to="/register">Register</Link>
        <Link to="/login">Log in</Link>
      </div>
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
    </Routes>
  );
}

export default App;