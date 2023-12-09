import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createBill } from "../api/bill";
import { Box } from "@mui/material";
import QRCode from "react-qr-code";
import { useState } from "react";
import { PrimaryGrey } from "../constant";
import { ChatMessage, getWakuNode } from "../utils/waku";
import { createDecoder } from "@waku/sdk";
import { useRef } from "react";

export const Bill = () => {
	const { id } = useParams();
	const [address, setAddress] = useState("");
	const contentTopic = "/platypus/82c52569-1b35-4702-afe3-1fdb498ba199";
	const decoder = createDecoder(contentTopic);
	const node = useRef(undefined);

	async function listenMessage() {
		try {
			// Create the callback function
			const callback = (wakuMessage) => {
				// Check if there is a payload on the message
				if (!wakuMessage.payload) return;
				// Render the messageObj as desired in your application
				const messageObj = ChatMessage.decode(wakuMessage.payload);
				console.log(messageObj);
			};

			// Create a filter subscription
			const subscription = await node.current.filter.createSubscription();

			// Subscribe to content topics and process new messages
			await subscription.subscribe([decoder], callback);
		} catch (error) {
			setTimeout(() => {
				listenMessage();
			}, 2000);
		}
	}

	useEffect(() => {
		let connected = false;
		let timer = setInterval(async () => {
			if (!connected) {
				node.current = await getWakuNode();
				if (node.current && node.current.isStarted()) {
					connected = true;
					clearInterval(timer);
					listenMessage();
					console.log("cleared");
				}
			}
		}, 2000);
	}, []);

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
				<h1>Payment Request</h1>
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
				<Box mt={2}>
					<small style={{ color: PrimaryGrey }}>Powered by Platypus🦫</small>
				</Box>
			</Box>
		</Box>
	);
};
