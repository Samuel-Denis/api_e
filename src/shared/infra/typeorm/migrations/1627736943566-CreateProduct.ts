import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProduct1627436943566 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'estoque',
                        type: 'integer'
                    },
                    {
                        name: 'valor',
                        type: 'float4',
                        isNullable: false
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
