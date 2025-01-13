import { ActionButton, ActionButtonProps } from '@/components'
import { LuFilePlus } from 'react-icons/lu'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <LuFilePlus className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
