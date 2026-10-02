import { Fragment } from 'react'

/**
 * Muestra texto con fragmentos de código en línea:
 * `campo` → <code>campo</code>; ``campo`` → <code>`campo`</code> (conserva los backticks, p. ej. identificadores DQL).
 */
export function InlineText({ text }: { text: string }) {
  const parts: (string | { code: string })[] = []
  const pattern = /``(.+?)``|`([^`]+)`/g
  let last = 0
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    parts.push({ code: match[1] !== undefined ? `\`${match[1]}\`` : match[2] })
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts.map((part, index) => typeof part === 'string' ? <Fragment key={index}>{part}</Fragment> : <code className="inline-code" key={index}>{part.code}</code>)}</>
}
