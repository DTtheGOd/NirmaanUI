import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p className="text-neon-red text-sm mb-2">{error}</p>}
      <form
        onSubmit={onSubmit}
        className="surface border-theme rounded-lg p-6 space-y-3"
      >
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
          Login
        </Button>
      </form>
      <p className="text-sm mt-3 text-secondary">
        No account?{" "}
        <Link className="text-accent glow-accent" to="/register">
          Register
        </Link>
      </p>
    </section>
  );
}
