'use client';

import * as s from './HomeStyle.css';

import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';

interface Props {
	title: string;
	products: ReactNode;
	filter?: boolean;
}

const FILTER_MENU = [
	{ id: 'all', name: '전체' },
	{ id: 'culture-books-movies', name: '문화/도서/영화' },
	{ id: 'game-online', name: '게임/온라인 콘텐츠' },
	{ id: 'life-shopping', name: '생활/쇼핑' },
];

const CategorySection = ({ title, products, filter }: Props) => {
	const [selectedFilter, setSelectedFilter] = useState<string>('all');

	const handleFilterClick = (id: string) => {
		setSelectedFilter(id);
	};

	return (
		<section>
			<h3 className={s.categoryTitle}>{title}</h3>
			<Spacing margin="25px" />
			<Flex>
				{filter &&
					FILTER_MENU.map((filter) => (
						<span
							key={filter.id}
							id={filter.id}
							className={`${s.filterMenu} ${selectedFilter === filter.id ? 'selected' : ''}`}
							onClick={() => handleFilterClick(filter.id)}>
							{filter.name}
						</span>
					))}
			</Flex>
			{filter && <Spacing margin="30px" />}
			<div>{products}</div>
		</section>
	);
};

export default CategorySection;
