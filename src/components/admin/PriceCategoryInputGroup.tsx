'use client';

import { fetchPriceCategoryList } from '@/app/api/product/fetchPriceCategoryList';
import { fetchRegisterPriceCategory } from '@/app/api/product/fetchRegisterPriceCategory';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import { PriceCategoryInfoFormData } from '@/utils/validation/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import * as s from './AdminStyle.css';

interface Props {
	productId?: number;
	onAddCategory: (priceCategory: PriceCategoryInfoFormData) => void;
}

const PriceCategoryInputGroup = ({ productId, onAddCategory }: Props) => {
	const [priceName, setPriceName] = useState<string>('');
	const [price, setPrice] = useState<number | ''>('');
	const [existingCategories, setExistingCategories] = useState<PriceCategoryInfoFormData[]>([]);

	const queryClient = useQueryClient();
	const { open, close } = useAlertContext();

	const { data: categories, isSuccess } = useQuery({
		queryKey: ['priceCategoryList', productId],
		queryFn: () => fetchPriceCategoryList(productId as number),
		enabled: !!productId, // Only run the query if productId is defined
	});

	const postPriceCategoryMutation = useMutation({
		mutationFn: (data: PriceCategoryInfoFormData[]) =>
			fetchRegisterPriceCategory(productId as number, data),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '가격 카테고리 생성 성공',
				main: <AlertMainTextBox text="가격 카테고리가 생성되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			queryClient.invalidateQueries({
				queryKey: ['priceCategoryList', productId],
			});
			queryClient.invalidateQueries({
				queryKey: ['productList'],
			});
		},
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '가격 카테고리 생성 실패',
				main: <AlertMainTextBox text="가격 카테고리 생성이 실패되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	useEffect(() => {
		if (isSuccess) setExistingCategories(categories.data);
	}, [isSuccess, categories]);

	const handleAddClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();

		if (priceName && price) {
			const isDuplicateName = existingCategories.some((category) => category.name === priceName);
			const isDuplicatePrice = existingCategories.some(
				(category) => category.price === Number(price),
			);

			if (isDuplicateName) {
				open({
					width: '300px',
					height: '200px',
					title: '가격 카테고리 중복',
					main: <AlertMainTextBox text="가격 카테고리 이름이 중복되었습니다." />,
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: close,
				});
				return;
			}

			if (isDuplicatePrice) {
				open({
					width: '300px',
					height: '200px',
					title: '가격 카테고리 중복',
					main: <AlertMainTextBox text="가격 카테고리 가격이 중복되었습니다." />,
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: close,
				});
				return;
			}

			const newCategory: PriceCategoryInfoFormData = { name: priceName, price: Number(price) };

			if (productId) {
				postPriceCategoryMutation.mutate([newCategory]);
				queryClient.invalidateQueries({ queryKey: ['priceCategoryList', productId] });
				queryClient.invalidateQueries({ queryKey: ['productList'] });
			} else {
				onAddCategory(newCategory);
			}

			setPriceName('');
			setPrice('');
		}
	};

	return (
		<Flex align="center">
			<div className={s.darkGraySmallText} style={{ flex: '1', minWidth: '50px' }}>
				판매금액
			</div>
			<Flex
				style={{
					flex: '3',
					marginLeft: '1.5%',
					alignItems: 'center',
					overflow: 'hidden',
				}}>
				<div style={{ marginRight: '8px', borderBottom: `1px solid ${vars.color.lighterGray}` }}>
					<Input
						value={priceName}
						onChange={(e) => setPriceName(e.target.value)}
						placeholder="금액명"
						className={s.rateInputStyle}
						style={{ textAlign: 'left', width: '100%' }}
					/>
				</div>
				<div style={{ marginRight: '8px', borderBottom: `1px solid ${vars.color.lighterGray}` }}>
					<Input
						type="number"
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
						step="1000"
						placeholder="상품금액(원)"
						className={s.rateInputStyle}
						style={{ textAlign: 'left', width: '100%' }}
					/>
				</div>
				<Button
					color={vars.color.black}
					style={{
						minWidth: '40px',
						padding: '4px',
						backgroundColor: vars.color.white,
						border: `1px solid ${vars.color.lightestGray}`,
					}}
					onClick={handleAddClick}>
					추가
				</Button>
			</Flex>
		</Flex>
	);
};

export default PriceCategoryInputGroup;
