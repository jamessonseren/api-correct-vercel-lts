import RepositoryInterface from '../../../@shared/domain/repository/repository-interface';
import { BenefitsEntity } from '../entities/benefit.entity';

export interface IBenefitsRepository extends RepositoryInterface<BenefitsEntity> {
}
