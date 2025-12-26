export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    if (!data.content) return new Response("No content", { status: 400 });

    const id = Math.random().toString(36).slice(2, 8); // random post ID
    await env.POSTS.put(id, data.content); // save in KV

    return new Response(JSON.stringify({ url: `/p/${id}` }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
