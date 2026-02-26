const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

function getTargetUrl(req) {
  const base = `${WORDPRESS_URL?.replace(/\/$/, '')}/index.php?graphql`;
  const queryString = req.url?.split('?')[1];

  if (queryString) {
    return `${base}&${queryString}`;
  }

  return base;
}

export default async function handler(req, res) {
  if (!WORDPRESS_URL) {
    res.status(500).json({ error: 'NEXT_PUBLIC_WORDPRESS_URL is not set' });
    return;
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const targetUrl = getTargetUrl(req);
    const headers = {
      accept: req.headers.accept || 'application/json',
      'content-type': req.headers['content-type'] || 'application/json',
    };

    if (req.headers.authorization) {
      headers.authorization = req.headers.authorization;
    }

    const wpResponse = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    const responseText = await wpResponse.text();
    res.status(wpResponse.status);
    res.setHeader(
      'content-type',
      wpResponse.headers.get('content-type') || 'application/json',
    );
    res.send(responseText);
  } catch (error) {
    res.status(502).json({
      error: 'GraphQL proxy failed',
      message: error instanceof Error ? error.message : 'Unknown proxy error',
    });
  }
}
