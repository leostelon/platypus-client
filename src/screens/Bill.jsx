import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createBill } from "../api/bill";
import { Box } from "@mui/material";
import QRCode from "react-qr-code";
import { useState } from "react";

export const Bill = () => {
	const { id } = useParams();
	const [address, setAddress] = useState("");
	console.log(id);

	async function gB(id) {
		const response = await createBill(id);
		console.log(response);
	}

	useEffect(() => {
		gB(id);
	}, [id]);

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
				<h1>Platypus</h1>
				<br />
				<br />
				<QRCode value="hey" size={150} />
				<br />
				<p style={{ fontWeight: 500 }}>Scan and pay using Platypus app</p>
				<br />
				<Box
					sx={{
						borderRadius: 50,
						backgroundColor: "lightgreen",
						color: "darkgreen",
						display: "flex",
						height: "35px",
						width: "35px",
						alignItems: "center",
						justifyContent: "center",
						mb: 2,
					}}
				>
					<p>or</p>
				</Box>
				<Box>
					<Box mt={2} maxWidth={"300px"}>
						<h3>Enter Address</h3>
						<Box
							className="default-text-input"
							sx={{ width: "100%" }}
							mb={2}
							mt={1}
						>
							<input
								type="text"
								id={`title`}
								placeholder="Enter Amount"
								value={address}
								onInput={(e) => {
									setAddress(e.target.value);
								}}
							/>
						</Box>
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
									// Request Method here
								}}
							>
								Request payment
							</Box>
						</Box>
						<Box
							sx={{
								backgroundColor: "#d6d6d67b",
								p: 1,
								borderRadius: 2,
								color: "#858585",
							}}
						>
							• Enter your Platypus wallet address
							<br />
							• Recieve payment request on wallet.
							<br /> • Authorize the payment.
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
