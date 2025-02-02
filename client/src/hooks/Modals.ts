import toast from "react-hot-toast";

export const success = (message: string): ReturnType<typeof toast.success> => 
    toast.success(message);

export const load = (message: string): ReturnType<typeof toast.loading> => 
    toast.loading(message);

export const errorModal = (message: string): ReturnType<typeof toast.error> => 
    toast.error(message);

export const closeModal = (): void => toast.dismiss();
