import { useRef } from "react";
import { exportSnapshot, importSnapshot, resetToSeed } from "../../utils/storage";
import { logout } from "../auth";
import { useNavigate } from "react-router-dom";

const AdminTopbar = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleExport = () => {
    const data = exportSnapshot();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tpa-snapshot.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        importSnapshot(reader.result);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    resetToSeed();
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-neutral-900/80 px-4 py-3">
      <div className="flex flex-wrap gap-2">
        <button className="btn border border-white/20 text-soft-white" onClick={handleExport}>
          Export JSON
        </button>
        <button
          className="btn border border-white/20 text-soft-white"
          onClick={() => fileInputRef.current?.click()}
        >
          Import JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImport}
        />
        <button className="btn border border-white/20 text-soft-white" onClick={handleReset}>
          Reset seed
        </button>
      </div>
      <button className="btn bg-accent text-neutral-900" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminTopbar;
