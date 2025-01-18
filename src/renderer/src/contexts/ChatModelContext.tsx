import { createContext, ReactNode, useContext, useState } from 'react'

interface ChatModelContextType {
  currentModel: string
  changeModel: (newModel: string) => void
}

const ChatModelContext = createContext<ChatModelContextType | undefined>(undefined)

export const ChatModelProvider = ({ children }: { children: ReactNode }) => {
  const [currentModel, setCurrentModel] = useState('defaultModel')

  const changeModel = (newModel: string) => {
    console.info('newModel', newModel)
    setCurrentModel(newModel)
  }

  return (
    <ChatModelContext.Provider value={{ currentModel, changeModel }}>
      {children}
    </ChatModelContext.Provider>
  )
}

export const useChatModel = () => {
  const context = useContext(ChatModelContext)
  if (!context) {
    throw new Error('useChatModel must be used within a ChatModelProvider')
  }
  return context
}
