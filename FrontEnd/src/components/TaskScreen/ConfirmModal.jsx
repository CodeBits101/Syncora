import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function ConfirmModal({
  open,
  onCancel,   // renamed for clarity
  onConfirm,
  title = "Confirmation",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel"
}) {
  
  // Wrap close logic so backdrop clicks don't trigger infinite loops
  const handleClose = (_, reason) => {
    if (reason !== 'backdropClick') {
      onCancel();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {message}
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button variant="plain" color="neutral" onClick={onCancel}>
            {cancelText}
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
