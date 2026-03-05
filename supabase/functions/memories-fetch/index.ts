import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: "user_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("OG_PRIVATE_KEY");
    console.log("OG_PRIVATE_KEY length:", apiKey?.length, "prefix:", apiKey?.substring(0, 6), "suffix:", apiKey?.substring((apiKey?.length ?? 0) - 4));
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const trimmedKey = apiKey.trim();
    const url = `https://api.memchat.io/v1/memories?user_id=${encodeURIComponent(user_id)}&page=1&page_size=10`;
    
    console.log("Fetching:", url);
    console.log("Using header: X-API-Key, key length:", trimmedKey.length);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": trimmedKey,
        "Content-Type": "application/json",
      },
    });

    const responseText = await response.text();
    console.log("MemSync status:", response.status);
    console.log("MemSync response:", responseText.substring(0, 500));

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `MemSync returned ${response.status}`, details: responseText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(responseText, {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
