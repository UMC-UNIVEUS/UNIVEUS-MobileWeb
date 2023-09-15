import './Modal.scss';

// title={'타이틀로 넣을 글'}
// content={'내용으로 넣을 글'}

function Modal({ isOpen, closeModal, title, children }) {
	return (
		<div className="modal-parent">
			<div className="modal-back" style={{ display: isOpen ? 'block' : 'none' }} onClick={closeModal}></div>
			<div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
				<div className="modal-body">
					<div className="mb-title" style={{ whiteSpace: 'pre-wrap' }}>
						{title}
					</div>
					<div className="mb-content">{children}</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
