import * as s from './AlertStyle.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { ReactNode } from 'react';
import { Flex } from '../layout';
import { Button } from '../button';
import Spacing from '../layout/Spacing';
import BackDrop from '../back-drop/BackDrop';
import { vars } from '@/shared/styles/theme.css';

interface AlertProps {
	width: string;
	height: string;
	open?: boolean;
	title?: React.ReactNode;
	leftButtonLabel?: string | undefined;
	rightButtonLabel?: string | undefined;
	leftButtonStyle?: string | undefined;
	rightButtonStyle?: string | undefined;
	onLeftButtonClick?: () => void;
	onRightButtonClick?: () => void;
	onBackDropClick?: () => void;
	main?: ReactNode;
}

const Alert = ({
	width,
	height,
	open,
	title,
	leftButtonLabel = '',
	rightButtonLabel = '확인',
	leftButtonStyle,
	rightButtonStyle,
	onLeftButtonClick,
	onRightButtonClick,
	onBackDropClick,
	main,
}: AlertProps) => {
	if (open === false) {
		return null;
	}

	const alertBoxStyle = (width: string, height: string) => {
		return assignInlineVars({
			[s.alertWidth]: width,
			[s.alertHeight]: height,
		});
	};

	return (
		<BackDrop onClose={onBackDropClick}>
			<section className={s.alertWrap} style={alertBoxStyle(width, height)}>
				<Flex direction="column" justify="center" align="center" className={s.alertFlexWrap}>
					{title ? <h3 className={s.alertTitle}>{title}</h3> : null}
					<Spacing margin="8px" />
					<Flex align="center" className={s.alertSubFlexWrap}>
						{main}
					</Flex>
					<Flex justify="center" align="center" className={s.alertSubSecondFlexWrap}>
						{leftButtonLabel !== '' && (
							<>
								<Button
									color={vars.color.black}
									className={leftButtonStyle}
									onClick={onLeftButtonClick}>
									{leftButtonLabel}
								</Button>
								<Spacing width="12px" />
							</>
						)}
						<Button
							color={vars.color.white}
							className={rightButtonStyle}
							onClick={onRightButtonClick}>
							{rightButtonLabel}
						</Button>
					</Flex>
				</Flex>
				<Spacing margin="12px" />
			</section>
		</BackDrop>
	);
};

export default Alert;
