import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';


const url = 'http://localhost:8088/api/prod/';
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}));
function ProdLi() {
  const styles = useStyles();
  const [data, setData] = useState([])
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [search, setSearch] = useState("")

  const [productoSeleccionado, setProductoSeleccionado] = useState({
    nombre: ''
  })

  const peticionGet = async () => {
    await axios.get(url)
      .then(response => {
        setData(response.data);
      })
  }
  const peticionPut = async () => {
    await axios.put(url + productoSeleccionado.idProd, productoSeleccionado)
      .then(response => {
        var dataNueva = data;
        dataNueva.map(prod => {
          if (productoSeleccionado.idProd === prod.idProd) {
            prod.nombre = productoSeleccionado.nombre;

          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
  }

  const peticionDelete = async () => {
    await axios.delete(url + productoSeleccionado.idProd)
      .then(response => {
        setData(data.filter(prod => prod.idProd !== productoSeleccionado.idProd));
        abrirCerrarModalEliminar();
      })
  }
  const handleChange = e => {
    const { name, value } = e.target;
    setProductoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(productoSeleccionado);
  }
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const seleccionarProducto = (prod, caso) => {
    setProductoSeleccionado(prod);
    (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }
  const searcher = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }
  let results = []
  if (!search) {
    results = data
  } else {
    results = data.filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLowerCase()))
  }






  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Producto</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.nombre} />

      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )


  const bodyEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el producto <b>{productoSeleccionado && productoSeleccionado.nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()} >Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>

  )


  useEffect(async () => {
    await peticionGet();
  }, [])

  return (

    <div className='caja1'>
      <h2 className='titulo2'>Lista de Productos</h2>

      <input value={search} onChange={searcher} type={'text'} placeholder={'buscar por nombre'} className='form-control'></input>
      <Select placeholder={'buscar por segmento Cliente'}
      options={data.segCli}
      />
      <table className='table table-striped table-hover mt-5 shadow-lg'>
        <thead>
          <tr className='bg-curso text-white' >
            <th>
              Nombre
            </th>
            <th>
              TipoProducto
            </th>
            <th>
              TipoVehiculo
            </th>
            <th>
              SegmentoClientes
            </th>
            <th>
              MontoHipotecario/Automotor
            </th>
            <th>
              MontoDeposito
            </th>
            <th>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map(prod => {
            return (
              <tr key={prod.idProd}>
                <td>{prod.nombre}</td>
                <td>{prod.tipoProdHip.nombre} {prod.tipoProdAuto.nombre} {prod.tipoProdDep.tipo}</td>
                <td>{prod.tipoProdAuto.tipoVehiculo}</td>
                <td>{prod.segCli.map(cli => {
                  return (<td>{cli.segmento},</td>)
                })}</td>
                <td>{prod.montoMaximo = prod.tipoProdHip.cantCuota * prod.tipoProdHip.valorCuota} ////// {prod.montoMaximo = prod.tipoProdAuto.cantCuota * prod.tipoProdAuto.valorCuota}</td>
                <td>{prod.montoMaximo = prod.tipoProdDep.limiteMaximo}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => seleccionarProducto(prod, 'Editar')}><FontAwesomeIcon icon={faEdit} /></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={() => seleccionarProducto(prod, 'Eliminar')}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>´

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>

  );
}



export default ProdLi;