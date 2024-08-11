'use client';

import { Flex } from '@/shared/components/layout';
import * as s from './AdminStyle.css';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import { Input } from '@/shared/components/input';
import { Button } from '@/shared/components/button';
import Spacing from '@/shared/components/layout/Spacing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FeeData, updateFee, UpdateFeeParams } from '@/app/api/product/updateFee';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { ChangeEvent, useEffect, useState } from 'react';
import { getProduct } from '@/app/api/product/getProduct';

interface Props {
	productId?: number;
}

const ManageFeeBox = ({ productId }: Props) => {
	const { data: productDetails } = useQuery({
		queryKey: ['productDetails', productId],
		queryFn: () => getProduct(productId!),
		enabled: !!productId,
	});

	const [discount, setDiscount] = useState<FeeData>({
		cardDiscount: productDetails?.data.cardDiscount || 0,
		phoneDiscount: productDetails?.data.phoneDiscount || 0,
	});

	const { open, close } = useAlertContext();

	const queryClient = useQueryClient();

	const handleDiscountChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setDiscount((prevState) => ({
			...prevState,
			[name]: parseFloat(value),
		}));
	};

	const updateFeeMutation = useMutation({
		mutationFn: (params: UpdateFeeParams) => updateFee(params),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '상품수수료 업데이트 성공',
				main: <AlertMainTextBox text="상품수수료가 업데이트 되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			queryClient.invalidateQueries({
				queryKey: ['productDetails', productId],
			});
		},
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '상품수수료 업데이트 실패',
				main: <AlertMainTextBox text="상품수수료가 업데이트 실패 되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const handleUpdateFee = (data: FeeData) => {
		updateFeeMutation.mutate({ productId: productId as number, data });
	};

	useEffect(() => {
		if (productDetails) {
			setDiscount({
				cardDiscount: productDetails.data.cardDiscount || 0,
				phoneDiscount: productDetails.data.phoneDiscount || 0,
			});
		}
	}, [productDetails]);

	return (
		<div
			style={{
				width: '35%',
				height: '500px',
				padding: '18px 30px',
				marginRight: '16px',
				backgroundColor: vars.color.white,
				border: `1px solid ${vars.color.lighterGray}`,
			}}>
			<div className={s.blackMediumText}>수수료 관리</div>
			<Flex direction="column" justify="center" align="center" style={{ height: '85%' }}>
				<Flex align="center">
					<div className={s.lightGrayMediumText} style={{ width: '100px' }}>
						카드결제
					</div>
					<div style={{ marginLeft: '27px', borderBottom: `1px solid ${vars.color.lighterGray}` }}>
						<Input
							name="cardDiscount"
							value={discount.cardDiscount}
							type="number"
							step="0.1"
							placeholder="수수료를 입력하세요"
							onChange={handleDiscountChange}
							className={s.rateInputStyle}
						/>
						%
					</div>
				</Flex>
				<Spacing margin="39px" />
				<Flex align="center">
					<div className={s.lightGrayMediumText} style={{ width: '100px' }}>
						휴대폰결제
					</div>
					<div style={{ marginLeft: '27px', borderBottom: `1px solid ${vars.color.lighterGray}` }}>
						<Input
							name="phoneDiscount"
							type="number"
							value={discount.phoneDiscount}
							step="0.1"
							placeholder="수수료를 입력하세요"
							onChange={handleDiscountChange}
							className={s.rateInputStyle}
						/>
						%
					</div>
				</Flex>
			</Flex>
			<Flex justify="flex-end">
				<Button
					color={vars.color.black}
					className={s.lightGrayButton}
					onClick={() => handleUpdateFee(discount)}>
					수정
				</Button>
			</Flex>
		</div>
	);
};

export default ManageFeeBox;
