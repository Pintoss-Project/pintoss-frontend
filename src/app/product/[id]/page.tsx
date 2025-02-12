import { fetchProductList } from '@/controllers/product/fetchProductList';
import ProductSection from '@/components/product/ProductSection';

interface Props {
	params: {
		id: string;
	};
}

export async function generateStaticParams() {
	try {
		const productList = await fetchProductList();
		return (
			productList?.data.map((product: { id: number }) => ({
				id: product.id.toString(),
			})) || []
		);
	} catch (error) {
		console.error('Error fetching product list:', error);
		return [];
	}
}

const ProductDetail = ({ params }: Props) => {
	return <ProductSection id={+params.id} />;
};

export default ProductDetail;
