"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)();
exports.dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'stampcard',
    password: process.env.DB_PASSWORD || 'stampcard_dev_password',
    database: process.env.DB_DATABASE || 'stampcard_dev',
    entities: [(0, path_1.join)(__dirname, '..', '**', '*.entity{.ts,.js}')],
    migrations: [(0, path_1.join)(__dirname, '..', 'migrations', '*{.ts,.js}')],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=database.config.js.map