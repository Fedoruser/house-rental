import { apiClient } from '@shared/api'

import {
  CatalogApiResponse,
  CreateLeadDto,
  House,
  LeadResponse,
} from '@shared/types/types'

export const houseService = {
  getAll: async (): Promise<CatalogApiResponse> => {
    const response = await apiClient.get<CatalogApiResponse>('/houses/landing')

    return response.data
  },

  getById: async (id: number): Promise<House> => {
    const response = await apiClient.get<House>(`/houses/${id}`)

    return response.data
  },
}

export const leadService = {
  create: async (dto: CreateLeadDto): Promise<LeadResponse> => {
    const response = await apiClient.post<LeadResponse>('/houses/leads', dto)

    return response.data
  },
}
