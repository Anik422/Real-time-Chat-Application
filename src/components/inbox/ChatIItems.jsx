import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import ChatItem from "./ChatItem";
import Error from "../ui/Error";
import moment from "moment";
import getPartnerInfo from "../../utils/getPartnerInfo";
import gravatarUrl from "gravatar-url";
import { Link } from "react-router-dom";


export default function ChatItems() {

    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};
    const { data: conversations, isLoading, isError, error } = useGetConversationsQuery(email);

    // decide what to render based on the state of the query
    let content = null;
    if (isLoading) {
        content = <li className="m-2 text-center">Loading...</li>;
    } else if (!isLoading && isError) {
        content = <Error message={error?.data || "Something went wrong"} />;
    } else if (!isLoading && !isError && conversations?.length === 0) {
        content = <li className="m-2 text-center">No conversations found</li>;
    } else if (!isLoading && !isError && conversations?.length > 0) {
        content = conversations.map((conversation) => {
            const { id, message, users, timestamp } = conversation;
            const { name, email: partnerEmail } = getPartnerInfo(users, email);
            return (
                <li key={id}>
                    <Link to={`/inbox/${id}`}>
                        <ChatItem
                            avatar={gravatarUrl(partnerEmail, { s: "80", d: "retro" })}
                            name={name || "Unknown"}
                            lastMessage={message || "No message"}
                            lastTime={moment(timestamp).fromNow() || "Just now"}
                        />
                    </Link>
                </li>
            );
        });
    } else {
        content = <li className="m-2 text-center">No conversations found</li>;
    }

    return (
        <ul>
            {content}
        </ul>
    );
}
