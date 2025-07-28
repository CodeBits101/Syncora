// PasswordChangeModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { changePassword } from "../../services/main/auth";
import { toast } from "react-toastify";

const PasswordChangeModal = ({ open, onClose }) => {
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setError("");

    // Validate new password
    if (data.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    // Validate confirm password
    if (data.newPassword !== data.confirmPassword) {
      setError("Passwords does not match.");
      return;
    }

    // Save new password

    try {
      setIsLoading(true);
      const response = await changePassword(data);
      console.log("Password change response:", response);
      toast.success("Password changed successfully!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response.data.message || "Login failed occurred");
    } finally {
      setIsLoading(false);
      setData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }

    setTimeout(() => {
      onClose();
    }, 1500);

  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          label="Current Password"
          type="password"
          fullWidth
          margin="normal"
          value={data.currentPassword}
          onChange={(e) =>
            setData({ ...data, currentPassword: e.target.value })
          }
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={data.newPassword}
          onChange={(e) => setData({ ...data, newPassword: e.target.value })}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          margin="normal"
          value={data.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        {/* {success && (
          <Typography color="primary" variant="body2" sx={{ mt: 1 }}>
            {success}
          </Typography>
        )} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordChangeModal;
