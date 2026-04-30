"use client";
import { useEffect, useState } from "react";

export function useAdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL || "http://localhost:5000";
      // const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL;
      const res = await fetch(`${proxyUrl}/orders/admin/all`,
        {
          credentials: "include",
        });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load orders.");
        return;
      }

      setOrders(data.orders || []);
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, orderStatus) => {
    try {
      const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL || "http://localhost:5000";
      const res = await fetch(`${proxyUrl}/orders/admin/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderStatus }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to update order.");
        return;
      }

      setOrders((current) =>
        current.map((order) => (order._id === orderId ? data.order : order))
      );
    } catch {
      setError("Failed to update order.");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return { orders, loading, error, updateStatus };
}
