import { deleteBackendlessPost } from "@/libs/backendless/backendless.posts";
import { IPostResponse } from "@/model/post.model";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  openModal: boolean;
  onClose: () => void;
  post: IPostResponse;
};
const ConfirmationDialog = ({ openModal, onClose, post }: Props) => {
  const router = useRouter();

  return (
    <Modal show={openModal} size="md" onClose={onClose} popup>
      <ModalHeader className="rounded-t-lg bg-black" />
      <ModalBody className="rounded-b-lg bg-black">
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-white" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-white">
            Are you sure you want to delete this post?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="red"
              onClick={async () => {
                try {
                  await deleteBackendlessPost(post?.objectId);
                  toast.success("Post deleted successfully");
                  router.refresh();
                } catch (error) {
                  toast.error(
                    axios.isAxiosError(error)
                      ? error.response?.data?.message
                      : error instanceof Error
                        ? `Update Post Failed: ${error.message}`
                        : "Update Post failed. Please try again.",
                  );
                }
                onClose();
              }}
            >
              Sure
            </Button>
            <Button color="alternative" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default ConfirmationDialog;
