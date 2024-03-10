import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(...inputs));

export const getIcon = (rating) => {
    if(rating <= 25){
        return '😅';
    }
    else if(rating <= 50){
        return '😊';
    }
    else if(rating <= 75){
        return '😄';
    }
    else if(rating == 100){
        return '😁';
    }
    else{
        return '😃';
    }
};

