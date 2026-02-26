import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from '@stamp-card/shared';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
}
//# sourceMappingURL=users.service.d.ts.map