import { Link } from "react-router-dom";
import { getDiscountPrice } from "../../helpers/product";
import { Takaicon } from "../../SvgHub/SocialIcon";

const OrderProducTable = ({ product }) => {
	return (
		<div>
			<div className="relative my-2 h-[80px] bg-gray-100 p-2">
				<img
					className="absolute top-2 h-[60px] w-[60px]"
					src={`${import.meta.env.VITE_APP_IMG_URL}/products/${
						product.product_image
					}`}
					alt="Selected Product"
				/>
				<div className="ms-auto h-fit w-[75%]">
					<Link
						to={`${import.meta.env.VITE_API_PUBLIC_URL}/product/${
							product.pid
						}`}
					>
						<h1 className="text-sm">{product.name}</h1>
					</Link>
				</div>
				<div className="ms-auto mt-3 flex w-[90%] justify-end gap-5">
					<div>
						<h2 className="text-xs">
							{getDiscountPrice(
								product.product_Price,
								product.product_discounted_price
							)}{" "}
							X {product.product_quantity}
						</h2>
					</div>
					<div>
						<h2 className="flex items-center gap-1 text-xs">
							<Takaicon></Takaicon>{" "}
							{parseFloat(
								getDiscountPrice(
									product.product_Price,
									product.product_discounted_price
								) * product.product_quantity
							).toFixed(2)}
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderProducTable;
