import { Button } from '@/shared/components/button';
import * as s from './AdminStyle.css';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import Spacing from '@/shared/components/layout/Spacing';

const BANNER_LIST = [
	{
		banner_id: 1,
		title: '배너 제목',
		desktop_image: '이미지(데스크톱) 3:1',
		mobile_image: '이미지(모바일) 2:1',
	},
	{
		banner_id: 2,
		title: '배너 제목',
		desktop_image: '이미지(데스크톱) 3:1',
		mobile_image: '이미지(모바일) 2:1',
	},
	{
		banner_id: 3,
		title: '배너 제목',
		desktop_image: '이미지(데스크톱) 3:1',
		mobile_image: '이미지(모바일) 2:1',
	},
	{
		banner_id: 4,
		title: '배너 제목',
		desktop_image: '이미지(데스크톱) 3:1',
		mobile_image: '이미지(모바일) 2:1',
	},
];

const BannerListBox = () => {
	return (
		<div
			style={{
				width: '100%',
				marginRight: '16px',
				border: `1px solid ${vars.color['lighter-gray']}`,
			}}>
			<Flex
				align="center"
				style={{ padding: '12px 20px', borderBottom: `1px solid ${vars.color['lighter-gray']}` }}>
				<div className={s.darkGraySmallText} style={{ flex: '0.5' }}>
					번호
				</div>
				<div className={s.darkGraySmallText} style={{ flex: '2' }}>
					제목
				</div>
				<div className={s.darkGraySmallText} style={{ flex: '4' }}>
					데스크톱
				</div>
				<div className={s.darkGraySmallText} style={{ flex: '3' }}>
					모바일
				</div>
				<div className={s.darkGraySmallText} style={{ flex: '1' }}>
					관리
				</div>
			</Flex>
			{BANNER_LIST.map((banner, index) => (
				<Flex
					key={banner.banner_id}
					align="center"
					style={{ padding: '12px 20px', borderBottom: `1px solid ${vars.color['lighter-gray']}` }}>
					<div className={s.darkGraySmallText} style={{ flex: '0.5' }}>
						{index + 1}
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '2' }}>
						{banner.title}
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '4' }}>
						<Flex
							justify="center"
							align="center"
							className={s.imageGrayBox}
							style={{ width: '300px', height: '100px' }}>
							{banner.desktop_image}
						</Flex>
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '3' }}>
						<Flex
							justify="center"
							align="center"
							className={s.imageGrayBox}
							style={{ width: '200px', height: '100px' }}>
							{banner.mobile_image}
						</Flex>
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '1' }}>
						<Flex direction="column" justify="center" align="center">
							<Button
								color={vars.color['dark-gray']}
								style={{
									width: '55px',
									padding: '2px 4px',
									backgroundColor: vars.color.white,
									border: `1px solid ${vars.color['lighter-gray']}`,
									borderRadius: '5px',
								}}>
								수정
							</Button>
							<Spacing margin="7px" />
							<Button
								color={vars.color['dark-gray']}
								style={{
									width: '55px',
									padding: '2px 4px',
									backgroundColor: vars.color.white,
									border: `1px solid ${vars.color['lighter-gray']}`,
									borderRadius: '5px',
								}}>
								삭제
							</Button>
						</Flex>
					</div>
				</Flex>
			))}
		</div>
	);
};

export default BannerListBox;
