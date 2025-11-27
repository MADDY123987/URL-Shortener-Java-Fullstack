import React from "react";
import Modal from "@mui/material/Modal";
import CreateNewShorten from "./CreateNewShorten";

const ShortenPopUp = ({ open, setOpen, refetch }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="shorten-modal-title"
      aria-describedby="shorten-modal-description"
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(15,23,42,0.70)", // slate-900/70
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      <div className="flex justify-center items-center h-full w-full px-3">
        <div className="max-w-md w-full">
          {/* CreateNewShorten still controls refetch + closing */}
          <CreateNewShorten setOpen={setOpen} refetch={refetch} />
        </div>
      </div>
    </Modal>
  );
};

export default ShortenPopUp;
