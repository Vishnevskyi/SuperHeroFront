import { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUploadTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { pink } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
function Read() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState([]);
  let deleteImg = (id) => {
    if (id === '')
    {
      console.log("Помилка");
    }
    else
    {
      fetch('https://back-test-crud.herokuapp.com/deleteImg',{
        method: "POST",
        mode: "cors",
        headers: {
          'content-type': "application/json"
        },
        body: JSON.stringify({id: id})
      }).then((res)=> res.json()).then((res)=> console.log(res.message))
    }
  }
  let UpdateImg = (e, id) => {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('img', e);
    fetch('https://back-test-crud.herokuapp.com/changeImg', {
      method: "POST",
      mode: "cors",
      body: formData
    }).then((res) => res.json()).then((res) => setMessage(res.message))
  }
  let editChange = (id, tab, value) => {
    if (value === "") {
      console.log("Заповніть поле для редагування");
    }
    else {
      fetch(`https://back-test-crud.herokuapp.com/change`, {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, tab, value })
      }).then((res) => res.json()).then((res) => console.log(res))
    }
  }
  useEffect(() => {
    fetch("https://back-test-crud.herokuapp.com/read", {
      method: "GET",
      mode: "cors",
    }).then((res) => res.json()).then((res) => {
      setData(res);
    })
  }, [data])
  let deleteHero = (id) => {
    fetch("https://back-test-crud.herokuapp.com/delete", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then((res) => res.json()).then((res) => { console.log(res) })
  }
  return (
    <div>
    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
      {data.length === 0 || data === undefined ? <div style={{position: "absolute", top: "50%",left: "50%"}}><CircularProgress/></div> : data.map((res) => (
        <div style={{ width: "400px", marginBottom: "2em" }} key={res.id}>
          <Accordion>
            <AccordionSummary>
              <div style={{ marginTop: "3em" }}>
                <div style={{ textAlign: "right" }}>
                  <Button onClick={() => deleteHero(res.id)}><DeleteIcon /></Button>
                </div>
                <div style={{ textAlign: "center" }} contenteditable="true" onInput={e => editChange(res.id, "nickname", e.target.outerText)} >
                  {res.nickname}
                </div>
                <div style={{ textAlign: "center", position: "relative" }}>
                  <div><img width="300px" height="200px" alt={res.images} src={res.images === "null" ? "https://back-test-crud.herokuapp.com/public/images/none.png" : "https://back-test-crud.herokuapp.com/" + res.images}></img></div>
                  <div style={{ position: "absolute",opacity: "0.7", top: 0, left: 0}}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id={`img + ${res.id}`}
                      name="img" 
                      type="file"
                      onChange={(e) => UpdateImg(e.target.files[0], res.id)}
                    />
                    <label htmlFor={`img + ${res.id}`}>
                      <Button variant="raised" component="span">
                        <FileUploadIcon sx={{ color: pink[500], fontSize: 50 }} />
                      </Button>
                    </label>
                  </div>
                  <div style={{ position: "absolute",opacity: "0.7", top: 0, right: 0}}>
                      <IconButton onClick={()=> deleteImg(res.id)}>
                        <HighlightOffIcon sx={{ color: pink[500], fontSize: 50 }} />
                      </IconButton>
                  </div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <b>real_name:</b><div contenteditable="true" onInput={e => editChange(res.id, "real_name", e.target.outerText)} >
                {res.real_name}
              </div>
              <b>description:</b>        <div contenteditable="true" onInput={e => editChange(res.id, "origin_description", e.target.outerText)} >
                {res.origin_description}
              </div>
              <b>powers:</b>   <div contenteditable="true" onInput={e => editChange(res.id, "superpowers", e.target.outerText)} >
                {res.superpowers}
              </div>
              <b>catch_phrase:</b><div contenteditable="true" onInput={e => editChange(res.id, "catch_phrase", e.target.outerText)} >
                {res.catch_phrase}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Read;
