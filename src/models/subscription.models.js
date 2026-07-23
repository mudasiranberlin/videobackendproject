import mongoose, {Schema} from "mongoose";

const SubscriptionSchema = new Schema(
  {
    subscriber: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    channel: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },

  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription",SubscriptionSchema);
