import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePedidoUser1627786728343 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'pedidos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'valor_total',
                        type: 'float4'
                    },
                    {
                        name: 'taxa_entrega',
                        type: 'float4'
                    },
                    {
                        name: 'numero_pedido',
                        type: 'serial',
         
                    },
                    {
                        name: 'status_pedido',
                        type: 'int4',
                        default: '1'
         
                    },
                    {
                        name: 'is_entrega',
                        type: 'boolean',
                        default: false
         
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
                    name: 'FKCategoryUser',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                  },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pedidos')
    }

}
