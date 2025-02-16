import NiceRedirectHandler from '@/components/auth/register/NiceRedirectHandler';

const RegisterNicePage = () => {
	return (
		<div style={{
			float: 'left',
			width: '100%',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#fff',
		}}>
			<NiceRedirectHandler />
		</div>
	);
};

export default RegisterNicePage;
