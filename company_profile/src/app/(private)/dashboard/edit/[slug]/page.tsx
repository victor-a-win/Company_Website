import BlogEditForm from "@/components/blog/blog.edit.form";
import GenericContainer from "@/components/containers/generic.container";
import { getBackendlessPostByPostId } from "@/libs/backendless/backendless.posts";
import cardTheme from "@/theme/card.theme";
import { getUUIDFromSlug } from "@/utils/slug.helper";
import { Card } from "flowbite-react";

type Props = {
  params: Promise<{ slug: string }>;
};
const EditPostPage = async ({ params }: Props) => {
  const { slug } = await params;
  const postId = getUUIDFromSlug(slug);
  const post = await getBackendlessPostByPostId(postId);

  return (
    <GenericContainer>
      <div className="p-8">
        <h1 className="text-2xl">
          Edit Post: <strong>{post?.title}</strong>
        </h1>
        <hr className="my-4 border-gray-300" />
        <Card theme={cardTheme.card}>
          <BlogEditForm {...{ post }} />
        </Card>
      </div>
    </GenericContainer>
  );
};

export default EditPostPage;
