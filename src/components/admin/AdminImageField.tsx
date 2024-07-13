import { Flex } from '@/shared/components/layout';
import { ReactNode } from 'react';
import * as s from './AdminStyle.css';

interface Props {
	label: string;
	image: ReactNode;
}

const AdminImageField = ({ label, image }: Props) => {
	return (
		<Flex align="center">
			<div className={s.darkGraySmallText} style={{ flex: 1 }}>
				{label}
			</div>
			<div
				style={{
					flex: 3,
					marginLeft: '20px',
				}}>
				{image}
			</div>
		</Flex>
	);
};

export default AdminImageField;
