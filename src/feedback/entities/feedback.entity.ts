import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../enum/status.enum";
import { User } from "src/user/entities/user.entity";
import { FeedbackTag } from "src/feedback-tag/entities/feedback-tag.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Votes } from "src/votes/entities/vote.entity";

@Entity('feedback')
export class Feedback {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: 'enum', enum: Status, default: Status.PUBLIC })
    status: Status

    @Column({ default: 0 })
    upVotes: number

    @Column({ default: 0 })
    downVotes: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date


    @ManyToOne(() => User, (u) => u.feedback, { onDelete: "CASCADE" })
    user: User

    @OneToMany(() => FeedbackTag, (f) => f.feedback)
    feedbackTag: FeedbackTag[]

    @OneToMany(() => Comment, (c) => c.feedback)
    comment: Comment[]
    
    @OneToMany(() => Votes, vote => vote.feedback)
    votes: Votes[];
}
