import { Schema, model } from "mongoose";
import { messageschema } from "../types/Schemas";
import { messagemodel } from "../types/Models";

const Message: Schema<messageschema> = new Schema<messageschema>({
    to: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    body: {
        type: {
            text: String,
            image: String,
        }
    }
});

export default model<messageschema, messagemodel>('Message', Message);