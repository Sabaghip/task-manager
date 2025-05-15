import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { IEnvVars } from 'src/config/config.interface';
import { JwtPayload } from '../auth/type/jwt.payload';

@WebSocketGateway({ cors: true })
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService<IEnvVars>,
    ) { }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket) {
        const token = client.handshake.auth.token || client.handshake.query.token;
        if (!token) {
            console.log('No token provided');
            client.disconnect();
            return;
        }
        const secret = this.configService.get('JWT_ACCESS_SECRET');
        const payload = this.jwtService.verify<JwtPayload>(token, { secret });
        client.data.user = payload;
        client.join(payload.sub)
    }

    async sendNotificationToUser(userId: string, message: string) {
        await this.server.to(userId).emit('notification', { message });
    }
}