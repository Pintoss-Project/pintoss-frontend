'use client';

import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import * as s from './ProductDetailStyle.css';
import { Flex } from '@/shared/components/layout';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';
import PaymentMethodSelectBox from '../order/PaymentMethodSelectBox';
import ConfirmAndPayTheAmountBox from '../order/ConfirmAndPayTheAmountBox';
import { useEffect, useState } from 'react';
import ProductSelectBox from './ProductSelectBox';
import QuantitySelectBox from './QuantitySelectBox';
import { PriceCategoryInfo, ProductInfo } from '@/models/product';
import { CartItem } from '@/models/cart';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postCartItem } from '@/app/api/cart/postCartItem';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { getUserList } from '@/app/api/user/getUserList';
import { getUserInfo } from '@/app/api/user/getUserInfo';

interface Props {
	product: ProductInfo;
}

const ProductDetailSelectAndPayBox = ({ product }: Props) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [selectedType, setSelectedType] = useState<string>('card');
	const [saleRate, setSaleRate] = useState(product?.cardDiscount || 0);
	const [originalPrices, setOriginalPrices] = useState<{ [categoryId: number]: number }>({});

	const { open, close } = useAlertContext();

	const { data: userInfo } = useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
	});

	useEffect(() => {
		setSaleRate(selectedType === 'card' ? product?.cardDiscount : product?.phoneDiscount);
	}, [selectedType, product]);

	const postCartItemMutation = useMutation({
		mutationFn: (data: CartItem) =>
			postCartItem(data.productId, userInfo?.data?.id as number, data),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '장바구니 추가',
				main: <AlertMainTextBox text="장바구니에 상품이 추가되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '장바구니 추가',
				main: <AlertMainTextBox text="장바구니 추가가 실패되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const handleAddToCart = () => {
		cartItems.forEach((item) => {
			postCartItemMutation.mutate(item);
		});
	};

	const handleSelectCategory = (category: PriceCategoryInfo) => {
		const discountRate = selectedType === 'card' ? product.cardDiscount : product.phoneDiscount;
		const discountedPrice = category.price * ((100 - discountRate) / 100);

		setOriginalPrices((prevPrices) => ({
			...prevPrices,
			[category.id]: category.price,
		}));

		setCartItems((prevItems) => [
			...prevItems,
			{
				productId: product.id,
				priceCategoryId: category.id,
				name: product.name,
				price: discountedPrice,
				quantity: 1,
				payMethod: selectedType.toUpperCase(),
			},
		]);
	};

	const handleQuantityChange = (updatedItems: CartItem[]) => {
		setCartItems(updatedItems);
	};

	const handleRemoveItem = (index: number) => {
		setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
	};

	return (
		<div className={s.productDetailSelectAndPayBox}>
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
					originalPrices={originalPrices}
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
			<ConfirmAndPayTheAmountBox
				selectedType={selectedType}
				totalAmount={cartItems.reduce((total, item) => total + item.quantity * item.price, 0)}
			/>
			<Spacing margin="15px" />
			<Flex justify="space-between" className={s.totalPayInfoBox}>
				<span className={s.whiteBoldText} style={{ fontWeight: '400' }}>
					최종 결제 금액
				</span>
				<span className={s.whiteBoldText} style={{ fontWeight: '600' }}>
					{cartItems
						.reduce((total, item) => total + item.quantity * item.price, 0)
						.toLocaleString()}
					원
				</span>
			</Flex>
			<Spacing margin="15px" />
			<Flex style={{ width: '100%' }}>
				<Button
					color={vars.color.white}
					className={cs.lightBlueButton}
					style={{ maxWidth: '900px', fontSize: '18px', height: '60px' }}
					onClick={handleAddToCart}>
					장바구니 담기
				</Button>
			</Flex>
		</div>
	);
};

export default ProductDetailSelectAndPayBox;
