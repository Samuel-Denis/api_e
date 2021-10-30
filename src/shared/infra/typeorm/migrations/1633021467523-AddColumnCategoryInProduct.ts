import {Column, MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddColumnCategoryInProduct1633021467523 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products',
         new TableColumn(
            {
                name: 'category_id',
                type: 'uuid',
                isNullable: true
            },
         ));

         await queryRunner.createForeignKey('products', new TableForeignKey( 
            {
              name: 'FKCategory',
              referencedTableName: 'categories',
              referencedColumnNames: ['id'],
              columnNames: ['category_id'],
              onDelete: "SET NULL",
              onUpdate: "SET NULL",
            } 
         ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("products", "FKCategory");
        await queryRunner.dropColumn("products", "category_id")
    }

}
