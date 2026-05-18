import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';

export enum LeadSource {
  HERO_FORM = 'hero_form',
  CONTACTS_FORM = 'contacts_form',
}

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Номер телефона обязателен для заполнения' })
  phone!: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsEnum(LeadSource, { message: 'Некорректный источник заявки' })
  @IsOptional()
  source?: string = LeadSource.CONTACTS_FORM;
}
