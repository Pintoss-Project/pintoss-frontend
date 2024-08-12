'use client';

import Spacing from '@/shared/components/layout/Spacing';
import { useState } from 'react';
import * as s from './HomeStyle.css';
import { Flex } from '@/shared/components/layout';
import HomeProductsOnSale from './HomeProductsOnSale';

interface Props {
	title: string;
}

const FILTER_MENU = [
	{ id: 'ALL', name: '전체' },
	{ id: 'CBM', name: '문화/도서/영화' },
	{ id: 'GO', name: '게임/온라인 콘텐츠' },
	{ id: 'LS', name: '생활/쇼핑' },
];

const HomeOnSaleSection = ({ title }: Props) => {
	const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

	const handleFilterClick = (id: string) => {
		setSelectedFilter(id);
	};

	return (
		<section>
			<h3 className={s.categoryTitle}>{title}</h3>
			<Spacing margin="25px" />
			<Flex>
				{FILTER_MENU.map((filter) => (
					<span
						key={filter.id}
						id={filter.id}
						className={`${s.filterMenu} ${selectedFilter === filter.id ? 'selected' : ''}`}
						onClick={() => handleFilterClick(filter.id)}>
						{filter.name}
					</span>
				))}
			</Flex>
			<Spacing margin="25px" />
			<HomeProductsOnSale category={selectedFilter} />
		</section>
	);
};

export default HomeOnSaleSection;
