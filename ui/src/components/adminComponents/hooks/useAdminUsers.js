"use client";
import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";

export function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl("/admin/users"),
        {
          credentials: "include",
        });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load users.");
        return;
      }

      setUsers(data.users || []);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return { users, loading, error };
}
