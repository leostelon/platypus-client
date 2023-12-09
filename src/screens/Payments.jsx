import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Drawer } from "../components/Drawer";
import { PaymentTile } from "../components/PaymentTile";
import { getPayments } from "../api/payment";

export const Payments = () => {
	const [loading, setLoading] = useState(false);
	const [payments, setPayments] = useState([]);

	async function gP() {
		setLoading(true);
		const address = localStorage.getItem("address");
		const jobResolved = await getPayments(address);
		setPayments(jobResolved);
		setLoading(false);
	}

	useEffect(() => {
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
						flexDirection: "column",
						color: "#4c4848",
					}}
				>
					<Box>
						<h1>Payments</h1>
						<br />
					</Box>
					{loading ? (
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
										<th>Copy Link</th>
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
	);
};
