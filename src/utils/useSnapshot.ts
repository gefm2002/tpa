import { useEffect, useState } from "react";
import type { Snapshot } from "../types";
import { getSnapshot } from "./storage";

const useSnapshot = (): Snapshot => {
  const [snapshot, setSnapshot] = useState(getSnapshot());

  useEffect(() => {
    const handleUpdate = () => setSnapshot(getSnapshot());
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("tpa_snapshot_update", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("tpa_snapshot_update", handleUpdate);
    };
  }, []);

  return snapshot;
};

export default useSnapshot;
