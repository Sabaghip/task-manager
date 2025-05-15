import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
    constructor(private readonly gateway: NotificationGateway) { }

    async notifyUser(userId: string, message: string) {
        await this.gateway.sendNotificationToUser(userId, message);
    }
}