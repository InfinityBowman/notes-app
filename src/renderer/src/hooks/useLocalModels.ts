import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useChatModel } from '../contexts/ChatModelContext'

interface Model {
  name: string
  modified_at: string
  size: number
  digest: string
  details: {
    format: string
    family: string
    families: string | null
    parameter_size: string
    quantization_level: string
  }
}

export const useLocalModels = () => {
  const [models, setModels] = useState<Model[]>([])
  const { currentModel, changeModel } = useChatModel()

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:11434/api/tags')
        const data = await response.json()
        console.info('data', data)
        setModels(data.models)
      } catch (error) {
        console.error('Error fetching models:', error)
      }
    }

    fetchModels()
  }, [])

  if (!isEmpty(models)) {
    changeModel(models[0].name)
  }
  return models
}
