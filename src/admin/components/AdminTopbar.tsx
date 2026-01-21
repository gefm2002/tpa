import { logout } from "../auth";
import { useNavigate } from "react-router-dom";

const AdminTopbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 border-b border-white/10 bg-neutral-900/80 px-4 py-3">
      <button className="btn bg-accent text-neutral-900" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminTopbar;
