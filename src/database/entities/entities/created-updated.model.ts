import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreatedUpdatedModel {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  updatedAt: Date;
}
