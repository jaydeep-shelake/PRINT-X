import React ,{useState}from 'react'
import {Modal} from 'react-bootstrap'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import CloseIcon from '@material-ui/icons/Close';
import PDFModal from './PDFModal';
import './PDFModal.css'
const File = ({file}) => {
    //href={file.url}
    const [open,setOpen]=useState(false);
    const CloseModal=()=>{
        setOpen(false)
    }
    const ShowPdf=()=>{
        setOpen(true)
        
  }

    return (
       <>
        <div onClick={ShowPdf} className="text-truncate btn btn-outline-dark d-flex align-item-center" >
            <PictureAsPdfIcon className="mr-2
            text-danger"/>
            {file.file}
        </div>
        {open&&( 
             <div className="modal-area">
            <CloseIcon className="cross" onClick={CloseModal}/>
            <PDFModal url={file.url}/>
        </div>
        )}
        
        </>
    )
}

export default File
