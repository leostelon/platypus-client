import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Drawer } from "../components/Drawer";
import Platypus from "../contracts/Platypus.json";
import Web3 from "web3";
import { getWalletAddress } from "../utils/wallet";
import { distributeFunds } from "../api/admin";

export const Admin = () => {
	const [loading, setLoading] = useState(false);
	async function dFC(address, amount) {
		setLoading(true);
		const web3 = new Web3(window.ethereum);

		const contract = new web3.eth.Contract(
			Platypus.abi,
			"0x86FEb64E53C6fdEa0271E1D59955591411Edf758"
		);

		const currentAddress = await getWalletAddress();

		// Gas Calculation
		const gasPrice = await web3.eth.getGasPrice();
		const gas = await contract.methods
			.distributeFunds(address, amount)
			.estimateGas({
				from: currentAddress,
			});

		await contract.methods
			.distributeFunds(address, amount)
			.send({ from: currentAddress, gasPrice, gas })
			.on("receipt", async function (receipt) {
				setLoading(false);
				alert("Distributed funds successfully🥳🍾");
				window.location.reload();
			});
		setLoading(false);
	}

	async function dF() {
		const response = await distributeFunds();
		// let response = {
		// 	address: ["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"],
		// 	amount: ["0.001"],
		// };
		let newAmounts = [];
		for (var i = 0; i < response.amount.length; i++) {
			newAmounts.push(Web3.utils.toWei(response.amount[i], "ether"));
		}
		dFC(response.address, newAmounts);
	}
	useEffect(() => {}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<Drawer />
			<Box style={{ width: `calc(100vw - 280px)` }}>
				<Box
					sx={{
						p: 2,
						display: "flex",
						color: "#4c4848",
					}}
				>
					<Box
						flex={3}
						sx={{
							maxWidth: "200px",
						}}
					>
						<h1>Admin 🔒</h1>
						<br />
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
								dF();
							}}
						>
							{loading ? (
								<CircularProgress size={"15px"} sx={{ color: "white" }} />
							) : (
								"Distribute"
							)}
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
