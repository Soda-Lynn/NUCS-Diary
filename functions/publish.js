export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    if (!data.content) {
      return new Response("No content", { status: 400 });
    }

    const id = Math.random().toString(36).slice(2, 8);

    await env.POSTS.put(id, JSON.stringify({
      title: data.title,
      content: data.content,
      ogImage: data.ogImage || ""
    }));

    return new Response(JSON.stringify({ url: `/p/${id}` }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
}
