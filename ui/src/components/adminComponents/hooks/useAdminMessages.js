"use client";

import { useEffect, useState } from "react";

export function useAdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL|| "http://localhost:5000";
         const res = await fetch(`${proxyUrl}/messages`, {
          credentials: "include" //  backend sets cookies
        });
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, []);

  return { messages, loading, error };
}
