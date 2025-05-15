import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/modules/app.module';

describe('Users API (integration)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('GET /users - should return all users', async () => {
        const signUp = (await request(app.getHttpServer()).post('/auth/signup').send({ email: "eeeeeee3r6utyu8t@gmail.com", password: "123456", mobile: "09333333340", fullName: "test testi" }));
        expect(signUp.status).toBe(201);
        expect(signUp.body.fullName).toBe("test testi");

        const login = (await request(app.getHttpServer()).post('/auth/login').send({ email: "eeeeeee3r6utyu8t@gmail.com", password: "123456" }));
        expect(login.status).toBe(201);
        expect(login.body.fullName).toBe("test testi");

        const profile = ((await request(app.getHttpServer()).get('/user').set('Authorization', `Bearer ${login.body.accessToken}`)));
        expect(profile.status).toBe(200);
        expect(profile.body.fullName).toBe("test testi");

        const updateProfile = ((await request(app.getHttpServer()).put('/user').set('Authorization', `Bearer ${login.body.accessToken}`).send({ fullName: "test22" })));
        expect(updateProfile.status).toBe(200);
        expect(updateProfile.body.fullName).toBe("test22");

        const createCategory = ((await request(app.getHttpServer()).post('/category').set('Authorization', `Bearer ${login.body.accessToken}`).send({ title: "test category" })));
        expect(createCategory.status).toBe(201);
        expect(createCategory.body.title).toBe("test category");

        const categories = ((await request(app.getHttpServer()).get('/category').set('Authorization', `Bearer ${login.body.accessToken}`)));
        expect(categories.status).toBe(200);
        expect(categories.body.length).toBe(1);

        const category = ((await request(app.getHttpServer()).get(`/category/${categories.body[0].id}`).set('Authorization', `Bearer ${login.body.accessToken}`)));
        expect(category.status).toBe(200);
        expect(category.body.title).toBe("test category");

        const updateCategory = ((await request(app.getHttpServer()).put(`/category/${categories.body[0].id}`).set('Authorization', `Bearer ${login.body.accessToken}`).send({ title: "test 22" })));
        expect(updateCategory.status).toBe(200);
        expect(updateCategory.body.title).toBe("test 22");


        const createTask = ((await request(app.getHttpServer()).post('/task').set('Authorization', `Bearer ${login.body.accessToken}`).send({ title: "test task", description: "test task desc", priority: "HIGH", deadLine: "2026-10-01T12:00:00Z", categoryId: category.body.id })));
        expect(createTask.status).toBe(201);
        expect(createTask.body.title).toBe("test task");

        const tasks = ((await request(app.getHttpServer()).get('/task').set('Authorization', `Bearer ${login.body.accessToken}`)));
        expect(tasks.status).toBe(200);
        expect(tasks.body.length).toBe(1);

        const task = ((await request(app.getHttpServer()).get(`/task/${tasks.body[0].id}`).set('Authorization', `Bearer ${login.body.accessToken}`)));
        expect(task.status).toBe(200);
        expect(task.body.title).toBe("test task");

        const updateTask = ((await request(app.getHttpServer()).put(`/task/${tasks.body[0].id}`).set('Authorization', `Bearer ${login.body.accessToken}`).send({ title: "test 22" })));
        expect(updateTask.status).toBe(200);
        expect(updateTask.body.title).toBe("test 22");

        const deleteTask = ((await request(app.getHttpServer()).delete(`/task/${tasks.body[0].id}`).set('Authorization', `Bearer ${login.body.accessToken}`)));
        expect(deleteTask.status).toBe(200);
        expect(deleteTask.body.title).toBe("test 22");

        const deleteCategory = ((await request(app.getHttpServer()).delete(`/category/${categories.body[0].id}`).set('Authorization', `Bearer ${login.body.accessToken}`)));
        expect(deleteCategory.status).toBe(200);
        expect(deleteCategory.body.title).toBe("test 22");

        const deleteUser = ((await request(app.getHttpServer()).delete(`/user`).set('Authorization', `Bearer ${login.body.accessToken}`)));
        expect(deleteUser.status).toBe(200);
        expect(deleteUser.body.fullName).toBe("test22");
    });

    afterAll(async () => {
        await app.close();
    });
});
