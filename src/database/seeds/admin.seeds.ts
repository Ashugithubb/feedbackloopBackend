import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';


export default class AdminSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const userRepo = dataSource.getRepository(User);

        const admin: User[] = [];
        const password = await bcrypt.hash('admin123', 10);
        admin.push(

            userRepo.create({
                userName: 'Admin01',
                password: `${password}`,
                email: 'admin01@gmail.com',
                role:'Admin'
            },
            ),
        );

        await userRepo.save(admin);

    }
}