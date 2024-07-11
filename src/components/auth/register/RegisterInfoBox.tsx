import Spacing from '@/shared/components/layout/Spacing';
import * as s from './RegisterStyle.css';

import { ReactNode } from 'react';

interface Props {
	subTitle: string;
	info: ReactNode;
}

const RegisterInfoBox = ({ subTitle, info }: Props) => {
	return (
		<div>
			<h3 className={s.subTitle}>{subTitle}</h3>
			<Spacing margin="20px" />
			<div>{info}</div>
		</div>
	);
};

export default RegisterInfoBox;
