import z from 'zod'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'

const translation = z.object({
  text: z.string({ invalid_type_error: 'Text have to be a string' }).min(1).max(200),
  fromLanguage: z.string().refine((lang) => {
    return [...Object.keys(SUPPORTED_LANGUAGES), AUTO_LANGUAGE].includes(lang)
  }, { message: 'Invalid language' }),
  toLanguage: z.string().refine((lang) => {
    return [...Object.keys(SUPPORTED_LANGUAGES)].includes(lang)
  }, { message: 'Invalid language' })
})

export function validateTranslation (data: any) {
  return translation.safeParse(data)
}
