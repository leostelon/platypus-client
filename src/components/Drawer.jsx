import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	AiFillHome,
	AiFillPlusCircle,
	AiOutlineHome,
	AiOutlinePlusCircle,
} from "react-icons/ai";
import { MdMoney, MdOutlineMoney, MdPayment } from "react-icons/md";
import { Avatar } from "@mui/material";

const drawerWidth = 260;

const mainList = [
	{
		text: "Dashboard",
		i: () => <AiOutlineHome />,
		ai: () => <AiFillHome />,
		path: "/merchant",
	},
	{
		text: "Payments",
		i: () => <MdPayment />,
		ai: () => <MdPayment />,
		path: "/merchant/payments",
	},
	{
		text: "Bills",
		i: () => <MdOutlineMoney />,
		ai: () => <MdMoney />,
		path: "/merchant/bills",
	},
	{
		text: "Create Payment",
		i: () => <AiOutlinePlusCircle />,
		ai: () => <AiFillPlusCircle />,
		path: "/merchant/create",
	},
];

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const LeftDrawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	borderRight: "none !important",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const open = true;

export function Drawer({ smaller }) {
	const location = useLocation();
	const navigate = useNavigate();
	const [index, setIndex] = useState(0);

	function updateIndex(path) {
		switch (path) {
			case "/merchant":
				return setIndex(0);
			case "/merchant/payments":
				return setIndex(1);
			case "/merchant/bills":
				return setIndex(2);
			case "/merchant/create":
				return setIndex(3);
			default:
				setIndex(0);
		}
	}

	useEffect(() => {
		updateIndex(location.pathname);

		return () => {};
	}, [location.pathname]);

	return (
		<LeftDrawer
			variant="permanent"
			open={smaller ? false : open}
			sx={{
				mt: 2,
				borderRight: "none",
			}}
		>
			<Box
				sx={{
					backgroundColor: "#EFF2FA",
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "column",
					height: "100%",
					color: "#4c4848",
				}}
			>
				<Box>
					{/* Logo */}
					<Box
						sx={{
							mb: 3,
							display: "flex",
							alignItems: "center",
							p: 3,
							flexDirection: "column",
						}}
					>
						<h2>Platypus</h2>
						<Avatar sx={{ height: "70px", width: "70px", mt: 3 }} />
					</Box>

					{/* Menu List */}
					<Box>
						{mainList.map(({ text, i, ai, path }, ind) => (
							<Box
								key={text}
								onClick={() => {
									navigate(path);
								}}
								sx={{
									backgroundColor: index === ind ? "#DFE0F5" : "",
									p: 1,
									py: 1.5,
									mb: 0.4,
									cursor: "pointer",
									"&:hover": {
										background: index === ind ? "" : "rgb(38 38 38 / 35%)",
										color: "white",
									},
								}}
							>
								<Box
									sx={{
										color: index === ind ? "#4443FF" : "#444444",
										alignItems: "center",
										display: "flex",
									}}
								>
									<Box
										sx={{
											mr: 2,
											fontSize: "20px",
											display: "flex",
										}}
									>
										{index === ind ? ai() : i()}
									</Box>
									<Box
										sx={{
											opacity: open ? 1 : 0,
										}}
									>
										{text}
									</Box>
								</Box>
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</LeftDrawer>
	);
}
