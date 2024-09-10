import { prop, pre, modelOptions, Ref, index } from "@typegoose/typegoose";
import { User } from "./userModel";
import { Footwear } from "./footwearModel";

@index({ footwear: 1, user: 1 }, { unique: true })
@pre<Review>(/^find/, function (next) {
  this.populate({ path: "user", select: "userName photo" });
  next();
})
@pre<Review>(/^find/, function (next) {
  this.populate({ path: "footwear", select: "name coverImage" });
  next();
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class Review {
  _id?: string;

  @prop({ required: true, trim: true, maxlength: 260 })
  content: string;

  @prop({ min: 1, max: 5, default: 1 })
  rating: number;

  @prop({ required: true, ref: () => User, type: () => User })
  user: Ref<User>;

  @prop({ required: true, ref: () => Footwear, type: () => Footwear })
  footwear: Ref<Footwear>;
}
