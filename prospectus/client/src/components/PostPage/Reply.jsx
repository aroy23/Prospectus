import React from "react";

export default function Reply({ reply }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg border mt-2">
      <p className="text-sm font-medium">@{reply.username}</p>
      <p className="mt-1">{reply.text}</p>
      <p className="text-xs text-gray-500 mt-2">
        {new Date(reply.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
