'use client';

import { postPriceCategory } from '@/app/api/product/postPriceCategory';
import { postProduct } from '@/app/api/product/postProduct';
import * as cs from '@/shared/styles/common.css';
import { ProductInfoFormData } from '@/utils/validation/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAlertContext from './useAlertContext';

interface UseProductWithPriceCategoryMutationProps {
	onSuccess?: () => void;
}

export const useProductWithPriceCategoryMutation = ({
	onSuccess,
}: UseProductWithPriceCategoryMutationProps = {}) => {
	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();

	const postProductMutation = useMutation({
		mutationFn: (data: ProductInfoFormData) => postProduct(data),
		onSuccess: async (productData, variables) => {
			const productId = productData.data;

			if (productId && variables.priceCategories && variables.priceCategories.length > 0) {
				try {
					postPriceCategory(productId, variables.priceCategories),
						open({
							width: '300px',
							height: '200px',
							title: '상품 및 가격 카테고리 생성 완료',
							main: '상품과 가격 카테고리가 성공적으로 생성되었습니다.',
							rightButtonStyle: cs.lightBlueButton,
							onRightButtonClick: () => {
								close();
								if (onSuccess) onSuccess();
							},
						});

					queryClient.invalidateQueries({ queryKey: ['productList'] });
				} catch (error) {
					open({
						width: '300px',
						height: '200px',
						title: '가격 카테고리 생성 실패',
						main: '상품은 생성되었으나 가격 카테고리 생성에 실패했습니다.',
						rightButtonStyle: cs.lightBlueButton,
						onRightButtonClick: close,
					});
				}
			} else {
				open({
					width: '300px',
					height: '200px',
					title: '상품 생성 완료',
					main: '상품이 성공적으로 생성되었습니다.',
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: () => {
						close();
						if (onSuccess) onSuccess();
					},
				});

				queryClient.invalidateQueries({ queryKey: ['productList'] });
			}
		},
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '상품 생성 실패',
				main: '상품 생성에 실패했습니다.',
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	return postProductMutation;
};
