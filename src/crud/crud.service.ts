import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCrudDto } from './dto/create-crud.dto';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}
  async create(createCrudDto: CreateCrudDto) {
    const subscription = this.subscriptionRepository.create(createCrudDto);
    if (await this.find(createCrudDto.email, createCrudDto.idProduct)) {
      console.log(this.find(createCrudDto.email, createCrudDto.idProduct));
      throw new ConflictException(
        `Subscription to this product already exists`,
      );
    } else {
      try {
        await this.subscriptionRepository.save(subscription);
      } catch (e) {
        throw new ForbiddenException(`Access was denied`);
      }
      return {
        email: subscription.email,
        idProduct: subscription.idProduct,
      };
    }
  }

  async findAllSubscriptionsOnProduct(idProduct: string) {
    const subscriptions = await this.subscriptionRepository.find({
      where: { idProduct: idProduct },
    });
    if (subscriptions.length) {
      return subscriptions;
    } else {
      throw new NotFoundException('No Subsriptions found to this product');
    }
  }
  async findAllSubscriptionsUser(email: string) {
    const subscriptions = await this.subscriptionRepository.find({
      where: { email: email },
    });
    if (subscriptions.length) {
      return subscriptions;
    } else {
      throw new NotFoundException('No Subsriptions found for this user');
    }
  }

  async find(email: string, idProduct: string) {
    const subscription = await this.subscriptionRepository.find({
      where: { email: email, idProduct: idProduct },
    });
    if (subscription.length) {
      return true;
    } else {
      return false;
    }
  }

  async removeSubscriptionsProduct(idProduct: string) {
    const sucbscriptionsToRemove = await this.findAllSubscriptionsOnProduct(
      idProduct
    );
    const subscriptions = await this.subscriptionRepository.remove(
      sucbscriptionsToRemove,
    );
    return subscriptions;
  }

  async removeSubscriptionsUser(email: string) {
    const sucbscriptionsToRemove = await this.findAllSubscriptionsUser(email);
    const subscriptions = await this.subscriptionRepository.remove(
      sucbscriptionsToRemove,
    );
    return subscriptions;
  }
}
