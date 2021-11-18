import {useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
let Create = () => {
    const [open, setOpen] = useState(false);
    const { handleSubmit, register, reset } = useForm([]);
    const [message, setMessage] = useState("");
    const [img, setImg] = useState([]);
    const handleClose = () => {
        setOpen(false);
    };
    let handleClickOpen = () => {
        setOpen(true);
    }
    const onSubmit = (data) => {
        let formData = new FormData();
        for (let key in data) {
                formData.append(key, data[key]);
        }
        formData.append('img', img);
        fetch("https://back-test-crud.herokuapp.com/create", {
            method: "POST",
            mode: "cors",
            body: formData
        }).then(async (res) => await res.json()).then(async (res) => {
            await setMessage(res.message)
            if (res.message === 'Помилка' || res.message === "Такий герой вже існує" || res.message === "Заповніть усі поля") {
            }
            else {
                await setOpen(false);
                reset();
            }
        })
        setTimeout(async () => {
            await setMessage("");
        }, 3000);
    }
    return (
        <div>
            <div style={{ margin: "1em" }}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    +
                </Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>New SuperHero</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="nickname"
                            label="nickname"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register('nickname', { required: true })}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="real_name"
                            label="real_name"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register('real', { required: true })}
                        />
                        <TextField
                            placeholder="origin_description"
                            multiline
                            fullWidth
                            rows={10}
                            variant="outlined"
                            {...register('descript', { required: true })}
                        />
                        <TextField
                            placeholder="superpowers"
                            multiline
                            fullWidth
                            rows={4}
                            variant="outlined"
                            {...register('power', { required: true })}
                        />
                        <TextField
                            placeholder="catch_phrase"
                            multiline
                            fullWidth
                            rows={4}
                            variant="outlined"
                            {...register('catch_phrase', { required: true })}
                        />
                        <input type="file" name="img" onChange={(e)=>{
                            setImg(e.target.files[0]);
                        }}/>
                        <span style={message === "Помилка" || message === "Такий герой вже існує" || message === "Заповніть усі поля" ? { color: "red" } : { color: "green" }}>{message}</span>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
export default Create;