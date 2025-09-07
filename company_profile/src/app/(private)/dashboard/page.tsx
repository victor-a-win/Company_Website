import GenericContainer from "@/components/containers/generic.container";
import BlogList from "../../../components/blog/blog.list";
import DashboardHeader from "./components/dashboard.header";
import { getBackendlessPostsByUserId } from "@/libs/backendless/backendless.posts";
import { IPostResponse } from "@/model/post.model";
import EmptyListScreen from "@/components/empty/empty.list.screen";
import { cookies } from "next/headers";

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || "";

  const token = cookieStore.get("user-token")?.value || "";
  if (!token) throw new Error("Unauthorized: user token is missing");
  const posts = (await getBackendlessPostsByUserId(
    userId,
    token,
    0,
    10,
  )) as IPostResponse[];
  return (
    <>
      <GenericContainer>
        <div className="space-y-4 p-8">
          <DashboardHeader />
          <EmptyListScreen hidden={posts?.length !== 0} />
          <BlogList
            posts={posts as IPostResponse[]}
            isEdit={true}
            hidden={posts?.length === 0}
          />
        </div>
      </GenericContainer>
    </>
  );
};
export default DashboardPage;
