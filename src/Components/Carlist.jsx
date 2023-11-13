import { useEffect } from "react";
import { useState } from "react"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function Carlist() {

    //state variables
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [selectedCar, setSelectedCar] = useState(null);

    //columns for car ag-grid
    const columns = [
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'year' },
        { field: 'price' },
        {
            cellRenderer: params => (
                <>
                    <EditCar
                        car={params.data}
                        open={selectedCar === params.data}
                        handleClose={() => setSelectedCar(null)}
                        updateCar={updateCar}
                    />
                    <Button size="small" color="info" onClick={() => setSelectedCar(params.data)}>
                        Edit
                    </Button>
                </>
            ),
            width: 120
        },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteCar(params)}>
                    Delete
                </Button>,
            width: 120
        }
    ];

    useEffect(() => getCars(), [])

    const url = 'http://carrestapi.herokuapp.com/cars';

    const getCars = () => {
        fetch(url)
            .then(response => response.json())
            .then(responseData => {
                setCars(responseData._embedded.cars)

            })
            .catch(err => console.error(err));

    }

    const deleteCar = (params) => {
        if (window.confirm('Are you sure?')) {
            fetch(params.data._links.car.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Car is deleted successfully!');
                        setOpen(true)
                        getCars();
                    } else
                        alert('Something went wrong in deletion: ' + response.status);
                })
                .catch(err => console.error(err));
        }
    }
    const addCar = (car) => {
        fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok)
                    getCars();
                else
                    alert('Something went wrong.')
            })
            .catch(err => consoler.error(err));
    }

    const updateCar = (car) => {
        fetch(car._links.car.href, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Car is updated successfully!');
                    setOpen(true);
                    setSelectedCar(null);
                    getCars();
                } else
                    alert('Something went wrong in update: ' + response.status);
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material" style={{ height: '700px', width: '90%', margin: 'auto' }}>
                {cars.length > 0 ? (
                    <AgGridReact
                        rowData={cars}
                        columnDefs={columns}
                        pagination={true}
                        paginationPageSize={10}
                    ></AgGridReact>

                ) : (
                    <p>Loading...</p>
                )}
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}
                />

            </div>
        </>
    )
}