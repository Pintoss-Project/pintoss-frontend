import { vars } from '@/shared/styles/theme.css';
import * as s from './HomeStyle.css';
import { Flex } from '@/shared/components/layout';

const HomeRecruitingBanner = () => {
	return (
		<div className={s.homeRecruitingBanner}>
			<div>
				<Flex
					justify="center"
					align="center"
					className={s.homeRecruitingBannerContent}
					style={{ fontSize: '30px' }}>
					<span
						style={{
							marginRight: '30px',
							color: vars.color.black,
							fontSize: '30px',
							fontWeight: '500',
						}}>
						상품권 판매 파트너를 모집합니다.
					</span>
					<span style={{ color: vars.color['dark-blue'], fontSize: '30px', fontWeight: 'bold' }}>
						1544-4202
					</span>
				</Flex>
			</div>
		</div>
	);
};

export default HomeRecruitingBanner;
