import { HttpGetClient } from '@/infra/http'
import axios from 'axios'

export class AxiosHttpClient {
  async get <T = any> ({ url, params }: HttpGetClient.Params): Promise<T> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
