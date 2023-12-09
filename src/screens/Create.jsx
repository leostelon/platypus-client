import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Drawer } from "../components/Drawer";
import { createPayment } from "../api/payment";

export const Create = () => {
	const [amount, setAmount] = useState("");

	useEffect(() => {}, []);

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
						<h1>Create Payment</h1>
						<br />
					</Box>
					<Box mt={2} maxWidth={"420px"}>
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
						<Box
							sx={{
								display: "flex",
								justifyContent: "flex-end",
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
								}}
								onClick={async () => {
									await createPayment(amount);
									setAmount("");
								}}
							>
								Create Payment
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
							*Payments can be created and shared through links to collect
							money.
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
