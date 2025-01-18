import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { ChatModelProvider } from '../contexts/ChatModelContext'
import { AIChat } from './AIChat'

export const AssistBar = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={twMerge('flex h-30 overflow-auto mx-4 rounded-md', className)} {...props}>
      {children}
      <ChatModelProvider>
        <AIChat />
      </ChatModelProvider>
    </div>
  )
}
