import { useMutation } from '@tanstack/react-query'
import { CreateLeadDto, LeadResponse } from '@shared/types/types'
import { message } from 'antd'
import { leadService } from '@shared/Services/HouseService/houseService'

export const useCreateLead = () => {
  return useMutation<LeadResponse, Error, CreateLeadDto>({
    mutationFn: (dto: CreateLeadDto) => leadService.create(dto),

    onMutate: async () => {},

    onSuccess: () => {
      message.success(
        'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
      )
    },

    onError: error => {
      console.error('Ошибка при отправке заявки:', error)
      message.error(
        'Не удалось отправить заявку. Пожалуйста, попробуйте позже.',
      )
    },

    onSettled: () => {},
  })
}
