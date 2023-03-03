import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  openModal: boolean;
  handleClose: () => void;
  title: string;
  text: string;
  buttonText: string;
  action: () => void;
}

const BasicModal = ({
  openModal,
  handleClose,
  title,
  text,
  buttonText,
  action,
}: Props) => {

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id='modal-success'
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
          <button onClick={() => action()} data-testId="ok-button">
            {buttonText}
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
