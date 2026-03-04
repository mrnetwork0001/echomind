import { supabase } from "@/integrations/supabase/client";

export interface ChatResponse {
  response: string;
  [key: string]: unknown;
}

export async function sendChatMessage(userId: string, message: string): Promise<ChatResponse> {
  const { data, error } = await supabase.functions.invoke("chat-proxy", {
    body: { user_id: userId, message },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}
