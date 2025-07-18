
import React, { use } from "react";
import gravatarUrl from "gravatar-url";
import { useSelector } from "react-redux";

export default function ChatHead({ message = {} }) {
    const {user} = useSelector((state) => state.auth) || {};
    const { email, name } = user || {};
    const { sender, receiver } = message;
    const { email: senderEmail, name: senderName } = sender || {};
    const partnerEmail = sender?.email === email ? receiver?.email : sender?.email;
    const partnerName = sender?.name === name ? receiver?.name : sender?.name;
    return (
        <div className="relative flex items-center p-3 border-b border-gray-300">
            <img
                className="object-cover w-10 h-10 rounded-full"
                src={gravatarUrl(partnerEmail || "unknown@example.com", { s: "80", d: "retro" })}
                alt={partnerName || "User Avatar"}
            />
            <span className="block ml-2 font-bold text-gray-600">{partnerName || "Unknown"}</span>
        </div>
    );
}
