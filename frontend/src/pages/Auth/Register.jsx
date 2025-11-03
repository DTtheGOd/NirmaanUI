import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/home");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="max-w-md mx-auto">
      <div className="flex items-center justify-center gap-3 mb-6">
        <img
          src="/logo.png"
          alt="Nirmaan UI Logo"
          className="h-12 w-12 object-contain"
        />
        <span className="text-3xl font-bold bg-gradient-signature bg-clip-text text-transparent">
          Nm
        </span>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {error && <p className="text-neon-red text-sm mb-2">{error}</p>}
      <form
        onSubmit={onSubmit}
        className="surface border-theme rounded-lg p-6 space-y-3"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-theme rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-light-muted dark:placeholder:text-dark-muted"
          placeholder="Name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-theme rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-light-muted dark:placeholder:text-dark-muted"
          placeholder="Email"
          type="email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-theme rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-light-muted dark:placeholder:text-dark-muted"
          placeholder="Password"
          type="password"
          required
        />
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>
      <p className="text-sm mt-3 text-secondary">
        Have an account?{" "}
        <Link className="text-accent glow-accent" to="/login">
          Login
        </Link>
      </p>
    </section>
  );
}
