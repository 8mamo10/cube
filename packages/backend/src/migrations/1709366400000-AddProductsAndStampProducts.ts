import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductsAndStampProducts1709366400000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create products table
    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" character varying,
        "active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_products" PRIMARY KEY ("id")
      )
    `);

    // Create stamp_products junction table
    await queryRunner.query(`
      CREATE TABLE "stamp_products" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "stamp_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "quantity" integer NOT NULL,
        CONSTRAINT "PK_stamp_products" PRIMARY KEY ("id"),
        CONSTRAINT "CHK_quantity_positive" CHECK ("quantity" > 0),
        CONSTRAINT "FK_stamp_products_stamp" FOREIGN KEY ("stamp_id")
          REFERENCES "stamps"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_stamp_products_product" FOREIGN KEY ("product_id")
          REFERENCES "products"("id") ON DELETE RESTRICT
      )
    `);

    // Create indexes for better query performance
    await queryRunner.query(`
      CREATE INDEX "IDX_stamp_products_stamp_id" ON "stamp_products" ("stamp_id")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_stamp_products_product_id" ON "stamp_products" ("product_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`DROP INDEX "IDX_stamp_products_product_id"`);
    await queryRunner.query(`DROP INDEX "IDX_stamp_products_stamp_id"`);

    // Drop tables
    await queryRunner.query(`DROP TABLE "stamp_products"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
