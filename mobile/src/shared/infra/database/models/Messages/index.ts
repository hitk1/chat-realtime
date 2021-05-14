import { Model } from "@nozbe/watermelondb";
import { field } from '@nozbe/watermelondb/decorators'

import { SNMessages } from "../../schema/Messages";

export default class MessagesModel extends Model {
    static table = SNMessages

    @field('message_id') message_id: string
    @field('to') to: string
    @field('message') message: string
    @field('status') status: number
    @field('created_at') created_at: number
    @field('updated_at') updated_at: number

}