import ProductDetailMain from '@/components/product/ProductDetailMain';
import ProductSection from '@/components/product/ProductSection';

interface Props {
	params: {
		id: string;
	};
}

const ProductDetail = ({ params }: Props) => {
	return <ProductSection header={params.id} main={<ProductDetailMain />} />;
};

export default ProductDetail;
