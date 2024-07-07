import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextBlog`.
 */
export type TextBlogProps = SliceComponentProps<Content.TextBlogSlice>;

/**
 * Component for "TextBlog" Slices.
 */
const TextBlog = ({ slice }: TextBlogProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="prose prose-invert">
        <PrismicRichText field={slice.primary.text} />
      </div>
    </section>
  );
};

export default TextBlog;
