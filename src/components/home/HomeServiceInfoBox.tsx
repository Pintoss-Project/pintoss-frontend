import { Flex } from '@/shared/components/layout';
import * as s from './HomeStyle.css';

const HomeServiceInfoBox = () => {
	return (
		<div className={s.homeServiceInfoBox}>
			<div>
				<Flex
					justify="center"
					align="center"
					className={s.homeServiceInfoBoxContent}
					style={{ fontSize: '30px' }}>
					서비스 안내
				</Flex>
			</div>
		</div>
	);
};

export default HomeServiceInfoBox;
