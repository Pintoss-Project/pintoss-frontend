'use client';

import { Button } from '@/shared/components/button';
import * as s from './AdminStyle.css';
import * as cs from '@/shared/styles/common.css';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBannerList } from '@/app/api/site/getBannerList';
import SiteError from '@/utils/error/SiteError';
import { deleteBanner } from '@/app/api/site/deleteBanner';
import { deleteImageFromCloudinary } from '@/app/api/image/deleteImageFromCloudinary';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';

interface Props {
	onEdit: (id: number, bannerData: any) => void;
	onDelete: () => void;
}

const BannerListBox = ({ onEdit, onDelete }: Props) => {
	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();
	const { data: bannerList } = useQuery({
		queryKey: ['bannerList'],
		queryFn: getBannerList,
	});

	const mutation = useMutation({
		mutationFn: async (id: number) => {
			const banner = bannerList?.data.find((banner) => banner.id === id);
			if (banner?.desktopImageUrl) {
				const publicId = banner.desktopImageUrl.split('/').pop()?.split('.')[0];
				if (publicId) {
					await deleteImageFromCloudinary(publicId);
				}
			}
			if (banner?.mobileImageUrl) {
				const publicId = banner.mobileImageUrl.split('/').pop()?.split('.')[0];
				if (publicId) {
					await deleteImageFromCloudinary(publicId);
				}
			}
			return deleteBanner(id);
		},
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
			onDelete();
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
				onDelete();
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
							{banner.desktopImageUrl ? (
								<img
									src={banner.desktopImageUrl}
									alt="데스크톱 배너 이미지"
									style={{ width: '100%', height: '100%', objectFit: 'cover' }}
								/>
							) : (
								'이미지(데스크톱) 3:1'
							)}
						</Flex>
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '3' }}>
						<Flex
							justify="center"
							align="center"
							className={s.imageGrayBox}
							style={{ width: '200px', height: '100px' }}>
							{banner.mobileImageUrl ? (
								<img
									src={banner.mobileImageUrl}
									alt="모바일 배너 이미지"
									style={{ width: '100%', height: '100%', objectFit: 'cover' }}
								/>
							) : (
								'이미지(모바일) 2:1'
							)}
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
									marginBottom: '8px',
								}}
								onClick={() => {
									onEdit(banner.id, banner);
								}}>
								수정
							</Button>
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
