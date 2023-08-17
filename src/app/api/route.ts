import { NextResponse } from 'next/server'
import { validateTranslation } from '../schemas/translationSchema'
import { type FromLanguage, type Language } from '../type.d'
import {translate} from './translate'
export function GET () {
  return NextResponse.json({ hello: 'world' })
}

export async function POST (request: any) {
  const data = await request.json()

  const validated = validateTranslation(data)

  if (!validated.success) {
    return NextResponse.json({ error: validated.error })
  }

  interface Translation {
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string
  }

  const { fromLanguage, toLanguage, text } = data as Translation

  const result = await translate({ fromLanguage, toLanguage, text })
  return NextResponse.json({ result })
}
