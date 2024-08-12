'use client';

import * as s from './HomeStyle.css';

import Spacing from '@/shared/components/layout/Spacing';
import HomePopularProducts from './HomePopularProducts';

interface Props {
	title: string;
}

const HomePopularSection = ({ title }: Props) => {
	return (
		<section>
			<h3 className={s.categoryTitle}>{title}</h3>
			<Spacing margin="25px" />
			<HomePopularProducts />
		</section>
	);
};

export default HomePopularSection;
