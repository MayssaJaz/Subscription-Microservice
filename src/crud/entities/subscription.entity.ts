import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  idSubscription: string;
  @Column()
  email: string;
  @Column()
  idProduct: string;
}
