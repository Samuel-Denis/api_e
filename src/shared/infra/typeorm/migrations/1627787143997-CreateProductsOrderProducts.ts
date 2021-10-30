import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProductsOrderProducts1627787143997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orderProducts',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'pedido_id',
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
                        name: 'valor',
                        type: 'float4'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                      name: 'FKPedido',
                      referencedTableName: 'pedidos',
                      referencedColumnNames: ['id'],
                      columnNames: ['pedido_id'],
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
        await queryRunner.dropTable('orderProducts')
    }

}
