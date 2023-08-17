import { type FC } from 'react'
import { SectionType } from '../type.d'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea: FC<Props> = ({ type, loading, value, onChange }) => {
  const customStyles = type === SectionType.From
    ? 'h-32'
    : 'bg-gray-100'

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <textarea
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SectionType.From}
      disabled={type === SectionType.To}
      className={`resize-none dark:bg-zinc-800 dark:text-gray-100
      block w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring focus:border-blue-500 h-48 ${customStyles}`}
      value={value}
      onChange={handleChange}
    ></textarea>
  )
}
