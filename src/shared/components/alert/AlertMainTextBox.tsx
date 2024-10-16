import { vars } from '@/shared/styles/theme.css';
import { Divider, Flex } from '../layout';
import * as s from './AlertStyle.css';
import Spacing from '../layout/Spacing';

interface Props {
	text: string;
}

const AlertMainTextBox = ({ text }: Props) => {
	const sentences = text
		?.split('.')
		.map((sentence) => sentence.trim() + '.')
		.filter((sentence) => sentence !== '.');

	return (
		<Flex direction="column" align="center">
			<Divider size={1} color={vars.color.lightestGray} />
			<div className={s.AlertMainTextWrap}>
				{sentences?.map((sentence, index) => (
					<p key={index} className={s.AlertMainText}>
						{sentence + (index === sentences.length - 1 ? '' : ' ')}
					</p>
				))}
			</div>
		</Flex>
	);
};

export default AlertMainTextBox;
