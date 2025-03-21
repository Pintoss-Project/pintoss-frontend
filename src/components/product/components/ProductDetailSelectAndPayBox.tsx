import { fetchRegisterCartItem } from '@/controllers/cart/fetchRegisterCartItem';
import ConfirmAndPayTheAmountBox from '@/components/order/ConfirmAndPayTheAmountBox';
import PaymentMethodSelectBox from '@/components/order/PaymentMethodSelectBox';
import ProductSelectBox from '@/components/product/ProductSelectBox';
import QuantitySelectBox from '@/components/product/QuantitySelectBox';
import useAlertContext from '@/hooks/useAlertContext';
import { CartItem } from '@/models/cart';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import * as cs from '@/shared/styles/common.css';
import * as styles from './ProductDetailSelectAndPayBox.css';
import { vars } from '@/shared/styles/theme.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { VoucherDetailResponse, VoucherProviderListResponse } from '@/types/api';
import useSaleRate from '../hooks/useSaleRate';
import useTotalAmount from '../hooks/useTotalAmount';
import HiddenInputs from '@/shared/components/order/HiddenInputs';
import useOrder from '@/hooks/useOrder';
import { apiClient } from '@/controllers/new-api-service';

interface Props {
  product: VoucherProviderListResponse;
}

const ProductDetailSelectAndPayBox = ({ product }: Props) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [priceCategories, setPriceCategories] = useState<VoucherDetailResponse[]>([]);
  const [selectedType, setSelectedType] = useState('card');

  const saleRate = useSaleRate(selectedType, product);
  const { totalAmount, finalAmount } = useTotalAmount(
    cartItems,
    priceCategories,
    saleRate,
    selectedType,
  );

  const { open, close } = useAlertContext();
  const queryClient = useQueryClient();
  const formRef = useRef(null);
  const { user, isAuthenticated } = useAuth();
  const { orderData, handleOrder } = useOrder();

  const postCartItemMutation = useMutation({
    mutationFn: (data: any[]) => {
      return apiClient.addCartItem(data);
    },
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
      queryClient.invalidateQueries({ queryKey: ['cartItems', user?.id] });
    },
    onError: () => {
      if (isAuthenticated) {
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

  const handleAddToCart = (event: any) => {
    event.preventDefault();
    if (!isAuthenticated) {
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
    postCartItemMutation.mutate(cartItems.map((item) => ({
      // "voucherId": 0,
      // "quantity": 0
      voucherId: item.priceCategoryId,
      quantity: item.quantity
    })));
  };

  const handleQuantityChange = (categoryId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(item => item.priceCategoryId === categoryId);
      if (itemIndex === -1) return prevItems;

      const newItems = [...prevItems];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        quantity: newQuantity
      };
      return newItems;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleSelectCategory = (category: VoucherDetailResponse): void => {
    setPriceCategories((prev): VoucherDetailResponse[] => {
      if (!prev.some((item) => item.voucherId === category.voucherId)) {
        return [...prev, category];
      }
      return prev;
    });

    setCartItems(prev => {
      let _categoryExist = prev.some(item => item.priceCategoryId === category?.voucherId);
      if (_categoryExist) {
        return prev;
      }
      return [
        ...prev,
        {
          productId: product.id,
          priceCategoryId: category?.voucherId,
          name: product.name,
          quantity: 1,
          payMethod: selectedType,
          price: category?.price,
        }
      ]
    })
  };

  //구매 결제로직
  const handleCheckoutNow: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    handleOrder({
      paymentMethod: selectedType.toUpperCase(),
      // providerId: product.id,
      orderItems: cartItems.map(item => ({
        voucherId: item.priceCategoryId,
        quantity: item.quantity,
        price: item.price,
      }))
    });
  };

  return (
    <form
      ref={formRef}
      name="paymentForm"
      method="post"
      encType="application/x-www-form-urlencoded">
      <div className={styles.wrapper}>
        {orderData && <HiddenInputs orderData={orderData} />}

        <ProductSelectBox product={product} onSelectCategory={handleSelectCategory} />

        <Spacing margin="30px" />
        <QuantitySelectBox
          cartItems={cartItems}
          priceCategories={priceCategories}
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
        <Flex style={{ width: '100%' }} gap={10} justify="center" align={'center'}>
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

export default React.memo(ProductDetailSelectAndPayBox);
