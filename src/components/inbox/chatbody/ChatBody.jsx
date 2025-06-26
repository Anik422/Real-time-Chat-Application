// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import gravatarUrl from "gravatar-url";
import Error from "../../ui/Error";

export default function ChatBody() {

    const { id } = useParams();

    const { data: messages, isLoading, isError, error } = useGetMessagesQuery(id);

    // const { sender } = messages[0]
    // const { name, email } = sender | {}
    let content = null;
    if (isLoading) {
        content = <div >
            Loading messages...
        </div>;
    } else if (!isLoading && isError) {
        content = <div><Error message={error?.data || "Something went wrong"} /></div>
    } else if (!isLoading && !isError && messages?.length === 0) {
        content = <>
            <ChatHead />
            <div className="text-gray-500 *:flex items-center justify-center h-full text-lg font-semibold p-4 rounded-md bg-gray-100 shadow-md mt-4 lg:mt-0 lg:col-span-2 lg:h-auto lg:p-6 lg:shadow-none lg:bg-transparent lg:border lg:border-gray-300 lg:rounded-lg lg:flex-col lg:items-start lg:justify-start lg:text-left lg:w-full lg:max-w-md lg:mx-auto lg:my-4 lg:space-y-2" 
            >No messages found</div>
        </>;
    } else if (!isLoading && !isError && messages?.length > 0) {
        content = <>
            <ChatHead
                message={messages[0]}
            />
            <Messages messages={messages} />
            <Options />
        </>;
    }
    else {
        content = <div className="text-gray-500">No messages found</div>;
    }

    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
                {content}
            </div>
        </div>
    );
}
