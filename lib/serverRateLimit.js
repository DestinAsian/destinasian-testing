const BUCKETS = new Map()

export function checkRateLimit({ key, limit, windowMs }) {
  const now = Date.now()
  const current = BUCKETS.get(key)

  if (!current || now > current.resetAt) {
    BUCKETS.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })

    return {
      limited: false,
      remaining: limit - 1,
      resetAt: now + windowMs,
    }
  }

  if (current.count >= limit) {
    return {
      limited: true,
      remaining: 0,
      resetAt: current.resetAt,
    }
  }

  current.count += 1
  BUCKETS.set(key, current)

  return {
    limited: false,
    remaining: limit - current.count,
    resetAt: current.resetAt,
  }
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']

  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }

  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0]
  }

  return req.socket?.remoteAddress || 'unknown'
}
