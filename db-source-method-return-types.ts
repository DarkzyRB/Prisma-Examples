import {Inject, Service} from "typedi";
import {PrismaClient, Services, Client} from "@prisma/client";

@Service('services.db.source')
export default class ServicesDBSource {
    constructor(
        @Inject('PrismaClient') private readonly db: PrismaClient
    ) {
    }

    async getServiceWithClient(id: number): Promise<ServiceWithClient> {
        return await this.db.service.findUnique({
            where: { id: id },
            include: { client: true }
        });
    }
}

// ! Types results
export type ServiceWithClient = Services & { client: Client | null} | null;

