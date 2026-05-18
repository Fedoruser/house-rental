import { useQuery } from '@tanstack/react-query'

import { CatalogApiResponse } from '@shared/types/types'
import { houseService } from '@shared/Services/HouseService/houseService'

export const useHouses = () => {
  return useQuery<CatalogApiResponse, Error>({
    queryKey: ['houses'],
    queryFn: houseService.getAll,

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
