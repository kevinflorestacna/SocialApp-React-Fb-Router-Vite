import "./Modal.css"; 

const Modal = ({children,isOpen,openModal,closeModal}) => {
  const handleModalContainerClick=(e)=>e.stopPropagation();

  return (
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}>X</button>
        <br />
        {children}
        <button className="modal-close2" onClick={closeModal}>cerrar</button>
      </div>
    </article>
  )
}

export default Modal