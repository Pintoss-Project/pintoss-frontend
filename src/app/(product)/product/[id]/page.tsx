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
