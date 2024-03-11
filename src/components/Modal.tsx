"use client";

import { Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
    isOpen: boolean;
    setIsOpen: (value: SetStateAction<boolean>) => void;
    classContainer?: string;
    children: React.ReactNode;
    closeDisabled?: boolean;
}

const Modal = ({
    isOpen,
    setIsOpen,
    closeDisabled,
    classContainer = "",
    children,
}: Props) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="section"
                className="relative z-50"
                onClose={() => {
                    closeDisabled ? undefined : setIsOpen(false);
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-custom-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={
                                    "my-8 px-5 pb-5 pt-2 transform rounded-2xl bg-off-white text-left align-middle normal-shadow transition-all w-[95%] " +
                                    classContainer
                                }
                            >
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;