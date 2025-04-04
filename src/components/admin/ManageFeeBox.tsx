'use client';

import { fetchProductInfo } from '@/controllers/product/fetchProductInfo';
import {
	FeeData,
	fetchUpdateProductFee,
	UpdateFeeParams,
} from '@/controllers/product/fetchUpdateProductFee';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import * as s from './AdminStyle.css';

interface Props {
	productId?: number;
}

const ManageFeeBox = ({ productId }: Props) => {
	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();

	const { data: productDetails } = useQuery({
		queryKey: ['productDetails', productId],
		queryFn: () => {
			if (productId) {
				return fetchProductInfo(productId);
			}
			return Promise.resolve(undefined);
		},
		enabled: !!productId,
	});

	const [discount, setDiscount] = useState<FeeData>({
		cardDiscount: 0,
		phoneDiscount: 0,
	});

	useEffect(() => {
		if (productDetails) {
			setDiscount({
				cardDiscount: productDetails.data.cardDiscount || 0,
				phoneDiscount: productDetails.data.phoneDiscount || 0,
			});
		}
	}, [productDetails]);

	const handleDiscountChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setDiscount((prevState) => ({
			...prevState,
			[name]: parseFloat(value),
		}));
	};

	const updateFeeMutation = useMutation({
		mutationFn: (params: UpdateFeeParams) => fetchUpdateProductFee(params),
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
		if (productId) {
			updateFeeMutation.mutate({ productId, data });
		}
	};

	return (
		<div
			style={{
				width: '35%',
				height: '600px',
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
