import { useState } from 'react'

export const useChatModel = () => {
  const [currentModel, setCurrentModel] = useState('defaultModel')

  const changeModel = (newModel: string) => {
    console.info('newModel', newModel)
    setCurrentModel(newModel)
  }

  return { currentModel, changeModel }
}
