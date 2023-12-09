import { Box } from "@mui/material";
import React from "react";
import CompletedGif from "../assets/completed.gif";

export const Completed = () => {
	const searchParams = new URLSearchParams(document.location.search);

	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
				width: "100vw",
				justifyContent: "center",
			}}
		>
			<Box
				sx={{
					// backgroundColor: "#FDE9E9",
					maxWidth: "420px",
					minWidth: "420px",
					width: "100%",
					p: 2,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
					<h1>Payment Completed</h1>
					<br />
					<br />
					<Box
						sx={{
							flex: 1,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							height: "100%",
						}}
					>
						<img src={CompletedGif} height={"250px"} alt="completed" />
					</Box>
				</Box>
				<Box>
					<Box mt={2} maxWidth={"300px"}>
						<Box
							sx={{
								display: "flex",
								width: "100%",
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
									if (searchParams.get("isbill") === "true") {
										window.close();
									} else {
										window.location.replace("/user");
									}
								}}
							>
								Continue
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
