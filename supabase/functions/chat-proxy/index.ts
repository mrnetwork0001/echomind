import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const BACKEND_BASE = "http://38.49.216.120:8000/chat";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { user_id, message, username } = await req.json();

    const response = await fetch(BACKEND_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, message, username }),
    });

    const responseText = await response.text();
    console.log("Backend status:", response.status);
    console.log("Backend response:", responseText);

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Backend returned ${response.status}`, details: responseText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and check for application-level errors
    try {
      const parsed = JSON.parse(responseText);
      if (parsed.error) {
        console.log("Backend returned error in response body:", parsed.error);
      }
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch {
      return new Response(responseText, {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
