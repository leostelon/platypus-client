import "../styles/User.css";
import { Avatar, Box } from "@mui/material";
import { PrimaryGrey } from "../constant";
import { MdAdd, MdOutlineArrowOutward } from "react-icons/md";
import { shortText } from "../utils/shortText";
import { useEffect, useState } from "react";
import { getWeb3 } from "../utils/safe";
import Web3 from "web3";

export const User = () => {
	const address = localStorage.getItem("address");
	const [balance, setBalance] = useState("0");

	async function getBalance() {
		const address = localStorage.getItem("address");
		const web3 = await getWeb3();
		const b = await web3.eth.getBalance(address);
		setBalance(Number(Web3.utils.fromWei(b, "ether")).toFixed(4));
	}

	useEffect(() => {
		getBalance();
	}, []);

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
					backgroundColor: "#FDE9E9",
					maxWidth: "420px",
					minWidth: "420px",
					width: "100%",
					p: 2,
				}}
			>
				<Box display={"flex"} alignItems="center">
					<Avatar sx={{ height: "70px", width: "70px", mr: 2 }} />
					<h1>{shortText(address)}</h1>
				</Box>
				<Box
					sx={{
						borderRadius: 4,
						mt: 2,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "white",
						p: 3,
					}}
				>
					<Box flex={1}>
						<p style={{ color: PrimaryGrey }}>Total balance:</p>
						<h2 style={{ paddingTop: "12px" }}>{balance}ETH</h2>
					</Box>
					<Avatar sx={{ height: "50px", width: "50px", mr: 2 }} />
				</Box>
				<Box
					sx={{
						display: "flex",
						mt: 2,
						fontWeight: 500,
					}}
				>
					<Box
						sx={{
							backgroundColor: "black",
							color: "white",
							mr: 1,
						}}
						className={"user-action-button"}
					>
						<MdAdd />
						<Box ml={1}>Add Money</Box>
					</Box>
					<Box
						sx={{
							backgroundColor: "white",
						}}
						className={"user-action-button"}
					>
						<MdOutlineArrowOutward color="black" />
						<Box ml={1}>Transfer</Box>
					</Box>
				</Box>
				<Box mt={4}>
					<h3 style={{ marginBottom: "8px" }}>All Activity</h3>
				</Box>
			</Box>
		</Box>
	);
};
