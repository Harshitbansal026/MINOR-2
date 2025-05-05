import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../firebaseConfig';
import Modal from './Modal';
import {
    addDoc,
    collection,
    onSnapshot
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Docs({
    database
}) {
    let navigate = useNavigate();
    const isMounted = useRef()
    const [open, setOpen] = React.useState(false);
    const [docsData, setDocsData] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('');
    const collectionRef = collection(database, 'docsData')
    /*const addData = () => {
        
        const user = auth.currentUser;
        if (!user) {
            alert("Please login first");
            return;
        }
                
        addDoc(collectionRef, {
            title: title,
            docsDesc: '',
            userId: user.uid
            
        })
        .then(() => {
            alert('Data Added');
            handleClose()
        })
        .catch(() => {
            alert('Cannot add data')
        })
    }*/
    const addData = () => {
        const user = auth.currentUser;
        if (!user) {
            alert("Please login first");
            return;
        }

        addDoc(collectionRef, {
            title: title,
            docsDesc: '',
            userId: user.uid,
            collaborators: [user.uid]  // ✅ Create array with this user's ID
        })
        .then(() => {
            alert('Data Added');
            handleClose();
        })
        .catch(() => {
            alert('Cannot add data');
        });
    };

    /* const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }))
        })
    }*/
    /*const getData = () => {
        const user = auth.currentUser;
        if (!user) return;
        
        onSnapshot(collectionRef, (data) => {
            const userDocs = data.docs
                .filter(doc => doc.data().userId === user.uid) // Only get docs for this user
                .map((doc) => ({ ...doc.data(), id: doc.id }));
        
            setDocsData(userDocs);
        });
    };*/
    const getData = () => {
        const user = auth.currentUser;
        if (!user) return;
      
        onSnapshot(collectionRef, (data) => {
          const sharedDocs = data.docs
            .filter(doc => {
              const docData = doc.data();
              return docData.collaborators && docData.collaborators.includes(user.uid);
            })
            .map(doc => ({ ...doc.data(), id: doc.id }));
          
          setDocsData(sharedDocs);
        });
    };
      
    const getID = (id) => {
        navigate(`/editDocs/${id}`)
    }
    useEffect(() => {
        if (isMounted.current) {
            return
        }

        isMounted.current = true;
        getData()
    }, [])
    return (
        <div className='docs-main'>
            <h1>INFINITY-DOCS</h1>

            <button
                className='add-docs'
                onClick={handleOpen}
            >
                Add a Document
            </button>
            <div className='grid-main'>
                {docsData.map((doc) => {
                    return (
                        <div className='grid-child' onClick={() => getID(doc.id)}>
                            <p>{doc.title}</p>
                            <div dangerouslySetInnerHTML={{ __html: doc.docsDesc }} />
                        </div>
                    )
                })}
            </div>
            <Modal
                open={open}
                setOpen={setOpen}
                title={title}
                setTitle={setTitle}
                addData={addData}
            />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>INFINITY-DOCS</h1>
            <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        </div>
      
      {/* Existing document grid rendering code below */}
        </div>
        
    )
}
