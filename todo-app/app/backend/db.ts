import {AppDataSource} from "@/app/backend/config/datasource";

export const initializeDatabase = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        return AppDataSource;
    } catch (error) {
        throw error;
    }
};
