import HiddenInputs from '@/app/(product)/product/[id]/components/HiddenInputs';
import usePaymentScript from '@/app/(product)/product/[id]/hooks/usePaymentScript';
import useSaleRate from '@/app/(product)/product/[id]/hooks/useSaleRate';
import useTotalAmount from '@/app/(product)/product/[id]/hooks/useTotalAmount';
import { fetchRegisterCartItem } from '@/app/api/cart/fetchRegisterCartItem';
import { fetchUserInfo } from '@/app/api/user/fetchUserInfo';
import ConfirmAndPayTheAmountBox from '@/components/order/ConfirmAndPayTheAmountBox';
import PaymentMethodSelectBox from '@/components/order/PaymentMethodSelectBox';
import ProductSelectBox from '@/components/product/ProductSelectBox';
import QuantitySelectBox from '@/components/product/QuantitySelectBox';
import useAlertContext from '@/hooks/useAlertContext';
import { CartItem } from '@/models/cart';
import { PriceCategoryInfo, ProductInfo } from '@/models/product';
import authState from '@/recoil/authAtom';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import * as cs from '@/shared/styles/common.css';
import * as styles from './ProductDetailSelectAndPayBox.css';

import { vars } from '@/shared/styles/theme.css';
import { useRouter } from 'next/navigation';
interface Props {
	product: ProductInfo;
}

const ProductDetailSelectAndPayBox = ({ product }: Props) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [priceCategories, setPriceCategories] = useState<PriceCategoryInfo[]>([]);
	const [selectedType, setSelectedType] = useState('card');

	const saleRate = useSaleRate(selectedType, product);
	const { totalAmount, finalAmount } = useTotalAmount(
		cartItems,
		priceCategories,
		saleRate,
		selectedType,
	);

	const { isLoggedIn } = useRecoilValue(authState);
	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();
	const router = useRouter();
	const formRef = useRef(null);

	usePaymentScript();

	const { data: userInfo } = useQuery({ queryKey: ['userInfo'], queryFn: fetchUserInfo });
	console.log(userInfo, 'userInfo');
	const postCartItemMutation = useMutation({
		mutationFn: (data: CartItem[]) => fetchRegisterCartItem(userInfo?.id as number, data),
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
			queryClient.invalidateQueries({ queryKey: ['cartItems', userInfo?.id] });
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

	const handleAddToCart = (event) => {
		event.preventDefault(); // 기본 form 제출 방지
		if (!isLoggedIn) {
			open({
				width: '340px',
				height: '250px',
				title: '로그인 확인',
				main: <AlertMainTextBox text="장바구니 담기는 로그인 후 이용 가능합니다." />,
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
			return;
		}
		postCartItemMutation.mutate(cartItems);
	};

	const handleQuantityChange = (updatedItems: CartItem[]) => {
		setCartItems(updatedItems);
	};

	const handleRemoveItem = (index: number) => {
		setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
	};

	const orderData = {
		SERVICE_ID: 'M2483583',
		SERVICE_CODE: selectedType === 'card' ? '0900' : '1100',
		SERVICE_TYPE: '0000',
		ORDER_ID: 'ORD202312270001',
		ORDER_DATE: new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14),
		AMOUNT: '10000',
		RETURN_URL: 'https://pintossmall2.com/sample/payreturn',
		ITEM_CODE: 'ITEM123',
		ITEM_NAME: 'Test Item',
		// USER_ID: 'sdas23@dsa.com',
		// USER_NAME: '홍길동',
		// USER_EMAIL: 'sdas23@dsa.com',
		LOGO: 'https://www.billgate.net/billgate/resources/asset/image/common/h1_logo.png',
	};
	const handleSelectCategory = (category: PriceCategoryInfo): void => {
		setPriceCategories((prev): PriceCategoryInfo[] => {
			if (!prev.some((item) => item.id === category.id)) {
				return [...prev, category];
			}
			return prev;
		});
	};
	//구매 결제로직
	const handleCheckoutNow: React.MouseEventHandler<HTMLButtonElement> = (event) => {
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
		if (window.GX_pay) {
			window.GX_pay('paymentForm', 'popup', 'https_pay');
		} else {
			console.error('Payment script is not loaded.');
		}
	};
	console.log(selectedType, 'selcect');
	return (
		<form
			ref={formRef}
			name="paymentForm"
			method="post"
			encType="application/x-www-form-urlencoded">
			<div className={styles.wrapper}>
				<HiddenInputs orderData={orderData} />

				<ProductSelectBox product={product} onSelectCategory={handleSelectCategory} />

				<Spacing margin="30px" />
				<QuantitySelectBox
					cartItems={cartItems}
					priceCategories={priceCategories as PriceCategoryInfo[]}
					onQuantityChange={handleQuantityChange}
					onRemoveItem={handleRemoveItem}
				/>
				<Spacing margin="30px" />
				<PaymentMethodSelectBox selectedType={selectedType} setSelectedType={setSelectedType} />
				<Spacing margin="30px" />
				<ConfirmAndPayTheAmountBox selectedType={selectedType} totalAmount={totalAmount} />
				<Spacing margin="15px" />
				<Flex justify="space-between" className={styles.totalPayInfoBox}>
					<span className={styles.whiteBoldText}>최종 결제 금액</span>
					<span className={styles.whiteBoldText}>{finalAmount.toLocaleString()} 원</span>
				</Flex>
				<Spacing margin="15px" />
				<Flex style={{ width: '100%' }}>
					<Button
						color={vars.color.white}
						className={cs.darkBlueButton}
						onClick={handleCheckoutNow}>
						바로 구매
					</Button>
					<Button color={vars.color.white} className={cs.lightBlueButton} onClick={handleAddToCart}>
						장바구니 담기
					</Button>
				</Flex>
			</div>
		</form>
	);
};

export default ProductDetailSelectAndPayBox;
