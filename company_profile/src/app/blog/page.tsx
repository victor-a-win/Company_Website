import GenericContainer from "@/components/containers/generic.container";
import PostsList from "../../components/blog/blog.list";
import { getBackendlessPosts } from "@/libs/backendless/backendless.posts";
import { IPostResponse } from "@/model/post.model";
import EmptyListScreen from "@/components/empty/empty.list.screen";

export default async function HomePage() {
  const posts = await getBackendlessPosts(0, 10);

  return (
    <>
      <EmptyListScreen hidden={posts?.length !== 0} />
      <GenericContainer hidden={posts?.length === 0}>
        <div className="p-8">
          <PostsList posts={posts as IPostResponse[]} isEdit={false} />
        </div>
      </GenericContainer>
    </>
  );
}
