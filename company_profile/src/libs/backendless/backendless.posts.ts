import { TPostPayload, IPostResponse } from "@/model/post.model";
import backendlessAPI from "../axios/axios.config";
import axiosError from "../axios/axios.error";
import { backendlessUserTokenGuard } from "./backendless.auth";

const getBackendlessPosts = async (
  offset: number = 0,
  pageSize: number = 10,
): Promise<IPostResponse[] | undefined> => {
  try {
    const res = await backendlessAPI.get("data/Posts", {
      params: {
        loadRelations: "author",
        pageSize,
        offset,
      },
    });
    const posts = res.data;
    return posts as IPostResponse[];
  } catch (error) {
    axiosError(error, "Fetching posts failed due to unexpected error");
  }
};

const getBackendlessPostByPostId = async (
  postId: string,
): Promise<IPostResponse | undefined> => {
  try {
    const res = await backendlessAPI.get(`data/Posts/${postId}`, {
      params: {
        loadRelations: "author",
      },
    });
    return res.data as IPostResponse;
  } catch (error) {
    axiosError(error, "Fetching posts failed due to unexpected error");
  }
};

const getBackendlessPostsByUserId = async (
  userId: string,
  token: string,
  offset: number = 0,
  pageSize: number = 10,
): Promise<IPostResponse[] | undefined> => {
  try {
    const res = await backendlessAPI.get("data/Posts", {
      params: {
        where: `\`ownerId\` = '${userId}'`,
        loadRelations: "author",
        pageSize,
        offset,
      },
      headers: {
        "user-token": token,
      },
    });
    return res.data as IPostResponse[];
  } catch (error) {
    axiosError(error, "Fetching posts failed due to unexpected error");
  }
};

const backendlessUploadSingleImage = async (
  image: File | null,
  filename: string,
  isEdit: boolean = false,
): Promise<string | undefined> => {
  try {
    const token = await backendlessUserTokenGuard();
    const formData = new FormData();
    if (image) formData.append("file", image, image.name);
    const res = await backendlessAPI.post(`files/posts/${filename}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "user-token": token,
      },
      ...(isEdit && {
        params: {
          overwrite: isEdit,
        },
      }),
    });
    return res.data?.fileURL as string;
  } catch (error) {
    axiosError(error, "Uploading image failed due to unexpected error");
  }
};

const createBackendlessPost = async (
  post: TPostPayload,
): Promise<IPostResponse | undefined> => {
  try {
    const token = await backendlessUserTokenGuard();
    const res = await backendlessAPI.post("data/Posts", post, {
      headers: {
        "user-token": token,
      },
    });
    return res.data as IPostResponse;
  } catch (error) {
    axiosError(error, "Creating post failed due to unexpected error");
  }
};

const setBackendlessPostAuthorRelation = async (
  postId: string,
  authorId: string,
) => {
  try {
    const token = await backendlessUserTokenGuard();
    await backendlessAPI.post(`data/Posts/${postId}/author`, [authorId], {
      headers: {
        "user-token": token,
      },
    });
  } catch (error) {
    axiosError(
      error,
      "Setting post author relation failed due to unexpected error",
    );
  }
};

const editBackendlessPost = async (
  post: TPostPayload,
  postId: string,
): Promise<IPostResponse | undefined> => {
  try {
    const token = await backendlessUserTokenGuard();
    const res = await backendlessAPI.put(`data/Posts/${postId}`, post, {
      headers: {
        "user-token": token,
      },
    });
    return res.data as IPostResponse;
  } catch (error) {
    axiosError(error, "Editing post failed due to unexpected error");
  }
};

const deleteBackendlessPost = async (postId: string): Promise<void> => {
  try {
    const token = await backendlessUserTokenGuard();
    await backendlessAPI.delete(`data/Posts/${postId}`, {
      headers: {
        "user-token": token,
      },
    });
  } catch (error) {
    axiosError(error, "Deleting post failed due to unexpected error");
  }
};

export {
  getBackendlessPosts,
  getBackendlessPostByPostId,
  getBackendlessPostsByUserId,
  backendlessUploadSingleImage,
  createBackendlessPost,
  setBackendlessPostAuthorRelation,
  editBackendlessPost,
  deleteBackendlessPost,
};
