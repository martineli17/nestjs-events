import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class AddTableUser1667173849706 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: 'email',
                    type: "varchar",
                },
                {
                    name: 'name',
                    type: "varchar",
                },
                {
                    name: 'createdAt',
                    type: "date",
                },
                {
                    name: 'id',
                    type: "date",
                    default: "new()"
                }
            ] ,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('user');
    }
}
