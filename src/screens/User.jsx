import "../styles/User.css";
import { Avatar, Box, Tooltip } from "@mui/material";
import { PrimaryGrey } from "../constant";
import { MdAdd, MdOutlineArrowOutward } from "react-icons/md";
import { shortText } from "../utils/shortText";
import { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import { Notification } from "../components/Notification";
import { ChatMessage, getWakuNode } from "../utils/waku";
import { createDecoder } from "@waku/sdk";
import Userbg from "../assets/user-bg.png";
import Logo from "../assets/logo.png";
import { PayDialog } from "../components/Transfer";

export const User = () => {
	const [address, setAddress] = useState("");
	const [balance, setBalance] = useState("0");
	const [notification, setNotification] = useState(false);
	const [notifData, setNotifData] = useState({});
	const [open, setOpen] = useState(false);
	const node = useRef(undefined);
	const [payOpen, setPayOpen] = useState(true);

	async function listenMessage() {
		try {
			// Create the callback function
			const callback = (wakuMessage) => {
				// Check if there is a payload on the message
				if (!wakuMessage.payload) return;
				// Render the messageObj as desired in your application
				const messageObj = ChatMessage.decode(wakuMessage.payload);
				setNotification(true);
				setNotifData(messageObj);
			};

			// Create a filter subscription
			const subscription = await node.current.filter.createSubscription();

			// Subscribe to content topics and process new messages
			const address = localStorage.getItem("address");
			const decoder = createDecoder(`/platypus/${address}`);

			await subscription.subscribe([decoder], callback);
		} catch (error) {
			setTimeout(() => {
				listenMessage();
			}, 2000);
		}
	}

	async function getBalance() {
		try {
			const address = localStorage.getItem("address");
			setAddress(address);
			const web3 = new Web3("https://forno.celo.org");
			const b = await web3.eth.getBalance(address);
			setBalance(Number(Web3.utils.fromWei(b, "ether")).toFixed(4));
		} catch (error) {
			console.log(error.message);
		}
	}

	function handleNotificationDialogClose() {
		setNotification(false);
		setPayOpen(false);
	}

	useEffect(() => {
		const a = localStorage.getItem("address");
		if (!a || a === undefined || a === "") {
			return window.location.replace("/");
		}
		getBalance();
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

	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
				width: "100vw",
				justifyContent: "center",
			}}
		>
			<Notification
				isOpen={notification}
				handleExternalClose={handleNotificationDialogClose}
				data={notifData}
			/>
			<PayDialog
				isOpen={payOpen}
				handleExternalClose={handleNotificationDialogClose}
			/>
			<Box
				sx={{
					backgroundColor: "#FDE9E9",
					maxWidth: "420px",
					minWidth: "420px",
					width: "100%",
					p: 2,
					background: `url("${Userbg}")`,
					backgroundPosition: "top",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}
			>
				<Box display={"flex"} alignItems="center" mt={2} mb={14}>
					<Avatar
						sx={{
							height: "55px",
							width: "55px",
							mr: 2,
							bgcolor: "white",
							p: 0.75,
						}}
						src={Logo}
					/>
					<Tooltip
						title="Copied!"
						placement="top"
						open={open}
						onClose={() => setOpen(false)}
					>
						<h1
							onClick={() => {
								navigator.clipboard.writeText(address);
								setOpen(true);
							}}
							style={{ cursor: "pointer" }}
						>
							{shortText(address)}
						</h1>
					</Tooltip>
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
						onClick={() => setPayOpen(true)}
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
