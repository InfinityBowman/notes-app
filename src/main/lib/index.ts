import { ensureDir, readdir, readFile, stat } from 'fs-extra'
import { homedir } from 'os'
import { appDirectoryName, fileEncoding, fileExtension } from '../../shared/constants'
import { NoteInfo } from '../../shared/models'
import { GetNotes, ReadNote } from '../../shared/types'
export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, { encoding: fileEncoding, withFileTypes: false })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith(`.${fileExtension}`))

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)
  return {
    title: fileName.replace(new RegExp(`\\.${fileExtension}$`), ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRootDir()
  return await readFile(`${rootDir}/${fileName}.${fileExtension}`, { encoding: fileEncoding })
}
