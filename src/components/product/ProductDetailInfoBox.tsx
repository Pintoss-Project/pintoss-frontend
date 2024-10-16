import { useState } from 'react';
import * as s from './ProductDetailStyle.css';
import { Flex } from '@/shared/components/layout';

interface ProductDetailInfoBoxProps {
	description: string;
	caution?: string;
}

const ProductDetailInfoBox: React.FC<ProductDetailInfoBoxProps> = ({ description, caution }) => {
	const [selectedTab, setSelectedTab] = useState<'description' | 'caution'>('description');

	const handleTabClick = (tab: 'description' | 'caution') => {
		setSelectedTab(tab);
	};

	return (
		<div>
			<Flex>
				<Flex
					justify="center"
					align="center"
					className={`${s.leftTabMenuBox} ${
						selectedTab === 'description' ? s.selectedTab : s.unselectedTab
					}`}
					onClick={() => handleTabClick('description')}>
					상품정보
				</Flex>
				<Flex
					justify="center"
					align="center"
					className={`${s.rightTabMenuBox} ${
						selectedTab === 'caution' ? s.selectedTab : s.unselectedTab
					}`}
					onClick={() => handleTabClick('caution')}>
					유의사항
				</Flex>
			</Flex>
			<div className={s.productInfoListBox}>
				<p className={s.descriptionText} style={{ whiteSpace: 'pre-wrap' }}>
					{selectedTab === 'description' ? description : caution}
				</p>
			</div>
		</div>
	);
};

export default ProductDetailInfoBox;
