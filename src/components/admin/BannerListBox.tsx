'use client';

import { Button } from '@/shared/components/button';
import * as s from './AdminStyle.css';
import * as cs from '@/shared/styles/common.css';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import Spacing from '@/shared/components/layout/Spacing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBannerList } from '@/app/api/site/getBannerList';
import SiteError from '@/utils/error/SiteError';
import { deleteBanner } from '@/app/api/site/deleteBanner';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';

interface Props {
	onEdit: (id: number) => void;
}

const BannerListBox = ({ onEdit }: Props) => {
	const { open, close } = useAlertContext();

	const queryClient = useQueryClient();
	const { data: bannerList } = useQuery({
		queryKey: ['bannerList'],
		queryFn: getBannerList,
	});

	const mutation = useMutation({
		mutationFn: (id: number) => deleteBanner(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bannerList'] });
			open({
				width: '300px',
				height: '200px',
				title: '삭제 완료',
				main: <AlertMainTextBox text="배너가 삭제되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
		onError: (error: SiteError) => {
			open({
				width: '300px',
				height: '200px',
				title: '삭제 실패',
				main: <AlertMainTextBox text={error.errorMessage} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const handleDelete = (id: number) => {
		open({
			width: '300px',
			height: '200px',
			title: '배너 삭제',
			main: <AlertMainTextBox text="배너를 삭제하시겠습니까?" />,
			leftButtonLabel: '취소',
			rightButtonLabel: '확인',
			leftButtonStyle: cs.whiteAndBlackButton,
			rightButtonStyle: cs.lightBlueButton,
			onRightButtonClick: () => {
				mutation.mutate(id);
				close();
			},
			onLeftButtonClick: close,
		});
	};

	return (
		<div
			style={{
				width: '100%',
				marginRight: '16px',
				border: `1px solid ${vars.color.lighterGray}`,
			}}>
			<Flex
				align="center"
				style={{ padding: '12px 20px', borderBottom: `1px solid ${vars.color.lighterGray}` }}>
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
			{bannerList?.data.map((banner, index) => (
				<Flex
					key={banner.id}
					align="center"
					style={{ padding: '12px 20px', borderBottom: `1px solid ${vars.color.lighterGray}` }}>
					<div className={s.darkGraySmallText} style={{ flex: '0.5' }}>
						{index + 1}
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '2' }}>
						{banner?.bannerTitle}
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '4' }}>
						<Flex
							justify="center"
							align="center"
							className={s.imageGrayBox}
							style={{ width: '300px', height: '100px' }}>
							'이미지(데스크톱) 3:1'
						</Flex>
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '3' }}>
						<Flex
							justify="center"
							align="center"
							className={s.imageGrayBox}
							style={{ width: '200px', height: '100px' }}>
							'이미지(모바일) 2:1'
						</Flex>
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '1' }}>
						<Flex direction="column" justify="center" align="center">
							<Button
								color={vars.color.darkGray}
								style={{
									width: '55px',
									padding: '2px 4px',
									backgroundColor: vars.color.white,
									border: `1px solid ${vars.color.lighterGray}`,
									borderRadius: '5px',
								}}
								onClick={() => {
									onEdit(banner.id);
								}}>
								수정
							</Button>
							<Spacing margin="7px" />
							<Button
								color={vars.color.darkGray}
								style={{
									width: '55px',
									padding: '2px 4px',
									backgroundColor: vars.color.white,
									border: `1px solid ${vars.color.lighterGray}`,
									borderRadius: '5px',
								}}
								onClick={() => handleDelete(banner.id)}>
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
