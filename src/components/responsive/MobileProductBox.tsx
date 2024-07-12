import { Flex, GridItem } from '@/shared/components/layout';
import Image from 'next/image';
import * as s from './ResponsiveStyle.css';

interface Props {
	name: string;
	image: string;
}

const MobileProductBox = ({ name, image }: Props) => {
	return (
		<GridItem>
			<Flex direction="column" justify="center" align="center" className={s.mobileProductBox}>
				<div style={{ marginBottom: '17px' }}>
					<Image src={image} alt="로고 이미지" width={94} height={94} />
				</div>
				<div>{name}</div>
			</Flex>
		</GridItem>
	);
};

export default MobileProductBox;
