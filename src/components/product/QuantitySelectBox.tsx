'use client';

import * as s from './ProductDetailStyle.css';

import { IoClose } from 'react-icons/io5';
import { Divider, Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import { Button } from '@/shared/components/button';
import { useState } from 'react';

const QuantitySelectBox = () => {
	const [count, setCount] = useState(1);

	return (
		<div>
			<Spacing margin="9px" />
			<Divider color={vars.color.paleGray} />
			<Spacing margin="15px" />
			<Flex justify="space-between" align="center" style={{ padding: '0 10px' }}>
				<div>
					<span className={s.darkGrayText} style={{ fontSize: '16px' }}>
						컬쳐랜드 1만원권
					</span>
					<span style={{ color: vars.color.softRed, marginLeft: '10px' }}>1%↓</span>
				</div>
				<div>
					<IoClose style={{ width: '20px', height: '20px', color: '#BBBBBB' }} />
				</div>
			</Flex>
			<Spacing margin="16px" />
			<Flex justify="space-between" align="center" style={{ padding: '0 10px' }}>
				<Flex>
					<Button
						color={vars.color.lighterGray}
						className={s.quantityLeftButton}
						onClick={() => setCount(count - 1)}>
						-
					</Button>
					<Flex justify="center" align="center" className={s.quantityText}>
						{count}
					</Flex>
					<Button
						color={vars.color.darkGray}
						className={s.quantityRightButton}
						onClick={() => setCount(count + 1)}>
						+
					</Button>
				</Flex>
				<div style={{ fontSize: '18px', fontWeight: '600', color: vars.color.darkerGray }}>
					{Number('9900').toLocaleString()} 원
				</div>
			</Flex>
			<Spacing margin="15px" />
			<Divider color={vars.color.lightestGray} />
		</div>
	);
};

export default QuantitySelectBox;
