import { Model } from "@nozbe/watermelondb";
import { field, relation } from '@nozbe/watermelondb/decorators'

import { SNMessages } from "../../schema/Messages";
import { SNContacts } from '../../schema/Contacts/index'
import { Associations } from "@nozbe/watermelondb/Model";

export default class MessagesModel extends Model {
    static table = SNMessages

    @field('message_id') message_id: string
    @field('to') to: string
    @field('from') from: string
    @field('message') message: string
    @field('key') key: string
    @field('status') status: number
    @field('created_at') created_at: number
    @field('updated_at') updated_at: number

}