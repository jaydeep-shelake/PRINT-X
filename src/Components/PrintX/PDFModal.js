import React ,{useState}from 'react';
import { Alert, Button } from 'react-bootstrap';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PrintIcon from '@material-ui/icons/Print';
import {Document,Page,pdfjs} from 'react-pdf';
import printJS from 'print-js'
import axios from 'axios';
import {useAuth} from '../../Context/AuthContext'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFModal = ({url}) => {
     const {userInfo}=useAuth();
     const [numPages, setNumPages] = useState(null);
     const [pageNumber, setPageNumber] = useState(1);
     const [err,setErr]=useState('');
     const [show, setShow] = useState(false);
   
     function onDocumentLoadSuccess({ numPages }) {
       setNumPages(numPages);
       setPageNumber(1);
     }
   
     function changePage(offset) {
       setPageNumber((prevPageNumber) => prevPageNumber + offset);
     }
   
     function previousPage() {
       changePage(-1);
     }
   
     function nextPage() {
       changePage(1);
     }
     const handlePrint=(u)=>{
       console.log(userInfo)
        if(userInfo.points >0&&(numPages*2)<=userInfo.points){
        console.log(numPages)
        console.log(u)
        axios.get(u)
        .then(({config})=>{
          console.log(config)
            printJS({printable:config.url, type:'pdf', showModal:true})
        })
       }
       else{
         setShow(true)
          setErr(`You have less Points ${userInfo.points} and total is ${numPages*2} please contact admin`)
          console.log(`You have less Points ${userInfo.points} and total is ${numPages*2}`)
       }
     }
   
         return (
           
          <>
          {err&&show&&<Alert variant="danger" onClose={()=>setShow(false)} className="msg" dismissible>{err}</Alert>}
         <Document
           file={url}
           onLoadSuccess={onDocumentLoadSuccess}

         >
           <Page pageNumber={pageNumber} />
         </Document>
         <div className="non-click">
           <p>
             Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
           </p>
           <div>
           <Button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
              <ChevronLeftIcon/> Previous
           </Button>
           <Button
             type="button"
             disabled={pageNumber >= numPages}
             onClick={nextPage}
             style={{margin:'0 20px'}}
           >
             Next <ChevronRightIcon/>
           </Button>
           <Button variant="dark" onClick={()=>handlePrint(url)}>
              Print <PrintIcon/>
           </Button>
           </div>
         </div>
      </>
     );
   }
   
export default PDFModal
