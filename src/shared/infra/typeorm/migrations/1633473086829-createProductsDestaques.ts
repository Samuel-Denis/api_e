import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProductsDestaques1633473086829 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'destaques',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'product_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                        isNullable: true
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
                        name: 'FKProduct',
                        referencedTableName: 'products',
                        referencedColumnNames: ['id'],
                        columnNames: ['product_id'],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    } 
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('destaques');
    }

}
