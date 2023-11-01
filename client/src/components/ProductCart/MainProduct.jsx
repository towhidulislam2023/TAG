/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";
import {
	FaCheckCircle,
	FaCross,
	FaMapMarkerAlt,
	FaMinus,
	FaPlus,
	FaWindowClose,
} from "react-icons/fa";
import { FaEye, FaRegMessage, FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import {
	checkIfInCart,
	getDiscountPrice,
	getProductCartQuantity,
} from "../../helpers/product";
import { api } from "../../lib/api";
import {
	addToCart,
	increaseQuantityofProd,
} from "../../store/slices/cart-slice";
import LocationModal from "../LocationModal/LocationModal";
import MessageModal from "../MessageModal/MessageModal";
import { AddToCartIcon1, AddToCartIcon2, MapIcon } from "../../SvgHub/Icons";
import { Takaicon } from "../../SvgHub/SocialIcon";

const MainProduct = ({ shopperProduct, product, height, width }) => {
	const navigate = useNavigate();
	const prod = product || shopperProduct;
	// console.log(prod, "prod");
	const {
		name,
		price,
		image,
		id,
		discount,
		view,
		isVerified,
		shopper_id,
		shipping_address,
	} = prod;
	// console.log(shopper_id, "shopper_id");
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(0);
	const [display, setDisplay] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [isLocatioonOpen, setIsLocatioonOpen] = useState(false);

	const { user } = useAuth();
	const handleMouseEnter = () => {
		setDisplay(1); // Set the quantity to 1 when hovering
	};

	const handleMouseLeave = () => {
		setDisplay(0); // Reset the quantity when leaving
	};
	// State for quantity
	// const [quantity, setQuantity] = useState(product_count);

	// Function to increase quantity
	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	// Function to decrease quantity
	const decreaseQuantity = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
		}
	};
	const handelOpenMessageModal = () => {
		setIsOpen(!isOpen);
	};
	const handelOpenLocationModal = () => {
		setIsLocatioonOpen(!isOpen);
	};
	const navigateProductPage = (id) => {
		api.post(`/shopperproduct/increaseView/${id}`);
		navigate(`/product/${id}`);
	};
	const divStyle = {
		borderRadius: "12px",
		background: "#FFF",
		boxShadow: "0px 8px 32px 0px rgba(184, 184, 184, 0.10)",
	};
	const cartItems = useSelector((state) => state.cart.cartItems);
	return (
		<div className="z-0 " style={divStyle}>
			<div
				className="relative flex flex-col items-center justify-center"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<img
					className={`${
							height ? `h-[${height}px]` : "h-1/2"
						}  ${
							width ? `w-[${width}px]` : "w-1/2"
						}  object-cover my-1 `}
					src={`${
						import.meta.env.VITE_APP_IMG_URL
					}/products/${image}`}
					alt=""
				/>
				{display > 0 && (
					<div
						className={`absolute  flex   ${
							height ? `h-[150px]` : "h-full"
						}  ${
							width ? `w-[150px]` : "w-full"
						}  items-center justify-center gap-2 rounded-sm bg-black bg-opacity-50`}
					>
						<div className="relative mt-1 flex flex-col items-center justify-center gap-10">
							<h4 className="text-base text-white">
								Total Price:{" "}
								{`${(
									parseFloat(
										getDiscountPrice(price, discount)
									) * quantity
								).toFixed(2)}`}
							</h4>
							<div className="flex items-center gap-1">
								<button
									type="button"
									onClick={decreaseQuantity}
									className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 leading-10  transition hover:opacity-75"
								>
									<FaMinus className="text-black" />
								</button>

								<input
									type="number"
									id="Quantity"
									value={quantity}
									disabled
									className="h-8 w-12 rounded border border-gray-200 bg-white text-center "
								/>

								<button
									type="button"
									onClick={increaseQuantity}
									className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 leading-10   transition hover:opacity-75"
								>
									<FaPlus className="text-black" />
								</button>
							</div>
						</div>
						<div className="absolute right-2 top-1 lg:hidden">
							<button
								type="button"
								onClick={handleMouseLeave}
								className=" flex items-center justify-center rounded-md  p-1 leading-10  transition hover:opacity-75"
							>
								<FaX className="rounded-md text-xl text-pink-400 " />
							</button>
						</div>
					</div>
				)}
			</div>
			{/* name  */}
			<div className="flex items-start justify-start gap-3 px-2 my-1">
				<button
					type="button"
					onClick={() => {
						navigateProductPage(id);
					}}
				>
					<div className="h-10 text-left ">
						<h1 className="text-xs ">
							{name}
						</h1>
					</div>
				</button>

				<div>
					{isVerified === "verified" ? (
						<FaCheckCircle className=" primary-text"></FaCheckCircle>
					) : (
						""
					)}
				</div>
			</div>
			{/* price  */}
			<div className="px-2">
				<div className="flex items-center gap-2">
					<Takaicon></Takaicon>
					<span className="text-sm font-semibold">{`${getDiscountPrice(
						price,
						discount
					)}`}</span>
				</div>
			</div>
			<div className="my-2"></div>
			<div className=" flex items-center justify-between border-b border-gray-100 ">
				<div className=" flex items-center">
					{user.access === "admin" ? (
						""
					) : user.access === "shopper" ? (
						""
					) : (
						<div className=" flex items-center p-1">
							<button onClick={handelOpenLocationModal}>
								<MapIcon
									height={30}
									width={30}
									onClick={handelOpenLocationModal}
								/>
							</button>
							<LocationModal
								isOpen={isLocatioonOpen}
								setIsOpen={setIsLocatioonOpen}
								title={"Location"}
								shopper_id={shopper_id}
								map_location={shipping_address}
							></LocationModal>
						</div>
					)}
				</div>

				<div className=" flex items-center">
					{user.access === "admin" ? (
						""
					) : user.access === "shopper" ? (
						""
					) : (
						<button
							onClick={() => {
								prod.quantity = quantity;
								if (checkIfInCart(cartItems, prod)) {
									dispatch(increaseQuantityofProd(prod));
								} else {
									dispatch(addToCart(prod));
								}
							}}
							className=""
						>
							<AddToCartIcon2></AddToCartIcon2>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default MainProduct;

// <div className=" flex items-end justify-between px-2">
//

// 				{user.access === "admin" && (
// 					<div className="flex gap-2">
// 						<FaEye></FaEye>
// 						<p className="text-xs">{view}</p>
// 					</div>
// 				)}
// 				{user.access === "shopper" && (
// 					<div className="flex gap-2">
// 						<FaEye></FaEye>
// 						<p className="text-xs">{view}</p>
// 					</div>
// 				)}
// 			</div>
