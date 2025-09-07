import GenericContainer from "@/components/containers/generic.container";
import { getBackendlessPostByPostId } from "@/libs/backendless/backendless.posts";
import { getUUIDFromSlug } from "@/utils/slug.helper";
import dayjs from "dayjs";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};
const BlogPage = async ({ params }: Props) => {
  const { slug } = await params;
  const postId = getUUIDFromSlug(slug);
  const post = await getBackendlessPostByPostId(postId);

  return (
    <GenericContainer>
      <div className={"flex flex-col gap-4 p-8"}>
        <h1 className={"text-5xl font-bold"}>{post?.title}</h1>
        <p className="text-sm">
          Created: {dayjs(post?.created).format("MMMM D, YYYY")} | Author:{" "}
          {post?.author?.[0]?.name || "Unknown Author"}
        </p>
        <p className="text-gray-500">{post?.excerpt}</p>
        <div className="relative aspect-video w-full">
          <Image
            src={post?.imageUrl as string}
            alt={post?.title as string}
            fill
            className="object-cover"
            placeholder="empty"
          />
        </div>
        <p>{post?.content}</p>
      </div>
    </GenericContainer>
  );
};
export default BlogPage;
