import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState, useEffect } from "react";

export default function EditCar(props) {
    const [car, setCar] = useState({ brand: '', model: '', color: '', fuel: '', year: '', price: '' });

    useEffect(() => {
        if (props.car) {
            setCar({
                brand: props.car.brand,
                model: props.car.model,
                color: props.car.color,
                fuel: props.car.fuel,
                year: props.car.year,
                price: props.car.price
            });
        }
    }, [props.car]);

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.updateCar({ ...props.car, ...car });
        props.handleClose();
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>Edit Car</DialogTitle>
            <DialogContent>
                <TextField
                    label='Brand'
                    name='brand'
                    value={car.brand}
                    onChange={handleInputChange}
                />
                <TextField
                    label='Model'
                    name='model'
                    value={car.model}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Close</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
