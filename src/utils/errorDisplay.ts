import { toast } from "react-toastify";

export const DisplayErrors = (data:any) => {
    if (data?.status === "error" && data.message) {
        Object.entries(data.message).forEach(([field, messages]: [field: any, messages: any]) => {
            messages.forEach((msg: any) => {
                console.log(msg)
                console.log("hehehe")
                toast.error(`${field}: ${msg}`);
            });
        });
    }
}