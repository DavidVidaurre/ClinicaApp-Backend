const ExamenFisico = require('../models/ExamenFisico');
const HistClinica = require('../models/HistClinica');

const CrearExamenFisico = async (req, res) => {
        const { peso, talla, temperatura, apreciacionG, tcsc, orofaringe, aparatoResp, aparatoCV, abdomen, aparatoGU, neurologico, id_HistClinica } = req.body;
        try {
            const idHistClinica = await HistClinica.findOne({id_HistClinica});
            if (!idHistClinica) {
                res.status(404).json({
                    ok: false,
                    msg: 'Historis Clinica no existe con ese id',
                });
            }

            examenFisico = new ExamenFisico(req.body);
            
    
            await examenFisico.save();
            
            res.status(201).json({
                ok: true,
                examenFisico: examenFisico,
            });
        } catch (error) {
            console.log('Error: ' + error.toString());
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador',
            });
        }
 };

 const ActualizarExamenFisico = async (req, res = response) => {
	const examenFisicoId = req.params.id;
	const {id_HistClinica} = req.body;
	const idHistClinica = id_HistClinica;
	try {
		const examenFisico = await ExamenFisico.findById(examenFisicoId);
		if (!examenFisico) {
			res.status(404).json({
				ok: false,
				msg: 'Examen Fisico no existe con ese id',
			});
		}
        if (examenFisico.id_HistClinica.toString() !== idHistClinica) {
			return res.status(401).json({
				ok: false,
				msg: 'No tiene privilegio de editar esta Historia Medica',
			});
		}

		const nuevoExamenFisico= {
			...req.body,
            id_HistClinica: idHistClinica
		};

		const examenFisico_Actualizado = await ExamenFisico.findByIdAndUpdate(
			examenFisicoId,
			nuevoExamenFisico,
			{
				new: true,
			}
		);
		res.json({
			ok: true,
			examenFisico: examenFisico_Actualizado,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const MostrarExamenFisico = async (req, res) => {
    const examenFisico = await ExamenFisico.find();
    return res.json(examenFisico);
}
    
module.exports = {
	CrearExamenFisico,
	MostrarExamenFisico,
    ActualizarExamenFisico
}