import { Comment } from "src/comment/entities/comment.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("users_comments")
export class UserComment {
    @PrimaryGeneratedColumn()
    id:number
    @ManyToOne(() => User, (u) => u.userComment,{onDelete:"CASCADE"})
    user: User

    @ManyToOne(() => Comment, (c) => c.userComment,{onDelete:"CASCADE"})
    comment: Comment
}
