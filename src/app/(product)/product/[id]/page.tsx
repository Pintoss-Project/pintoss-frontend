import { getAllProductIds, getProductData } from '@/app/api/mockData';
import ProductDetailMain from '@/components/product/ProductDetailMain';
import ProductSection from '@/components/product/ProductSection';

interface Props {
	params: {
		id: number;
	};
}

const ProductDetail = ({ params }: Props) => {
	return <ProductSection id={params.id} />;
};

export default ProductDetail;
