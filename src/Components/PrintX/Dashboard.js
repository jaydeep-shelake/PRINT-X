import React from 'react'
import Navbar from './Navbar'
import {Container} from 'react-bootstrap';
import AddFolderBtn from '../Buttons/AddFolderBtn';
import AddFileButton from '../Buttons/AddFileButton';
import { useFolder } from '../../hooks/useFolder';
import Folder from './Folder';
import File from './File';
import {useLocation, useParams} from 'react-router-dom';
import FolderBreadCrum from './FolderBreadCrum';
const Dashboard = () => {
     const {folderId}=useParams();
     const {state={}}=useLocation();
    const {folder,childfolders,childFiles} = useFolder(folderId,state.folder);
    return (
        <>
         <Navbar/> 
         <Container fluid>
             <div className="d-flex align-items-center">
               <FolderBreadCrum currentFolder={folder}/>  
               <AddFolderBtn currentFolder={folder}/>
               <AddFileButton currentFolder={folder}/>
             </div>
             
             {childfolders.length > 0 && (
                 <div className="d-flex flex-wrap">
                     {
                         childfolders.map(ChildFolder=>{
                             return(<div key={ChildFolder.id} className="p-2" style={{maxWidth:'250px'}}>
                               <Folder folder={ChildFolder}/>
                             </div>)
                         })
                     }
                 </div>
             )}
             {childfolders.length>0 && childFiles.length>0 && <hr/>}
             {childFiles.length > 0 && (
                 <div className="d-flex flex-wrap">
                     {
                         childFiles.map(ChildFile=>(
                             
                             <div key={ChildFile.id} className="p-2" style={{maxWidth:'250px'}}>
                               <File file={ChildFile}/>
                             </div>
                         ))
                     }
                 </div>
             )}
             
         </Container>
        </>
    )
}

export default Dashboard
