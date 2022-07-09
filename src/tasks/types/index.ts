import { Exclude } from "class-transformer";

export type TserializedTask = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export class SerializedTask {
    @Exclude()
    id: string;
    title: string;
    description: string;
    completed: boolean;

    @Exclude()
    user_id: string;

    constructor(partial: Partial<SerializedTask>){
        Object.assign(this, partial);
    }
}
