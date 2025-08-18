import { FeedbackTag } from "src/feedback-tag/entities/feedback-tag.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("tags")
export class Tag {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({unique:true})
    tagName:string

   
     @CreateDateColumn()
    createdAt: Date

     @OneToMany(()=>FeedbackTag,(f)=>f.tag)
    feedbackTag:FeedbackTag[]

}
