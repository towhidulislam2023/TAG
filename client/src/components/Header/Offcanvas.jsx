import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { api } from "../../lib/api";
import { FaBars, FaHome, FaUserPlus } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import Drawer from "react-modern-drawer";
function Offcanvas(props) {
	const {
		toggleDrawer,
		mobileDrawerStyle,
		desktopDrawerStyle,
		isOffcanvasOpen,
		setIsOffcanvasOpen,
	} = props;
	const userid = localStorage.getItem("user-id");
	const [userInfo, setUserInfo] = useState([]);
	const { user } = useAuth();
	console.log(user);
	useEffect(() => {
		const offcanvasNavigations = document.querySelectorAll(
			".offcanvas-navigation > li"
		);
		offcanvasNavigations.forEach((single) => {
			single.addEventListener("click", () => {
				props.activeStatus(false);
			});
		});
		if (userid) {
			api.get(`/auth/getUserInfo/${userid}`).then((res) => {
				setUserInfo(res.data);
			});
		}
	}, [props, userid]);

	const logout = () => {
		localStorage.removeItem("user-id");
		Cookies.remove("user");
		Cookies.remove("auth");
		window.location.href = "/login";
	};
	const handeloffDrawer = () => {
		setIsOffcanvasOpen(!isOffcanvasOpen);
	};

	return (
		// <div className={`offcanvas-menu ${props.show ? "active" : ""}`}>

		// </div>
		<div>
			<button onClick={toggleDrawer}>
				<ReactSVG
					src={
						import.meta.env.VITE_API_PUBLIC_URL +
						"/assets/img/icons/menu.svg"
					}
				/>
			</button>
			<Drawer
				open={isOffcanvasOpen}
				onClose={toggleDrawer}
				direction="left"
				style={
					window.innerWidth < 768
						? mobileDrawerStyle
						: desktopDrawerStyle
				}
			>
				<div className="py-20 ">
					{userInfo.map((item) => (
						<div key={item} className="profile-card text-center">
							<div>
								<div className="avatar">
									<div className="w-20 rounded-full ring  ring-offset-2 ring-offset-[#00AAFF]">
										<img
											src={
												item.image
													? `${
															import.meta.env
																.VITE_APP_IMG_URL
													  }/user/${item.image}`
													: `${
															import.meta.env
																.VITE_API_PUBLIC_URL +
															"/assets/img/profile.jpg"
													  }`
											}
											className="img-fluid"
											alt=""
										/>
									</div>
								</div>
							</div>
							<div className="profile-card__content">
								<p className="name text-lg">
									{item.name ? item.name : "Guest"}{" "}
									<span className="id">
										ID: {user ? user.id : "Guest"}{" "}
										{/* Assuming you want to display the user's ID */}
									</span>
								</p>
							</div>
						</div>
					))}
					<div className="">
						<ul
							onClick={handeloffDrawer}
							className="offcanvas-navigation overflow-y-auto"
						>
							<li>
								<span className="icon">
									<FaHome />
								</span>
								<Link to={"/home"}> Home</Link>
							</li>
							<li>
								<span className="icon">
									<ReactSVG
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/assets/img/icons/profile-two.svg"
										}
									/>
								</span>
								{userInfo.map((item) =>
									item.access == "shopper" ? (
										<Link
											key={user}
											to={
												import.meta.env
													.VITE_API_PUBLIC_URL +
												`/shopkeeperDashboard`
											}
										>
											Shop Profile
										</Link>
									) : (
										<Link
											key={user}
											to={
												import.meta.env
													.VITE_API_PUBLIC_URL +
												`/profile`
											}
										>
											Profile
										</Link>
									)
								)}
							</li>
							<li>
								<span className="icon">
									<ReactSVG
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/assets/img/icons/notification.svg"
										}
									/>
								</span>
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/notification"
									}
								>
									Notification
								</Link>
							</li>
							<li>
								<span className="icon">
									<ReactSVG
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/assets/img/icons/product.svg"
										}
									/>
								</span>
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/shop"
									}
								>
									All products
								</Link>
							</li>
							<li>
								<span className="icon">
									<ReactSVG
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/assets/img/icons/cart-two.svg"
										}
									/>
								</span>
								{userInfo.map((item) =>
									item.access == "shopper" ? (
										<Link
											key={user}
											to={
												import.meta.env
													.VITE_API_PUBLIC_URL +
												`/orderShopper`
											}
										>
											Order From Store
										</Link>
									) : (
										<Link
											key={user}
											to={
												import.meta.env
													.VITE_API_PUBLIC_URL +
												`/order`
											}
										>
											My Orders
										</Link>
									)
								)}
							</li>
							{user.access === "customer" && (
								<li>
									<span className="icon">
										<ReactSVG
											src={
												import.meta.env
													.VITE_API_PUBLIC_URL +
												"/assets/img/icons/cart-three.svg"
											}
										/>
									</span>
									<Link
										to={
											import.meta.env
												.VITE_API_PUBLIC_URL + "/cart"
										}
									>
										Cart
									</Link>
								</li>
							)}

							<li>
								<span className="icon">
									<ReactSVG
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/assets/img/icons/gear-two.svg"
										}
									/>
								</span>
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/edit-profile"
									}
								>
									Edit Profile
								</Link>
							</li>
							<li>
								<span className="icon">
									<FaUserPlus className="text-xl"></FaUserPlus>
								</span>
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/referPage"
									}
								>
									Refer
								</Link>
							</li>
							{userInfo.map((item) =>
								item.access == "admin" ? (
									<li key={item.id}>
										<span className="icon">
											<img
												width="50"
												height="50"
												src="https://img.icons8.com/ios-filled/50/administrator-male--v1.png"
												alt="administrator-male--v1"
											/>
										</span>
										<Link
											to={
												import.meta.env
													.VITE_API_PUBLIC_URL +
												"/admin/stat"
											}
										>
											Admin Page
										</Link>
									</li>
								) : null
							)}
							<li>
								<span className="icon">
									<img
										width="24"
										height="24"
										src="https://img.icons8.com/material-outlined/24/exit.png"
										alt="exit"
									/>
								</span>
								<button onClick={logout}>Logout</button>
							</li>
						</ul>
					</div>
				</div>
			</Drawer>
		</div>
	);
}

export default Offcanvas;
