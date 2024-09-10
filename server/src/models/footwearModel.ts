import { prop, pre, Ref, modelOptions, Severity } from "@typegoose/typegoose";
import slugify from "slugify";
import { Review } from "./reviewModel";

@pre<Footwear>("save", async function () {
  this.slug = slugify(this.name, { lower: true });
  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  options: { allowMixed: Severity.ALLOW },
})
export class Footwear {
  _id?: string;

  @prop({ required: true, unique: true, trim: true })
  name: string;

  @prop({ required: true, enum: ["unisex", "men", "women", "kids"] })
  gender: string;

  @prop({
    required: true,
    enum: ["boots", "shoes", "sandals", "platforms"],
    default: "boots",
  })
  category: string;

  @prop()
  slug: string;

  @prop({ required: true })
  coverImage: string;

  @prop({ required: true, default: 0 })
  price: number;

  @prop({ required: true, default: "leather" })
  material: string;

  @prop({ required: true })
  soleHeight: string;

  @prop({ required: true, maxlength: 60 })
  details: string;

  @prop({ required: true, maxlength: 60 })
  care: string;

  @prop({ default: 0 })
  rating: number;
  // virtuals
  @prop({
    ref: Review,
    foreignField: "footwear",
    localField: "_id",
    justOne: false,
  })
  reiews: Ref<Review>[];
}
