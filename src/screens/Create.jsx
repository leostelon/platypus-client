import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Drawer } from "../components/Drawer";
import { getUserAddress, safeSignin } from "../utils/safe";

export const Create = () => {
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
					<Box flex={3}>
						<h1>Create Payment</h1>
						<br />
					</Box>
					<Box
						onClick={async () => {
							const user = await safeSignin();
							console.log(user);
						}}
					>
						getUser
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
