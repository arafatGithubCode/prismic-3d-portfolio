import Avatar from "@/components/Avatar";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-6 gap-y-8 md:grid-cols-[2fr, 1fr]">
        <Heading as="h1" size="xl" className="col-start-1">
          {slice.primary.heading}
        </Heading>
        <div className="prose prose-xl prose-slate prose-invert col-start-1">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <Button
          label={slice.primary.button_text}
          linkField={slice.primary.button_link}
          className="text-black font-semibold text-lg"
        />
        <Avatar
          image={slice.primary.avatar}
          className="max-w-sm row-start-1 md:col-start-2 md:row-end-3 rounded-3xl shadow shadow-slate-300"
        />
      </div>
    </Bounded>
  );
};

export default Biography;
