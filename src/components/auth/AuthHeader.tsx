import * as s from './AuthStyle.css';

interface Props {
	title: string;
}

const AuthHeader = ({ title }: Props) => {
	return (
		<div>
			<h1 className={s.authHeader}>{title}</h1>
		</div>
	);
};

export default AuthHeader;
