import { ReactNode } from "react";
import { Film } from "../film/film.interface";

export default interface Director {
    id: number;
    name: string;
    slug: string;
    film: Film[];
    created_at?: ReactNode;
    updated_at?: Date;
}
