'use client';

import * as cs from '@/shared/styles/common.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

interface Props {
	width?: string;
	margin?: string;
}

const Spacing = ({ width = '100%', margin }: Props) => {
	return (
		<div
			style={assignInlineVars({ [cs.spacingWidthVar]: width, [cs.spacingMarginVar]: margin })}
			className={cs.spacingStyle}></div>
	);
};

export default Spacing;
