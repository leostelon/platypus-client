import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBill } from "../api/bill";
import { useState } from "react";
import { PrimaryGrey } from "../constant";
import { ChatMessage, getWakuNode } from "../utils/waku";
import { createEncoder } from "@waku/sdk";
import Web3 from "web3";
import { getSafeProvider } from "../utils/safe";
import Platypus from "../contracts/Platypus.json";
import { getToken } from "../utils/jwt";

export const Checkout = () => {
	const [loading, setLoading] = useState(true);
	const [paymentLoading, setPaymentLoading] = useState(false);
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

	async function pay() {
		try {
			setPaymentLoading(true);
			const p = await getSafeProvider();
			const web3 = new Web3(p);

			const contract = new web3.eth.Contract(
				Platypus.abi,
				"0x74242F7a20eC1ac9e378fE6C815Cc2073EeB920f"
			);

			const from = "0x080BAF4cbFBFb119d5A0e4E0151b67ef4817B0db";
			const value = Web3.utils.toWei("0.0001", "ether");

			const token = getToken({
				address: "0x96c9c42CB339165971351c5106F11791F6c0a645",
				amount: "0.001",
			});

			// Gas Calculation
			const gasPrice = await web3.eth.getGasPrice();
			const gas = await contract.methods.send(token).estimateGas({
				from,
				value,
			});

			await contract.methods
				.send(token)
				.send({ from, gasPrice, gas, value })
				.on("receipt", async function (receipt) {
					sendMessage();
					setPaymentLoading(false);
					alert("Succesfully paid🥳🍾");
				});
			setPaymentLoading(false);
		} catch (error) {
			console.log(error.message);
			setPaymentLoading(false);
		}
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
				position: "relative",
			}}
		>
			<Box
				sx={{
					backgroundColor: "#f3f3f3",
					height: "351px",
					width: "351px",
					position: "absolute",
					top: "50%",
					bottom: "50%",
					margin: "auto",
					zIndex: -1,
					borderRadius: "50%",
				}}
			></Box>
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
						<p>
							You are paying{" "}
							<span style={{ fontWeight: "600" }}>
								{bill.payment.amount}ETH
							</span>
							&nbsp; to
						</p>
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
							pay();
						}}
					>
						{paymentLoading ? (
							<CircularProgress size={"15px"} sx={{ color: "white" }} />
						) : (
							"Pay"
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
