import { Box, CircularProgress, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { getSafeProvider } from "../utils/safe";
import Web3 from "web3";
import { ethers } from "ethers";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";

export const PayDialog = ({ isOpen, handleExternalClose }) => {
	const [open, setOpen] = useState(false);
	const [amount, setAmount] = useState("");
	const [address, setAddress] = useState("");
	const [paymentLoading, setPaymentLoading] = useState(false);

	const handleClose = (event, reason) => {
		setOpen(false);
		if (reason && reason === "backdropClick") return;
		if (handleExternalClose) {
			handleExternalClose();
		}
	};

	async function pay1() {
		try {
			setPaymentLoading(true);
			const p = await getSafeProvider();
			const web3 = new Web3(p);

			const from = localStorage.getItem("address");
			const value = Web3.utils.toWei(amount, "ether");

			// Gas Calculation
			const gasPrice = await web3.eth.getGasPrice();

			const res = await web3.eth.sendTransaction({
				from,
				to: address,
				value,
				gasPrice,
			});
			console.log("res here", res);
			setPaymentLoading(false);
		} catch (error) {
			console.log(error.message);
			setPaymentLoading(false);
		}
	}

	async function pay() {
		try {
			setPaymentLoading(true);
			const p = await getSafeProvider();
			const provider = new ethers.BrowserProvider(p);
			const signer = provider.getSigner();
			const ethAdapter = new EthersAdapter({
				ethers,
				signerOrProvider: signer || provider,
			});

			// Instantiate the protocolKit
			const protocolKit = await Safe.create({
				ethAdapter,
			});

			const safeTransactionData = {
				to: `${address}`,
				data: "0x",
				value: ethers.parseUnits(amount, "ether").toString(),
			};

			const safeTransaction = await protocolKit.createTransaction({
				transactions: [safeTransactionData],
			});
			// Execute the transaction
			await protocolKit.executeTransaction(safeTransaction);
			setPaymentLoading(false);
		} catch (error) {
			console.log(error.message);
			setPaymentLoading(false);
		}
	}

	useEffect(() => {
		if (isOpen) {
			setOpen(isOpen);
		}
	}, [isOpen]);
	return (
		<Dialog open={open} fullWidth maxWidth="xs" onClose={handleClose}>
			<Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
				<Box sx={{ position: "relative" }}>
					<h2>Pay</h2>
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
				<Box>
					<Box mt={2} maxWidth={"420px"} textAlign={"start"}>
						<h3>Address</h3>
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
					</Box>
					<Box mt={2} maxWidth={"420px"} textAlign={"start"}>
						<h3>Amount</h3>
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
								value={amount}
								onInput={(e) => {
									setAmount(e.target.value);
								}}
							/>
						</Box>
					</Box>
				</Box>
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
							// Pay Option
							pay();
						}}
					>
						{paymentLoading ? (
							<CircularProgress size={"15px"} sx={{ color: "white" }} />
						) : (
							"Pay Now"
						)}
					</Box>
				</Box>
			</Box>
		</Dialog>
	);
};
