'use client'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './type.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { useDebounce } from './hooks/useDebounce'
import { internalTranslate } from './services/internalTranslate'

export default function Home () {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debounceFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debounceFromText === '') return

    const translateAndSetResult = async () => {
      const result = await internalTranslate({
        fromLanguage,
        toLanguage,
        text: debounceFromText
      })
      return result
    }

    translateAndSetResult()
      .then(result => {
        setResult(result.result)
      })
      .catch(error => error)
  }, [debounceFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <main className='h-screen mx-auto flex flex-col items-center justify-center
    dark:bg-neutral-900 dark:text-gray-100'>
      <h1 className="text-5xl font-bold text-center p-10">
        Google Translate
      </h1>
      <div className='container mx-auto flex gap-6 justify-center items-center'>
        <div className='flex flex-col gap-2'>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage} />
          <TextArea
            type={SectionType.From}
            value={fromText}
            onChange={setFromText}
            loading={loading}
          />
        </div>

        <div className='flex justify-center items-center align-top'>
          <button disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}
            className='text-white font-bold'
          >
            <ArrowsIcon />
          </button>
        </div>

        <div className='flex flex-col gap-2 relative'>
          <LanguageSelector
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage} />
          <TextArea
            type={SectionType.To}
            value={result}
            onChange={setResult}
            loading={loading}
          />
          <div className='absolute flex left-1 bottom-1 gap-1'>
            <button className=''
            onClick={handleClipboard}>
              <ClipboardIcon />
            </button>
            <button className=''
            onClick={handleSpeak}>
              <SpeakerIcon />
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}
