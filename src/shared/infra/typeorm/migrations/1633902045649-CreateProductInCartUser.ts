import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProductInCartUser1633902045649 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cartProducts',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'cart_id',
                        type: 'uuid'
                    },
                    {
                        name: 'product_id',
                        type: 'uuid'
                    },
                    {
                        name: 'quantidade',
                        type: 'int4'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                      name: 'FKPedido',
                      referencedTableName: 'cartUser',
                      referencedColumnNames: ['id'],
                      columnNames: ['cart_id'],
                      onDelete: 'CASCADE',
                      onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKProduct',
                        referencedTableName: 'products',
                        referencedColumnNames: ['id'],
                        columnNames: ['product_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                      },
                  ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cartProducts')
    }

}
