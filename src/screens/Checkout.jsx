import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBill } from "../api/bill";
import { useState } from "react";
import { PrimaryGrey } from "../constant";
import { ChatMessage, getWakuNode } from "../utils/waku";
import { createEncoder } from "@waku/sdk";

export const Checkout = () => {
	const [loading, setLoading] = useState(true);
	const { bill_id } = useParams();
	const [bill, setBill] = useState();

	async function gB(bill_id) {
		setLoading(true);
		const bill = await getBill(bill_id);
		setBill(bill);
		console.log(bill);
		setLoading(false);
	}

	async function sendMessage() {
		// Choose a content topic
		const contentTopic = "/platypus/82c52569-1b35-4702-afe3-1fdb498ba199";

		// Create a message encoder and decoder
		const encoder = createEncoder({
			contentTopic: contentTopic, // message content topic
			ephemeral: true, // allows messages not be stored on the network
		});

		const protoMessage = ChatMessage.create({
			timestamp: Date.now(),
			sender: "Alice",
			message: "Hello, World!",
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
		gB(bill_id);
	}, [bill_id]);

	return loading ? (
		<p>loading</p>
	) : (
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
				<h1 style={{ color: PrimaryGrey }}>Platypus🦫</h1>
				<br />
				<Box sx={{ flex: 1 }}>
					<h2>Payment</h2>
					<br />
					<Box
						sx={{
							width: "100%",
							textAlign: "left",
						}}
					>
						<p>You are paying</p>
						<h4>{bill.payment.address}</h4>
					</Box>
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
							sendMessage();
						}}
					>
						Pay
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
