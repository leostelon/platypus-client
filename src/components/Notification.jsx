import { Box, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { shortText } from "../utils/shortText";
import { useNavigate } from "react-router-dom";

export const Notification = ({ isOpen, handleExternalClose, data }) => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const handleClose = (event, reason) => {
		setOpen(false);
		if (reason && reason === "backdropClick") return;
		if (handleExternalClose) {
			handleExternalClose();
		}
	};

	useEffect(() => {
		if (isOpen) {
			setOpen(isOpen);
		}
	}, [isOpen]);

	return (
		<Dialog open={open} fullWidth maxWidth="xs" onClose={handleClose}>
			<Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
				<Box sx={{ position: "relative" }}>
					<h2>Payment Request</h2>
					<Box
						sx={{
							position: "absolute",
							backgroundColor: "lightgrey",
							cursor: "pointer",
							height: "30px",
							width: "30px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: "50%",
							top: 0,
							right: 0,
						}}
						onClick={handleClose}
					>
						<MdClose />
					</Box>
				</Box>
				<Box mb={2}>
					<h1 style={{ fontSize: "42px" }}>{data.amount}ETH</h1>
				</Box>
				<p style={{ fontWeight: "500" }}>
					There is a new payment request from {shortText(data?.sender)}, click
					pay now to proceed.
				</p>
				<Box
					sx={{
						mt: 2,
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Box
						sx={{
							p: 1,
							cursor: "pointer",
							mb: 2,
							backgroundColor: "#4443FF",
							color: "white",
							borderRadius: 2,
							width: "100%",
							textAlign: "center",
						}}
						onClick={async () => {
							navigate(`/checkout/${data.message}`);
						}}
					>
						Pay Now
					</Box>
				</Box>
			</Box>
		</Dialog>
	);
};
