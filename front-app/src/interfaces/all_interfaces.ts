export type CardInterface = {
    title: string;
}

export type EspecificacionesForm = {
    name_tag_id:string;
    hp_or_kw:boolean;
    potencia:number;
    velocidad_rpm:string;
    eje_conductor:string;
    eje_conducido:string;
    distanciador:boolean;
    reductor:boolean;
    acople:boolean;
}

export type DistanciadorForm = {
    dbse:string;
}

export type ReductorForm = {
    relacion_npm:string;
    eje_salida:string;
    eje_conducido:string;
}