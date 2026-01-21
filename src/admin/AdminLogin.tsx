import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./auth";
import Card from "../components/Card";
import Button from "../components/Button";

const AdminLogin = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (login(user, pass)) {
      navigate("/admin/eventos");
    } else {
      setError("Usuario o contraseña inválidos");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 p-6">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-soft-white">Admin TPA</h1>
        <p className="mt-2 text-sm text-neutral-300">Ingresá para gestionar los eventos.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-neutral-300">Usuario</label>
            <input
              className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm text-soft-white"
              value={user}
              onChange={(event) => setUser(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-neutral-300">Contraseña</label>
            <input
              className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm text-soft-white"
              type="password"
              value={pass}
              onChange={(event) => setPass(event.target.value)}
            />
          </div>
          {error && <p className="text-sm text-danger">{error}</p>}
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
