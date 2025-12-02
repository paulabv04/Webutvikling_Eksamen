
interface ConfirmModalprops {
    show: boolean; 
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({show, message, onConfirm, onCancel }: ConfirmModalprops) {
    if(!show) return null;

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
                <p className="text-tennisDark mb-4">{message}</p>

                <div className="flex justify-center gap-3">
                    <button 
                    className="px-4 py-2 text-white bg-tennisGreen rounded hover:bg-white hover:text-tennisGreen border border-tennisGreen"
                    onClick={onConfirm}
                    >Yes</button>

                    <button className="px-4 py-2 bg-tennisSand text-tennisDark rounded hover:bg-tennisGreen hover:text-white"
                    onClick={onCancel}
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}