import { Prop, Schema as SchemaDec, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export type TaskDocument = Task & Document;

@SchemaDec({ timestamps: true, collection: 'tasks' })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ ref: 'User', required: true, type: Schema.Types.ObjectId })
  user_id: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
