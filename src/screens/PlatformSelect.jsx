import "../styles/PlatformSelect.css";
import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PlatformSelect = () => {
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100vh",
			}}
		>
			<Box sx={{ textAlign: "center" }}>Platypus🦫</Box>
			<Box
				sx={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
					display: "flex",
				}}
			>
				<Box
					onClick={() => navigate("/merchant")}
					className={"platformselect-type"}
				>
					Merchant
				</Box>
				<Box
					onClick={() => navigate("/user")}
					className={"platformselect-type"}
				>
					User
				</Box>
			</Box>
		</Box>
	);
};
