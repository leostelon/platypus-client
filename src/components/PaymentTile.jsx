import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { PrimaryGrey } from "../constant";
import { Box, Tooltip } from "@mui/material";
import { shortText } from "../utils/shortText";

export const PaymentTile = ({ payment }) => {
	const [copyEnabled, setCopyEnabled] = useState(false);
	const [open, setOpen] = useState(false);

	function toggleCopy() {
		setCopyEnabled(!copyEnabled);
	}

	return (
		<tr>
			<td
				style={{ fontWeight: "500", color: "#303031", display: "flex" }}
				onMouseEnter={toggleCopy}
				onMouseLeave={toggleCopy}
			>
				{shortText(payment._id)}
				<Tooltip
					title="Copied!"
					placement="top"
					open={open}
					onClose={() => setOpen(false)}
				>
					<Box
						onClick={() => {
							navigator.clipboard.writeText(payment.job_id);
							setOpen(true);
						}}
					>
						<MdContentCopy
							style={{
								color: PrimaryGrey,
								visibility: copyEnabled ? "visible" : "hidden",
								cursor: "pointer",
							}}
							size={16}
						/>
					</Box>
				</Tooltip>
			</td>
			<td>{shortText(payment.address)}</td>
			<td>{payment.amount}</td>
			<td>{"Copy"}</td>
			<td>{"Request"}</td>
			{/* <td>09/04/2023 20:29</td> */}
			<td>{new Date(payment.createdAt).toDateString()}</td>
		</tr>
	);
};
