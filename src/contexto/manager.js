import { writable } from 'svelte/store';
import moment from 'moment';
export const cuenta = writable({});
export const documentos = writable([]);

function adminController(){
    return{
        crearPaciente: async (paciente)=>{
            let timestamp = moment().format();
            let nuevo = {
                _id: `paciente:${paciente.documento}`,
                nombre:paciente.nombre,
                documento:paciente.documento,
                cardiaco:paciente.cardiaco,
                diabetes:paciente.diabetes,
                nacionalidad:paciente.nacionalidad,
                telefono:paciente.telefono,
                email:paciente.email,
                dia:paciente.dia,
                mes:paciente.mes,
                ano:paciente.ano,
                sexo:paciente.sexo,
                observacion:paciente.observacion,
                creado:timestamp
            };
            window.dispatchEvent(new CustomEvent('put',{'detail':nuevo}));
        },
        modificarPaciente: async (old,paciente)=>{
            let timestamp = moment().format();
            let nuevo = {
                _id: `paciente:${paciente.documento}`,
                nombre:paciente.nombre,
                documento:paciente.documento,
                cardiaco:paciente.cardiaco,
                diabetes:paciente.diabetes,
                nacionalidad:paciente.nacionalidad,
                telefono:paciente.telefono,
                email:paciente.email,
                dia:paciente.dia,
                mes:paciente.mes,
                ano:paciente.ano,
                sexo:paciente.sexo,
                observacion:paciente.observacion,
                creado:timestamp
            };
            window.dispatchEvent(new CustomEvent('put',{'detail':nuevo}));
        },
        crearHistorial: async(historial)=>{
            let timestamp = moment().format();
            let nuevo = {
                _id: `historial:${historial.dia}-${historial.mes}-${historial.ano}-${historial.hora}-${historial.min}Hs`,
                titulo: `${historial.tipo}-${historial.dia}-${historial.mes}-${historial.ano}`,//'(tratamiento/observacion/)-11-12-20(/anulado)',
                observaciones: historial.observaciones,
                doctor: historial.doctor,
                paciente: historial.paciente,
                dia:historial.dia,
                mes:historial.mes,
                ano:historial.ano,
                hora:historial.hora,
                min:historial.min,
                dientes: historial.dientes,
                creado: timestamp
            };
            window.dispatchEvent(new CustomEvent('put',{'detail':nuevo}));
        },
        anularHistorial: async(id,rev,historial)=>{
            let nuevo = {
                _id: id,
                _rev: rev,
                doc: historial
            };
            window.dispatchEvent(new CustomEvent('put',{'detail':nuevo}));
        }
    }
}
export let admin = adminController();