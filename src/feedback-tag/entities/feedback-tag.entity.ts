import { Feedback } from "src/feedback/entities/feedback.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("feedback_tags")
export class FeedbackTag {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Feedback,(f)=>f.feedbackTag)
    feedback: Feedback

    @ManyToOne(() => Tag,(t)=>t.feedbackTag)
    tag: Tag;


}
