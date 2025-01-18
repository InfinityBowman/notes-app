import { isEmpty } from 'lodash'
import { useState } from 'react'
import { useChatModel } from '../contexts/ChatModelContext'
import { useChat } from '../hooks/useChat'
import { useLocalModels } from '../hooks/useLocalModels'

export const AIChat = () => {
  const { sendMessage, messages } = useChat()
  const { currentModel, changeModel } = useChatModel()
  const [input, setInput] = useState('')
  const models = useLocalModels()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage(input)
      setInput('')
    }
  }

  if (isEmpty(models)) {
    return (
      <div className="p-4">
        <span>No models found</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col p-4 border rounded-md w-full">
      <select
        value={currentModel}
        onChange={(e) => changeModel(e.target.value)}
        className="mb-2 text-black"
      >
        {models.map((model, index) => (
          <option key={index} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>
      <div className="overflow-auto h-64 border p-2 mb-2">
        {messages.map((msg, index) => (
          <div key={index} className="mb-1">
            <strong>{msg.sender === 'user' ? 'User' : 'AI'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex text-black">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border rounded-md p-2"
          placeholder="Type your message..."
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md">
          Send
        </button>
      </form>
    </div>
  )
}
