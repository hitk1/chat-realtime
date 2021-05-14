import { Model } from "@nozbe/watermelondb";
import { field } from '@nozbe/watermelondb/decorators'

import { SNContacts } from "../../schema/Contacts";

export default class ContactsModel extends Model {
    static table = SNContacts

    @field('name') name: string
    @field('phoneNumber') phoneNumber: string

}