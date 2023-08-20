import './Button.scss';
export default function Button({ onClick, type, content }) {
	return (
		<div className={type ? `button-body ${type}` : `button-body`} onClick={onClick}>
			<span className="btn-content">{content}</span>
		</div>
	);
}
