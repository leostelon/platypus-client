import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBill } from "../api/bill";
import { Box } from "@mui/material";
import QRCode from "react-qr-code";
import { useState } from "react";
import { PrimaryGrey } from "../constant";
import { ChatMessage, getWakuNode } from "../utils/waku";
import { createDecoder, createEncoder } from "@waku/sdk";
import { useRef } from "react";

export const Bill = () => {
	const { id } = useParams();
	const [address, setAddress] = useState("");
	const [bill, setBill] = useState(false);
	const billRef = useRef({});
	const [connected, setConnected] = useState(false);
	const node = useRef(undefined);
	const navigate = useNavigate();

	async function listenMessage() {
		try {
			// Create the callback function
			const callback = (wakuMessage) => {
				// Check if there is a payload on the message
				if (!wakuMessage.payload) return;
				// Render the messageObj as desired in your application
				const messageObj = ChatMessage.decode(wakuMessage.payload);
				console.log(messageObj);
				navigate("/completed?isbill=true");
			};

			// Create a filter subscription
			const subscription = await node.current.filter.createSubscription();

			// Subscribe to content topics and process new messages
			const decoder = createDecoder("/platypus/" + billRef.current.uid);
			await subscription.subscribe([decoder], callback);
		} catch (error) {
			setTimeout(() => {
				listenMessage();
			}, 2000);
		}
	}

	async function gB(id) {
		const response = await createBill(id);
		setBill(response);
		billRef.current = response;
		let timer = setInterval(async () => {
			if (!connected) {
				node.current = await getWakuNode();
				if (node.current && node.current.isStarted()) {
					setConnected(true);
					clearInterval(timer);
					await listenMessage(response);
					console.log("cleared");
				}
			}
		}, 2000);
	}

	async function sendRequest(address) {
		// Choose a content topic
		const contentTopic = `/platypus/${address}`;

		// Create a message encoder and decoder
		const encoder = createEncoder({
			contentTopic: contentTopic, // message content topic
			ephemeral: true, // allows messages not be stored on the network
		});
		const add = localStorage.getItem("address");
		const protoMessage = ChatMessage.create({
			timestamp: Date.now(),
			sender: add,
			amount: bill.payment.amount,
			message: bill.uid,
		});

		// Serialise the message using Protobuf
		const serialisedMessage = ChatMessage.encode(protoMessage).finish();
		console.log("sending");

		// Send the message using Light Push
		const node = await getWakuNode();

		await node.lightPush.send(encoder, {
			payload: serialisedMessage,
		});
		console.log("sent");
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
				<QRCode
					value={`http://localhost:3000/checkout/${bill.uid ? bill.uid : ""}`}
					size={150}
				/>
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
								placeholder="Enter Address"
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
									await sendRequest(address);
									alert("Request has been sent.");
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
				<Box mt={2} textAlign="center">
					<small style={{ color: PrimaryGrey }}>Powered by Platypus🦫</small>
					<br />
					<br />
					<small style={{ color: PrimaryGrey, fontSize: "12px" }}>
						ID: {bill.uid ? bill.uid : ""}
					</small>
				</Box>
			</Box>
		</Box>
	);
};
