import 'reflect-metadata';
import AppDataSource from 'src/data.source';
import AdminSeeder from './seeds/admin.seeds';


async function seed() {
  await AppDataSource.initialize();
  await new AdminSeeder().run(AppDataSource); 
  console.log(' Admin seeding complete');
}

seed();
