import React, { Component } from 'react';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = 'http://localhost:8088/api/prod/';



class ProddLi extends Component {
  state = {
    data: [],
    filtroDatos: [],
    modalInsertar: false,

    form: {
      idProd: '',
      nombre: ''

    }

  }
  searcher = (e) => {
    let valores = this.state.form.filter(this.state.form.nombre);
    this.setState(
      valores
    )


    console.log(e.target.value)
  }
  peticionGet = () => {
    axios.get(url).then(response => {
      this.setState({ data: response.data });
    }).catch(error => {

      console.log(error.message);

    })
  }


  /* peticionPost = async () => {
     delete this.state.form.id;
     await axios.post(url, this.state.form).then(response => {
       this.modalInsertar();
       this.peticionGet();
     }).catch(error => {
       console.log(error.message);
     })
   }*/


  peticionPut = () => {
    axios.put(url + this.state.form.idProd, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    })
  }

  peticionDelete = () => {
    axios.delete(url + this.state.form.idProd).then(response => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    })
  }
  //seteo de estado del modal
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  //seleccionar producto
  seleccionarprod = (prod) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        idProd: prod.idProd,
        nombre: prod.nombre
      }
    })
  }

  //capturar valores del teclado
  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }




  componentDidMount() {
    this.peticionGet();
  }


  render() {

    const { form } = this.state;

    return (
      <div className="caja1">
        <h2 className='titulo2'>Lista de Productos</h2>
        <div className='buscador'>
          <select name="tipo productos" className='form-control' onChange={this.searcher.bind(this)}>
            {this.state.data.map(elemento=>(
              <option key={elemento.idProd} value={elemento.idProd}>{elemento.nombre} </option>
              
            ))}
          </select>
          <input onChange={this.searcher} type="text" placeholder='buscar por tipo producto' className='form-control' />
          <input type="text" placeholder='buscar por tipo de Vehiculo' className='form-control' />
          <input type="text" placeholder='buscar por segmento de cliente' className='form-control' />
        </div>
        <br />
        <button className="btn btn-success" >Agregar Producto</button>
        <br /><br />
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
                MontoMaximo
              </th>
              <th>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(prod => {
              return (
                <tr key={prod.idProd}>
                  <td>{prod.nombre}</td>
                  <td>{prod.tipoProdHip.nombre} {prod.tipoProdAuto.nombre} {prod.tipoProdDep.tipo}</td>
                  <td>{prod.tipoProdAuto.tipoVehiculo}</td>
                  <td>{prod.segCli.idSegmClient}</td>
                  <td>{prod.montoMaximo = prod.tipoProdHip.cantCuota * prod.tipoProdHip.valorCuota} {prod.montoMaximo = prod.tipoProdDep.limiteMaximo}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => { this.seleccionarprod(prod); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={() => { this.seleccionarprod(prod); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="idProd">ID</label>
              <input className="form-control" type="text" name="idProd" id="idProd" readOnly onChange={this.handleChange} value={form ? form.idProd : this.state.data.length + 1} />
              <br />
              <label htmlFor="nombre">Nombre</label>
              <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} />


            </div>
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-primary" onClick={() => this.peticionPut()}>
              Actualizar
            </button>

            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar a la prod {form && form.nombre}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
          </ModalFooter>
        </Modal>
      </div>



    );
  }
}
export default ProddLi;