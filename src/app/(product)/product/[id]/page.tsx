import { getAllProductIds, getProductData } from '@/app/api/mockData';
import ProductDetailMain from '@/components/product/ProductDetailMain';
import ProductSection from '@/components/product/ProductSection';

interface Props {
	params: {
		id: string;
	};
}

export async function generateStaticParams() {
	const ids = await getAllProductIds();
	return ids.map((product: { id: string }) => ({
		id: product.id,
	}));
}

const ProductDetail = ({ params }: Props) => {
	return <ProductSection header={params.id} main={<ProductDetailMain />} />;
};

export default ProductDetail;
