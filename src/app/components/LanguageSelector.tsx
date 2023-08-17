import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { type FC } from 'react'
import { type Language, type FromLanguage, SectionType } from '../type.d'

type Props =
    | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector: FC<Props> = ({ onChange, type, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <select className='dark:bg-zinc-800 dark:text-blue-200 text-blue-700 rounded-md border-solid border-2 border-gray-200' onChange={handleChange} value={value}>
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>{literal}</option>
      ))}
    </select>
  )
}
