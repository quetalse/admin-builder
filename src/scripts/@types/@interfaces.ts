import {cssNumber} from "jquery";

export interface Country {
    id: number;
    title: string;
    short_title: string;
    loyalty: number | string;
    flag: string
}

export interface Loyalty{
    id: number
    color: string
    title: string
}

export interface Bloc{
    id: number
    title: string
    short_title: string
    flag: string
    countries: Array<number>
}

export interface Wg{
    id: number
    title: string
    bloc_id: number
    flag: string
    countries: Array<number>
}

export interface agreementsTwoSides extends FormData {
    id: number
    title: string
    type: 'twoside'
    is_active: boolean
    bloc_id: number
    countries_id: Array<number>
}
export interface agreementsBloc extends FormData {
    id: number
    title: string
    type: 'bloc'
    is_active: boolean
    bloc_id: number
    countries_id: Array<number>
}

export interface agreementsWg extends FormData {
    id: number
    title: string
    type: 'wg'
    is_active: boolean
    wg_title: number
    bloc_id: number
    countries_id: Array<number>
}


export interface agreementsSignatories extends FormData {
    id: number
    title: string
    type: 'signatory'
    is_active: boolean
    countries_id: Array<number>
}
