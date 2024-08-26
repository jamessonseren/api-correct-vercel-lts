import RepositoryInterface from '../../../@shared/domain/repository/repository-interface';
import { Uuid } from '../../../@shared/ValueObjects/uuid.vo';
import { BenefitsEntity } from '../entities/benefit.entity';

export interface IBenefitsRepository extends RepositoryInterface<BenefitsEntity> {
  findByName(name: string):Promise<BenefitsEntity | null>
  findWithBranches(id: string):Promise<any[]>
}
