import React, { useRef, useState, useEffect } from 'react';

const ProductoList = () => {

    const put_nombre = useRef(null);
    const [putResult, setPutResult] = useState(null);
    const fortmatResponse = (res) => {
      return JSON.stringify(res, null, 2);
    }
    //seteo de hooks

    const [prods, setProds] = useState([]);
    const [search, setSearch] = useState("");

    //traer datos de la api
    const url = 'http://localhost:8088/api/prod';

    const show = async () => {
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
        setProds(data);
    }

    
    //funcion de busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    }


    //metodo de filtrado
    /*let results =[]
    if(!search){
       results = prods
    }else{
       results= prods.filter((dato)=>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }
    */

    const results = !search ? prods : prods.filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
    )

    useEffect(() => {
        show()
    }, [])

    return (
        <div className='caja1'>
            <h2 className='titulo2'>Lista de Productos</h2>

            <div className='buscador'>
                <input value={search} onCha
                nge={searcher} type="text" placeholder='buscar por tipo producto' className='form-control' />
            </div>
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
                        results.map((prod) => (
                            <tr key={prod.idProd}>
                                <td>{prod.nombre}</td>
                                <td>{prod.tipoProdAuto.valorCuota}</td>
                                <td>{prod.montoMaximo = prod.tipoProdHip.cantCuota * prod.tipoProdHip.valorCuota}</td>
                                <td><a className='btn btn-primary btn-xs'>Editar Nombre</a></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    );
}

export default ProductoList;