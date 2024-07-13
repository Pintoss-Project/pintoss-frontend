import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { ReactNode } from 'react';
import * as s from './PageStyle.css';

interface Props {
	title: string;
	info: ReactNode;
	className?: string;
}

const InfoBox = ({ title, info, className }: Props) => {
	return (
		<Flex direction="column" style={{ width: '100%' }}>
			<h3 className={s.infoTitle}>{title}</h3>
			<Spacing margin="10px" />
			<div className={className}>{info}</div>
		</Flex>
	);
};

export default InfoBox;
