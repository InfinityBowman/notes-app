import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { LuFilePlus } from 'react-icons/lu'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = () => {
    createEmptyNote()
  }

  return (
    <ActionButton {...props} onClick={handleCreation}>
      <LuFilePlus className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
