import {Umzug, SequelizeStorage} from 'umzug';
import {sequelize} from './index.js';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const umzug = new Umzug({
    migrations: {
        glob: resolve(__dirname, '../migrations/*.js'),
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({sequelize}),
    logger: console,
});


/**
 * Run all pending migrations
 * @returns {Promise<void>}
 */
export const runMigrations = async () => {
    try {
        await umzug.up();
        console.log('✅ All migrations have been successfully applied.');
    } catch (error) {
        console.error('❌ Error applying migrations:', error);
    }
};

/**
 * Revert the last migration
 */
export const revertLastMigration = async () => {
    try {
        await umzug.down();
        console.log('🔄 The last migration was successfully reverted.');
    } catch (error) {
        console.error('❌Error while rolling revert migration:', error);
    }
};

/**
 * Checks the status of migrations
 */
export const getMigrationsStatus = async () => {
    try {
        const executed = await umzug.executed();
        const pending = await umzug.pending();

        console.log('✅ Completed migrations:', executed.map(m => m.name));
        console.log('⏳ Pending migration:', pending.map(m => m.name));
    } catch (error) {
        console.error('❌ Error getting migration status:', error);
    }
};
