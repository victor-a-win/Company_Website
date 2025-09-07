"use client";

import useOpenToggle from "@/hooks/useOpenToggle";
import { IPostResponse } from "@/model/post.model";
import cardTheme from "@/theme/card.theme";
import dayjs from "dayjs";
import { Button, Card } from "flowbite-react";
import { Delete, Edit } from "lucide-react";
import Link from "next/link";
import ConfirmationDialog from "../dialogs/confirmation.dialog";

type Props = { posts: IPostResponse[]; isEdit: boolean; hidden?: boolean };
const BlogList = ({ posts, isEdit = false, hidden }: Props) => {
  const { isOpen, open, close } = useOpenToggle();
  return (
    <div
      className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ${hidden ? "hidden" : ""}`}
    >
      {posts?.map((post: IPostResponse) => (
        <Card
          theme={cardTheme.card}
          key={post?.objectId}
          className="relative min-h-96 max-w-sm"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc={post?.imageUrl}
        >
          {isEdit ? (
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                as={Link}
                href={`/dashboard/edit/${post?.slug}-${post.objectId}`}
                color="dark"
                className="flex h-12 w-12 items-center justify-center p-0"
              >
                <Edit
                  color="white"
                  className="transition duration-200 ease-in-out hover:scale-110"
                />
              </Button>
              <Button
                color="red"
                className="flex h-12 w-12 cursor-pointer items-center justify-center p-0"
                onClick={open}
              >
                <Delete
                  color="white"
                  className="transition duration-200 ease-in-out hover:scale-110"
                />
              </Button>
              <ConfirmationDialog
                openModal={isOpen}
                onClose={close}
                post={post}
              />
            </div>
          ) : null}
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post?.title}
          </h5>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Date: <strong>{dayjs(post?.created).format("YYYY/MM/DD")}</strong>
            {" | "}
            Author: <strong>{post?.author?.[0]?.name ?? 'Unknown'}</strong>
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {post?.excerpt}
          </p>
          <Button as={Link} href={`/blog/${post?.slug}-${post?.objectId}`}>
            Read more
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Card>
      ))}
    </div>
  );
};
export default BlogList;
