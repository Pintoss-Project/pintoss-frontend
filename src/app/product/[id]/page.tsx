import { fetchProductList } from '@/controllers/product/fetchProductList';
import ProductSection from '@/components/product/ProductSection';
import { Suspense } from 'react';

interface Props {
	params: {
		id: string;
	};
}

// export async function generateStaticParams() {
// 	try {
// 		const productList = await fetchProductList();
// 		return (
// 			productList?.data.map((product: { id: number }) => ({
// 				id: product.id.toString(),
// 			})) || []
// 		);
// 	} catch (error) {
// 		console.warn('Error fetching product list:', error);
// 		return [];
// 	}
// }

const ProductDetail = ({ params }: Props) => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ProductSection id={Number(params.id)} />
		</Suspense>
	);
};

export default ProductDetail;
