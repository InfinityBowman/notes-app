export interface ChatMessage {
  text: string
  sender: 'user' | 'assistant'
}

export interface ChatModel {
  id: string
  name: string
  description: string
}
