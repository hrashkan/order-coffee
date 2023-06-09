import "./Modal.css"

export default function Modal({ activeModal, isOrderComplete, userFullName, userCity, setActiveModal }) {
    return (
        <div className={`modal ${activeModal && 'active'}`}>
            <div className="modal-container">
                <div className="modal-header">

                    {
                        isOrderComplete ?
                            (
                                <svg className='modal-header__icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )
                            : (
                                <svg className='modal-header__icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                            )
                    }


                    <p className="modal-header__title">
                        {
                            isOrderComplete ? 'Success' : 'Error'
                        }
                    </p>
                </div>
                <div className="modal-body">
                    <p className="modal-body__success">


                        {
                            isOrderComplete ?
                                (
                                    <>
                                        <span className="modal-body__success-detail">
                                            <span> {userFullName}</span> from <span>{userCity}</span>
                                        </span>
                                        <span className="modal-body__success-message">
                                            Your order has been sent
                                        </span>
                                    </>
                                )
                                : (
                                    <span className="modal-body__success-detail">
                                        please pick a time for order
                                    </span>
                                )
                        }
                    </p>
                </div>
                <div className="modal-footer">
                    <div
                        className="modal-footer__button"
                        onClick={() => setActiveModal(false)}
                    >
                        {
                            isOrderComplete ? 'OK' : 'Try Again'
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
