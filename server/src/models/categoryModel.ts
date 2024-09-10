import { prop, modelOptions, pre, Ref } from "@typegoose/typegoose";
import slugify from "slugify";
import { Footwear } from "./footwearModel";

@modelOptions({
  schemaOptions: { timestamps: true },
})
@pre<Category>("save", async function () {
  this.slug = slugify(this.name, { lower: true });
})
@pre<Category>(/^find/, function () {
  this.populate({ path: "footwears", select: "-slug" });
})
export class Category {
  @prop({ required: true, trim: true })
  name: string;

  @prop({ required: true })
  coverImage: string;

  @prop({ required: true, maxlength: 260, trim: true })
  description: string;

  @prop()
  slug: string;

  @prop({ required: true, ref: () => Footwear, type: () => Footwear })
  footwears: Ref<Footwear>[];
}
