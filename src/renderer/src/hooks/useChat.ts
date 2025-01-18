import { useState } from 'react'
import { useChatModel } from '../contexts/ChatModelContext'
import { ChatMessage } from '../types/types'

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const { currentModel } = useChatModel()

  const sendMessage = async (text) => {
    const newMessage: ChatMessage = { text, sender: 'user' }
    setMessages((prev) => [...prev, newMessage])

    try {
      console.info('usechatmodel', currentModel, text)
      const response = await fetch(`http://localhost:11434/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: currentModel,
          messages: [
            ...messages.map((msg) => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            { role: 'user', content: text }
          ],
          stream: true
        })
      })
      // const data = await response.json()
      // console.info('chat response data', response, data)
      // console.info(data.message['content'])

      if (!response.body) {
        throw new Error('Stream failed')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      const botMessage: ChatMessage = { text: '', sender: 'assistant' }

      let done = false
      while (!done) {
        const { done: readerDone, value } = await reader.read()
        done = readerDone

        const chunk = decoder.decode(value, { stream: true })
        try {
          const json = JSON.parse(chunk)
          if (json.message && json.message.content) {
            botMessage.text += json.message.content
            setMessages((prev) => {
              const updatedMessages = [...prev]
              updatedMessages[updatedMessages.length - 1] = botMessage
              return updatedMessages
            })
          }
        } catch (e) {
          console.error('Error parsing JSON chunk:', e)
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return {
    messages,
    sendMessage
  }
}
