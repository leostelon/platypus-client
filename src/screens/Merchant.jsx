import { Box, IconButton, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Drawer } from "../components/Drawer";
import { MdAddCircleOutline } from "react-icons/md";
import Cardbg from "../assets/cardbg.png";
import { shortText } from "../utils/shortText";
import Logo from "../assets/logo.png";
import { PieChart } from "@mui/x-charts/PieChart";
import { PaymentTile } from "../components/PaymentTile";
import { getPayments } from "../api/payment";
import { LineChart } from "@mui/x-charts/LineChart";
import { getTransactionsByAccount } from "../api/transaction";
import Web3 from "web3";

export const Merchant = () => {
	const [address, setAddress] = useState("");
	const [paymentLoading, setPaymentLoading] = useState(true);
	const [payments, setPayments] = useState([]);
	const [transactions, setTransactions] = useState({
		amount: [],
		time: [],
	});

	async function gP() {
		setPaymentLoading(true);
		const address = localStorage.getItem("address");
		const jobResolved = await getPayments(address);
		setPayments(jobResolved);
		setPaymentLoading(false);
	}

	function getAddress() {
		const ad = localStorage.getItem("address");
		setAddress(ad);
		gT(ad);
	}

	async function gT(ad) {
		const res = await getTransactionsByAccount(ad);
		const amount = res.result.map((r) =>
			parseFloat(Number(Web3.utils.fromWei(r.value, "ether")).toFixed(3))
		);
		const time = res.result.map((r) => new Date(r.timeStamp * 1000));
		setTransactions({ amount, time });
	}

	useEffect(() => {
		getAddress();
		gP();
	}, []);

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
					<Box display="flex" sx={{ flexDirection: "column", width: "100%" }}>
						<h1>Dashboard</h1>
						<br />
						<Box sx={{ display: "flex", width: "100%", height: "100%" }}>
							<Box
								sx={{
									width: "100%",
									height: "50vh",
									maxHeight: "50vh",
									flex: 4,
									p: 2,
									m: 1,
									boxShadow: "0 1px 6px rgba(0,0,0,.1)",
								}}
							>
								<LineChart
									sx={{
										"& .MuiAreaElement-root": {
											fill: "#E4E4FC",
										},
										"& .MuiLineElement-root": {
											strokeWidth: 4,
										},
									}}
									xAxis={[{ data: [1, 2, 3, 5] }]}
									// xAxis={[{ data: transactions.time }]}
									series={[
										{
											data: transactions.amount,
											area: true,
											color: "#4443FF",
										},
									]}
									width={700}
								/>
							</Box>
							<Box
								sx={{
									width: "100%",
									height: "50vh",
									flex: 2,
									p: 2,
									m: 1,
									boxShadow: "0 1px 6px rgba(0,0,0,.1)",
								}}
							>
								<h2>Your Account</h2>
								<br />
								<Box
									sx={{
										borderRadius: 4,
										backgroundImage: `url(${Cardbg})`,
										backgroundPosition: "center",
										backgroundSize: "cover",
										backgroundColor: "blue",
										width: "100%",
										height: "55%",
										mb: 1,
										p: 2,
										color: "white",
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
									}}
								>
									<Box
										sx={{ display: "flex", justifyContent: "space-between" }}
									>
										<h2>EVM Chain</h2>
										<h2>0.5ETH</h2>
									</Box>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<h3>{shortText(address)}</h3>
										<img src={Logo} alt="logo" height="45px" />
									</Box>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Box>
										<IconButton sx={{ cursor: "no-drop" }}>
											<MdAddCircleOutline size={"35"} />
										</IconButton>
									</Box>
									<small>Support for multiple accounts coming soon.</small>
								</Box>
							</Box>
						</Box>
						<Box sx={{ display: "flex", width: "100%", height: "100%" }}>
							<Box
								sx={{
									width: "100%",
									height: "50vh",
									flex: 3,
									p: 2,
									m: 1,
									boxShadow: "0 1px 6px rgba(0,0,0,.1)",
								}}
							>
								<PieChart
									series={[
										{
											data: [
												{
													id: 0,
													value: 10,
													label: "Total Bills",
													color: "#FFB878",
												},
												{
													id: 1,
													value: 15,
													label: "Pending Bills",
													color: "#5455FF",
												},
												{
													id: 2,
													value: 20,
													label: "Paid Bill",
													color: "#FE647E",
												},
											],
											innerRadius: 65,
											outerRadius: 100,
										},
									]}
									width={450}
									height={200}
								/>
							</Box>
							<Box
								sx={{
									width: "100%",
									height: "50vh",
									flex: 4,
									p: 2,
									m: 1,
									boxShadow: "0 1px 6px rgba(0,0,0,.1)",
								}}
							>
								{paymentLoading ? (
									<Box>
										{Array.from({ length: 10 }).map((_, i) => (
											<Skeleton
												variant="rectangular"
												sx={{ my: 1 }}
												height={"75px"}
												key={i}
											/>
										))}
									</Box>
								) : (
									<Box mt={2}>
										<table>
											<thead>
												<tr>
													<th>Id</th>
													<th>Payment Address</th>
													<th>Amount</th>
													<th>Payment Link</th>
													<th>Request</th>
													<th>Created</th>
												</tr>
											</thead>
											<tbody>
												{payments.map((item, i) => (
													<PaymentTile payment={item} key={i} />
												))}
											</tbody>
										</table>
									</Box>
								)}
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
