"use client";

import { useEffect, useState } from "react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const proxyUrl =
          process.env.NEXT_PUBLIC_PROXY_URL||"http://localhost:5000";

        const res = await fetch(`${proxyUrl}/messages`); 
        if (!res.ok) throw new Error("Failed to fetch messages");

        const data = await res.json();
        setMessages(Array.isArray(data) ? data : data?.messages || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  // 🔍 Filter messages
  const filteredMessages = messages.filter((msg) =>
    `${msg.name} ${msg.email} ${msg.message}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 animate-pulse">Loading messages...</p>
      </div>
    );

  if (error)
    return (
      <p className="p-6 text-red-500 text-center font-medium">
        Error: {error}
      </p>
    );

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
         
        </div>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-10 text-center">
          <p className="text-gray-500">No messages found.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                {/* Profile Initial */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">
                  {msg.name?.charAt(0).toUpperCase()}
                </div>

                {/* Message Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-gray-800">{msg.name}</h2>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">{msg.email}</p>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
