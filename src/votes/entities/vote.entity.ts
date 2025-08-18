import { Feedback } from "src/feedback/entities/feedback.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { VoteType } from "../enum/vote.enum";

 

@Entity("votes")
@Unique(['user', 'feedback'])
export class Votes {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'enum',
        enum: VoteType,
    })
    type: VoteType;

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Feedback)
    feedback: Feedback
}
