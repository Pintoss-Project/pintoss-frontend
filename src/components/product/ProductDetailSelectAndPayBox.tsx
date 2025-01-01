'use client';

import { fetchRegisterCartItem } from '@/app/api/cart/fetchRegisterCartItem';
import { fetchPriceCategory } from '@/app/api/product/fetchPriceCategory';
import { fetchUserInfo } from '@/app/api/user/fetchUserInfo';
import useAlertContext from '@/hooks/useAlertContext';
import { CartItem } from '@/models/cart';
import { PriceCategoryInfo, ProductInfo } from '@/models/product';
import authState from '@/recoil/authAtom';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ConfirmAndPayTheAmountBox from '../order/ConfirmAndPayTheAmountBox';
import PaymentMethodSelectBox from '../order/PaymentMethodSelectBox';
import * as s from './ProductDetailStyle.css';
import ProductSelectBox from './ProductSelectBox';
import QuantitySelectBox from './QuantitySelectBox';

interface Props {
	product: ProductInfo;
}

const ProductDetailSelectAndPayBox = ({ product }: Props) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [priceCategories, setPriceCategories] = useState<PriceCategoryInfo[]>();
	const [selectedType, setSelectedType] = useState<string>('card');
	const [saleRate, setSaleRate] = useState(product?.cardDiscount || 0);
	const [totalAmount, setTotalAmount] = useState(0);
	const [finalAmount, setFinalAmount] = useState(0);
	const formRef = useRef(null);

	const { isLoggedIn } = useRecoilValue(authState);
	const router = useRouter();

	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();

	const { data: userInfo } = useQuery({
		queryKey: ['userInfo'],
		queryFn: fetchUserInfo,
	});

	useEffect(() => {
		setSaleRate(selectedType === 'card' ? product?.cardDiscount : product?.phoneDiscount);
	}, [selectedType, product]);

	useEffect(() => {
		const calculatedTotalAmount = cartItems.reduce((total, item) => {
			const category = priceCategories?.find((c) => c.id === item.priceCategoryId);
			const price = category ? category.price : 0;
			const discountedPrice = price * (1 - saleRate / 100);
			const itemTotal = discountedPrice * item.quantity;
			return Math.round(total + itemTotal);
		}, 0);

		setTotalAmount(calculatedTotalAmount);

		const calculatedFinalAmount =
			selectedType === 'phone' ? Math.round(calculatedTotalAmount * 1.1) : calculatedTotalAmount;

		setFinalAmount(calculatedFinalAmount);
	}, [cartItems, priceCategories, saleRate, selectedType]);

	const postCartItemMutation = useMutation({
		mutationFn: (data: CartItem[]) => fetchRegisterCartItem(userInfo?.data?.id as number, data),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '장바구니 추가',
				main: <AlertMainTextBox text="장바구니에 상품이 추가되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: () => {
					router.push('/order/cart');
					close();
				},
			});
			queryClient.invalidateQueries({ queryKey: ['cartItems', userInfo?.data.id] });
		},
		onError: () => {
			if (isLoggedIn) {
				open({
					width: '300px',
					height: '200px',
					title: '장바구니 추가',
					main: <AlertMainTextBox text="장바구니 추가가 실패되었습니다." />,
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: close,
				});
			}
		},
	});

	const handleCheckoutNow = (event) => {
		event.preventDefault(); // 기본 form 제출 방지
		if (!isLoggedIn) {
			open({
				width: '360px',
				height: '250px',
				title: '로그인 확인',
				main: (
					<AlertMainTextBox text="바로 구매하기는 로그인 후에 이용가능합니다. 로그인 페이지로 이동하시겠습니까?" />
				),
				rightButtonLabel: '확인',
				rightButtonStyle: cs.lightBlueMediumButton,
				leftButtonLabel: '취소',
				leftButtonStyle: cs.whiteAndBlackButton,
				onRightButtonClick: () => {
					router.push('/login');
					close();
				},
				onLeftButtonClick: close,
			});
		}
		console.log('안녕');
		if (window.GX_pay) {
			window.GX_pay('paymentForm', 'popup', 'https_tpay');
		} else {
			console.error('Payment script is not loaded.');
		}
	};
	useEffect(() => {
		// 스크립트 동적으로 추가
		const script = document.createElement('script');
		script.src = 'https://pay.billgate.net/paygate/plugin/gx_web_client.js';
		script.type = 'text/javascript';
		script.async = true;

		script.onload = () => {
			console.log('Payment script loaded successfully.');
		};

		script.onerror = () => {
			console.error('Failed to load the payment script.');
		};

		document.head.appendChild(script);

		// Cleanup script when the component unmounts
		return () => {
			document.head.removeChild(script);
		};
	}, []);

	const handleAddToCart = () => {
		if (!isLoggedIn) {
			open({
				width: '340px',
				height: '250px',
				title: '로그인 확인',
				main: (
					<AlertMainTextBox text="장바구니 담기는 로그인 후에 이용가능합니다. 로그인 페이지로 이동하시겠습니까?" />
				),
				rightButtonLabel: '확인',
				rightButtonStyle: cs.lightBlueMediumButton,
				leftButtonLabel: '취소',
				leftButtonStyle: cs.whiteAndBlackButton,
				onRightButtonClick: () => {
					router.push('/login');
					close();
				},
				onLeftButtonClick: close,
			});
		}

		postCartItemMutation.mutate(cartItems);
	};

	const handleSelectCategory = async (category: PriceCategoryInfo) => {
		try {
			const categoryPriceInfo = await fetchPriceCategory(product.id, category.id);

			setPriceCategories((prev) => {
				const updatedCategories = prev ? [...prev] : [];
				const exists = updatedCategories.find((c) => c.id === category.id);
				if (!exists) {
					return [...updatedCategories, categoryPriceInfo?.data];
				}
				return updatedCategories.map((c) => (c.id === category.id ? categoryPriceInfo?.data : c));
			});

			setCartItems((prevItems) => {
				const existingItem = prevItems.find((item) => item.priceCategoryId === category.id);

				if (existingItem) {
					return prevItems.map((item) =>
						item.priceCategoryId === category.id ? { ...item, quantity: item.quantity + 1 } : item,
					);
				} else {
					return [
						...prevItems,
						{
							productId: product.id,
							priceCategoryId: category.id,
							name: product.name,
							quantity: 1,
							payMethod: selectedType.toUpperCase(),
						},
					];
				}
			});
		} catch (error) {
			open({
				width: '300px',
				height: '200px',
				title: '가격 정보 불러오기 실패',
				main: <AlertMainTextBox text="가격 정보를 불러오지 못했습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		}
	};

	const handleQuantityChange = (updatedItems: CartItem[]) => {
		setCartItems(updatedItems);
	};

	const handleRemoveItem = (index: number) => {
		setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
	};

	return (
		<form
			name="paymentForm"
			ref={formRef}
			method="post"
			action="http://localhost:3000/order/cart" // 서버 엔드포인트
			encType="application/x-www-form-urlencoded">
			<div className={s.productDetailSelectAndPayBox}>
				<input type="hidden" name="SERVICE_ID" value="M2103135" />
				<input type="hidden" name="SERVICE_CODE" value="1100" /> {/* 예: 카드 */}
				<input type="hidden" name="SERVICE_TYPE" value="0000" />
				<input type="hidden" name="ORDER_ID" value="123456789" />
				<input
					type="hidden"
					name="ORDER_DATE"
					value={new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}
				/>
				<input type="hidden" name="AMOUNT" value="10000" />
				<input type="hidden" name="RETURN_URL" value="http://localhost:3000/order/cart" />
				<input type="hidden" name="ITEM_CODE" value="ITEM123" />
				<input type="hidden" name="ITEM_NAME" value="Test Item" />
				<input type="hidden" name="USER_ID" value="USER12345" />
				{/* 선택 파라미터 */}
				<input type="hidden" name="USER_NAME" value="홍길동" />
				<input type="hidden" name="USER_EMAIL" value="test@example.com" />
				<input type="hidden" name="LOGO" value="https://your-logo-url.com/logo.png" />s
				<div>
					<div className={s.darkerGrayText} style={{ fontSize: '16px' }}>
						상품 선택
					</div>
					<Spacing margin="9px" />
					<ProductSelectBox product={product} onSelectCategory={handleSelectCategory} />
				</div>
				<Spacing margin="30px" />
				<div>
					<div className={s.darkerGrayText} style={{ fontSize: '16px' }}>
						수량 선택
					</div>
					<QuantitySelectBox
						cartItems={cartItems}
						priceCategories={priceCategories as PriceCategoryInfo[]}
						onQuantityChange={handleQuantityChange}
						onRemoveItem={handleRemoveItem}
					/>
				</div>
				<Spacing margin="30px" />
				<PaymentMethodSelectBox
					selectedType={selectedType}
					setSelectedType={setSelectedType}
					cardDiscount={product?.cardDiscount}
					phoneDiscount={product?.phoneDiscount}
				/>
				<Spacing margin="30px" />
				<ConfirmAndPayTheAmountBox selectedType={selectedType} totalAmount={totalAmount} />
				<Spacing margin="15px" />
				<Flex justify="space-between" className={s.totalPayInfoBox}>
					<span className={s.whiteBoldText} style={{ fontWeight: '400' }}>
						최종 결제 금액
					</span>
					<span className={s.whiteBoldText} style={{ fontWeight: '600' }}>
						{finalAmount.toLocaleString()} 원
					</span>
				</Flex>
				<Spacing margin="15px" />
				<Flex style={{ width: '100%' }}>
					<button onClick={handleCheckoutNow}>바로 구매</button>

					<Button
						color={vars.color.white}
						className={cs.lightBlueButton}
						style={{ maxWidth: '900px', fontSize: '18px', height: '60px' }}
						onClick={handleAddToCart}>
						장바구니 담기
					</Button>
				</Flex>
			</div>
		</form>
	);
};

export default ProductDetailSelectAndPayBox;
