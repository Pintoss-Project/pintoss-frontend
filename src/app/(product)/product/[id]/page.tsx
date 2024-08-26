import { getAllProductIds } from '@/app/api/mockData';
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
	return <ProductSection id={+params.id} />;
};

export default ProductDetail;
