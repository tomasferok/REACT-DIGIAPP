import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url = 'http://localhost:8088/api/prod';
class ProdLi extends Component {
    

        state = {
            data: [],
            modalInsertar: false,
            form: {
                idProd: '',
                nombre: '',
                tipoModal: ''

            }
        }
    

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }
    seleccionarProducto = (prod) => {
        
        this.setState({
            tipoModal: 'Actualizar',
            form: {
                
                idProd: prod.idProd,
                nombre: prod.nombre
            }
        })
    }
    peticionPut = () => {
        axios.put(url + this.state.form.idProd, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        })
    }

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

    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });
            console.log(response.data);
        })
    }
    componentDidMount() {
        this.peticionGet();
    }
    render() {
        const {form}=this.state;
        return (
            <div className='caja1'>
                <h2 className='titulo2'>Lista de Productos</h2>


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
                                MontoMaximo
                            </th>
                            <th>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((prod) => (
                                <tr key={prod.idProd}>
                                    <td>{prod.nombre}</td>
                                    <td>{prod.tipoProdHip.valorCuota}</td>
                                    <td>{prod.montoMaximo = prod.tipoProdHip.cantCuota * prod.tipoProdHip.valorCuota}</td>
                                    <td><a className='btn btn-primary btn-xs' onClick={() => this.modalInsertar()}>Editar Nombre</a></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'right' }} onClick={()=>this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="idProd" id="idProd" readOnly onChange={this.handleChange} value={form.idProd} />
                            <br />
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form.nombre}/>

                        </div>
                    </ModalBody>

                    <ModalFooter>

                        <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                            Actualizar
                        </button>

                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ProdLi;