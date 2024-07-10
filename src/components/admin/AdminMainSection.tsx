import Spacing from '@/shared/components/layout/Spacing';
import { ReactNode } from 'react';

interface Props {
	title: string;
	main: ReactNode;
}

const AdminMainSection = ({ title, main }: Props) => {
	return (
		<div style={{ padding: '40px 50px' }}>
			<h3 style={{ fontSize: '20px', fontWeight: '600' }}>{title}</h3>
			<Spacing margin="14px" />
			<main>{main}</main>
		</div>
	);
};

export default AdminMainSection;
