import { type FromLanguage, type Language } from '../type.d'

export async function internalTranslate ({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ text, fromLanguage, toLanguage })
  }

  const response = await fetch('/api', options)
  const result = await response.json()
  return result
}
