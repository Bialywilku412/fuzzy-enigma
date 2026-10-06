function PomodoroModal({ show, onClose, mode }) {

    return(
        <div
            className={`modal fade ${show ? "show" : ""}`}
            style={{ display: show ? "block" : "none" }}
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden={!show}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Alert</h5>
                </div>
                <div className="modal-body">
                    {mode == "work" ? "Completed rest time for work" : "Completed work time for rest"}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={onClose}>Close</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default PomodoroModal;
