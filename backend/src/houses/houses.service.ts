import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Review, Prisma } from '../../generated/prisma';
import { CreateLeadDto, LeadSource } from './dto/create-lead.dto';

export type HouseWithFeatures = Prisma.HouseGetPayload<{
  include: {
    features: {
      select: {
        icon: true;
        label: true;
      };
    };
  };
}>;

export interface LandingDataResponse {
  catalog: Record<string, HouseWithFeatures[]>;
  allHouses: HouseWithFeatures[];
  reviews: Review[];
}

@Injectable()
export class HousesService {
  constructor(private readonly prisma: PrismaService) {}

  async getLandingData(): Promise<LandingDataResponse> {
    const houses = (await this.prisma.house.findMany({
      include: {
        features: {
          select: {
            icon: true,
            label: true,
          },
        },
      },
    })) as HouseWithFeatures[];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const reviews = (await this.prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
    })) as Review[];

    const catalog = houses.reduce<Record<string, HouseWithFeatures[]>>(
      (acc, house) => {
        const category = house.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(house);
        return acc;
      },
      {},
    );

    return {
      catalog,
      allHouses: houses,
      reviews,
    };
  }

  async createLead(dto: CreateLeadDto) {
    try {
      const newLead = await this.prisma.lead.create({
        data: {
          name: dto.name || '',
          phone: dto.phone || '',
          message: dto.message,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          source: (dto.source as any) || LeadSource.CONTACTS_FORM,
          status: 'NEW',
        },
      });

      return {
        success: true,
        data: newLead,
      };
    } catch (error) {
      console.error('Ошибка сохранения лида в базу:', error);
      throw new InternalServerErrorException('Не удалось сохранить заявку');
    }
  }
}
