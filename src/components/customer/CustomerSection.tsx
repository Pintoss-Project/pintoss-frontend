import Spacing from '@/shared/components/layout/Spacing';
import * as s from './CustomerStyle.css';
import { ReactNode } from 'react';

interface Props {
	main: ReactNode;
}

const CustomerSection = ({ main }: Props) => {
	return (
		<section className={s.customerSection}>
			<h1 className={s.customerHeader}>고객센터</h1>
			<Spacing margin="40px" />
			<main>{main}</main>
		</section>
	);
};

export default CustomerSection;
