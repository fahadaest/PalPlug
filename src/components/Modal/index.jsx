import CloseIcon from '@/assets/images/Closeicon.svg';
import Image from 'next/image';

const Modal = ({ isOpen, onClose, ModalImg, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 p-4 md:p-10 z-20">
            <div className="relative max-w-xl w-full max-h-full overflow-y-auto rounded-xl bg-white sm:rounded-2xl scrollbar-hide">
                {onClose && (
                    <div className="absolute top-4 right-4">
                        <div
                            className="p-0.5 rounded-full hover:bg-[#005382] cursor-pointer"
                            onClick={onClose}
                        >
                            <Image
                                src={CloseIcon}
                                alt="close"
                                className="w-6 h-6 cursor-pointer"
                                onClick={onClose}
                            />
                        </div>
                    </div>
                )}

                {ModalImg && (
                    <div className="w-full bg-[#D2EFFF] px-10 py-12">
                        <Image
                            src={ModalImg}
                            className="w-full h-auto object-cover object-center"
                            alt="modal-image"
                            priority

                        />
                    </div>
                )}

                <div className="md:min-w-[400px] h-full">{children}</div>
            </div>
        </div>
    );
};

export { Modal };
