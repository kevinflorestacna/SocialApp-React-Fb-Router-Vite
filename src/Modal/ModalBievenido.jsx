import Modal from "./Modal";
import { useModal } from "./../hook/useModal";

const ModalBienvenido = () => {
  const [isOpenModal, openModal, closeModal] = useModal(true);

  return (
    <div>
      <Modal isOpen={isOpenModal} closeModal={closeModal}>
        <h2 className="bienvenido">Bienvenido </h2>
        <p className="bienv-parrafo">
          Cuentanos como estas el dia de Hoy, con una Publicacion!
        </p>
        <img
          src="https://image.shutterstock.com/image-vector/welcome-hand-drawn-speech-bubble-260nw-1523423627.jpg"
          alt="Anime"
        />
      </Modal>
    </div>
  );
};
export default ModalBienvenido;
