import { Injectable, Logger } from '@nestjs/common'
import { TaskRepo } from '../task.repository'
import { Cron, CronExpression } from '@nestjs/schedule'
import { NotificationService } from '../../../modules/notification/notification.service'
import { TaskStatus } from '@prisma/client'

@Injectable()
export class JobService {
    constructor(
        private readonly TaskRepository: TaskRepo,
        private readonly notificationService: NotificationService
    ) { }
    private readonly logger = new Logger(JobService.name)

    @Cron(CronExpression.EVERY_30_SECONDS)
    async changeTaskStatus() {
        this.logger.log('Called every 30 seconds for changing tasks status.', new Date())
        const expiredTasks = await this.TaskRepository.findManyExpiredTasks()

        for (const expiredTask of expiredTasks) {
            await this.TaskRepository.update(expiredTask.id, { status: TaskStatus.CANCELED })
            await this.notificationService.notifyUser(expiredTask.userId, `Task ${expiredTask.title} deadline passed and status changed to CANCELED.`)
        }
    }
}
