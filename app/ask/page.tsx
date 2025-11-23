import { currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { chatModels, DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  const initialChatModel =
    modelIdFromCookie &&
    chatModels.some((m) => m.id === modelIdFromCookie.value)
      ? modelIdFromCookie.value
      : DEFAULT_CHAT_MODEL;

  return (
    <>
      <Chat
        autoResume={false}
        id={id}
        initialChatModel={initialChatModel}
        initialMessages={[]}
        initialVisibilityType="private"
        isReadonly={false}
        key={id}
      />
      <DataStreamHandler />
    </>
  );
}
